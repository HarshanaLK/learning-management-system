<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lesson\LessonCreateRequest;
use App\Http\Requests\Lesson\LessonEditRequest;
use App\Repositories\All\Lessons\LessonsInterface;
use App\Repositories\All\Modules\ModulesInterface;
use Vimeo\Laravel\Facades\Vimeo;

use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{


    public function __construct(
        protected ModulesInterface $modulesInterface,
        protected LessonsInterface $lessonsInterface,

    ) {}



    // Lesson Create
    public function store(LessonCreateRequest $request, $moduleId)
    {
        $module = $this->modulesInterface->findById($moduleId);

        $validated = $request->validated();

        if ($request->hasFile('lesson_video')) {
            if ($request->file('lesson_video')->isValid()) {
                $videoFile = $request->file('lesson_video');
                $videoOriginalName = trim($videoFile->getClientOriginalName(), '[]"');

                try {

                    $videoUrl = Vimeo::upload($videoFile->getPathname());
                    $videoId = basename($videoUrl);
                    Vimeo::request("/videos/{$videoId}", [
                        'name' => $validated['lesson_title'],
                    ], 'PATCH');

                    $validated['video_original_name'] = $videoOriginalName;
                    $validated['lesson_video'] = $videoUrl;
                } catch (\Exception $e) {
                    return back()->withErrors(['lesson_video' => 'Video upload to Vimeo failed: ' . $e->getMessage()]);
                }
            } else {
                return back()->withErrors(['lesson_video' => 'The uploaded video is not valid.']);
            }
        } else {
            $validated['video_original_name'] = null;
            $validated['lesson_video'] = null;
        }

        $filesPaths = [];
        $filesOriginalNames = [];

        if ($request->hasFile('lesson_files')) {
            foreach ($request->file('lesson_files') as $file) {
                if (!$file->isValid()) {
                    return back()->withErrors(['lesson_files' => 'One or more files are not valid.']);
                }

                $originalName = trim($file->getClientOriginalName(), '[]"');
                $extension = $file->getClientOriginalExtension();
                $fileName = pathinfo($originalName, PATHINFO_FILENAME);

                $path = $file->storeAs(
                    'lessons/files',
                    $fileName . '_' . time() . '.' . $extension,
                    'public'
                );

                $filesPaths[] = $path;
                $filesOriginalNames[] = $originalName;
            }
        }

        $lesson = $module->lessons()->create([
            'lesson_title' => $validated['lesson_title'],
            'lesson_duration' => $validated['lesson_duration'],
            'lesson_video' => $validated['lesson_video'],
            'video_original_name' => $validated['video_original_name'],
            'lesson_files' => json_encode($filesPaths),
            'files_original_names' => json_encode($filesOriginalNames),
            'lesson_note' => $validated['lesson_note'],
            'lesson_description' => $validated['lesson_description'],
            'lesson_introduction' => $validated['lesson_introduction'],
        ]);

        return back()->with('success', 'Lesson created successfully');
    }




    // Lesson update
    public function update(LessonEditRequest $request, $lessonId)
    {


        $lesson = $this->lessonsInterface->findById($lessonId);


        $updateData = [
            'lesson_title' => $request->input('lesson_title', $lesson->lesson_title),
            'lesson_duration' => $request->input('lesson_duration', $lesson->lesson_duration),
            'lesson_note' => $request->input('lesson_note', $lesson->lesson_note),
            'lesson_description' => $request->input('lesson_description', $lesson->lesson_description),
            'lesson_introduction' => $request->input('lesson_introduction', $lesson->lesson_introduction),
        ];



        // Video Upload and Update Name on Vimeo
        if ($request->hasFile('lesson_video') && $request->file('lesson_video')->isValid()) {

            // Delete existing video from Vimeo
            if ($lesson->lesson_video) {
                $videoId = basename($lesson->lesson_video);
                try {
                    Vimeo::request("/videos/{$videoId}", [], 'DELETE');
                } catch (\Exception $e) {
                    return back()->withErrors(['lesson_video' => 'Failed to delete the existing video: ' . $e->getMessage()]);
                }
            }

            // Upload new video to Vimeo
            $videoFile = $request->file('lesson_video');
            $videoOriginalName = trim($videoFile->getClientOriginalName(), '[]"');

            try {
                $videoUrl = Vimeo::upload($videoFile->getPathname());
                $videoId = basename($videoUrl);

                // Update video name on Vimeo
                Vimeo::request("/videos/{$videoId}", [
                    'name' => $request->input('lesson_title', $lesson->lesson_title)
                ], 'PATCH');

                $updateData['video_original_name'] = $videoOriginalName;
                $updateData['lesson_video'] = $videoUrl;
            } catch (\Exception $e) {
                return back()->withErrors(['lesson_video' => 'Video upload to Vimeo failed: ' . $e->getMessage()]);
            }
        }

        // File Upload Logic
        if ($request->hasFile('lesson_files')) {
            if ($lesson->lesson_files) {
                foreach (json_decode($lesson->lesson_files) as $file) {
                    Storage::disk('public')->delete($file);
                }
            }

            $filesPaths = [];
            $filesOriginalNames = [];

            foreach ($request->file('lesson_files') as $file) {
                if (!$file->isValid()) {
                    return back()->withErrors(['lesson_files' => 'One or more files are not valid.']);
                }

                $originalName = trim($file->getClientOriginalName(), '[]"');
                $extension = $file->getClientOriginalExtension();
                $fileName = pathinfo($originalName, PATHINFO_FILENAME);

                $path = $file->storeAs(
                    'lessons/files',
                    $fileName . '_' . time() . '.' . $extension,
                    'public'
                );

                $filesPaths[] = $path;
                $filesOriginalNames[] = $originalName;
            }

            $updateData['lesson_files'] = json_encode($filesPaths);
            $updateData['files_original_names'] = json_encode($filesOriginalNames);
        }

        // Update Lesson Data
        $lesson->update($updateData);

        return back()->with('success', 'Lesson updated successfully');
    }



    // Lesson delete
    public function destroy($moduleId, $lessonId)
    {
        $lesson = $this->lessonsInterface->findByColumn([
            'module_id' => $moduleId,
            'id' => $lessonId
        ]);

        if (!$lesson) {
            return back()->withErrors(['error' => 'Lesson not found.']);
        }
        if ($lesson->lesson_files) {
            $files = json_decode($lesson->lesson_files);
            foreach ($files as $file) {
                Storage::disk('public')->delete($file);
            }
        }
        if ($lesson->lesson_video) {
            $videoId = basename($lesson->lesson_video);
            try {
                Vimeo::request("/videos/{$videoId}", [], 'DELETE');
            } catch (\Exception $e) {
                return back()->withErrors(['lesson_video' => 'Failed to delete video from Vimeo: ' . $e->getMessage()]);
            }
        }
        $lesson->delete();
        return back()->with('success', 'Lesson deleted successfully');
    }
}
