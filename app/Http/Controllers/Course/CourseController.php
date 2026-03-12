<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Course\CourseCreateRequest;
use App\Http\Requests\Course\CourseUpdateRequest;
use App\Http\Resources\CourseResource;
use App\Repositories\All\Courses\CoursesInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Vimeo\Laravel\Facades\Vimeo;

class CourseController extends Controller
{
    public function __construct(
        protected CoursesInterface $coursesInterface,

    ) {}



    // All courses page public
    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['course_status'] = 'active';

        $allCourses = $this->coursesInterface->filter($filters)->map(function ($course) {
            $course->lesson_count = $course->modules()->withCount('lessons')->get()->sum('lessons_count');
            $course->is_enrolled = Auth::check() && $course->userEnrollcourse()->where('user_id', Auth::id())->exists();
            return $course;
        });

        return Inertia::render('PublicArea/Courses/Index', [
            'filters' => $filters,
            'allCourses' => $allCourses,
            'courses' => CourseResource::collection($allCourses),
        ]);
    }





    // My courses table
    public function all(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;

        return Inertia::render('Admin/MyCourses/Index', [
            'filters' => $filters,
            'courses' => CourseResource::collection($this->coursesInterface->filter($filters)),
        ]);
    }



    // course show
    public function show(Request $request, $id)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['course_status'] = 'active';

        $courses = $this->coursesInterface->filter($filters)->map(function ($course) {
            $course->lesson_count = $course->modules()->withCount('lessons')->get()->sum('lessons_count');
            $course->isEnrolled = Auth::user() && $course->userEnrollcourse()->where('user_id', Auth::id())->exists();
            return $course;
        });

        $course = $this->coursesInterface->findById($id, ['*'], ['modules.lessons', 'courseTag']);

        $isEnrolled = Auth::user() && $course->userEnrollcourse()->where('user_id', Auth::id())->exists();

        return Inertia::render('PublicArea/CourseDetails/Index', [
            'isEnrolled' => $isEnrolled,
            'course' => $course,
            'modules' => $course->modules,
            'courses' => $courses,
            'courseTag' => $course->courseTag,
        ]);
    }





    // course edi modal
    public function edit($id)
    {
        $course = $this->coursesInterface->findById($id, ['*'], ['modules.lessons', 'courseTag']);
        // dd($course);
        return Inertia::render('Admin/MyCourses/CourseEdit/CourseEdit', [
            'courseData' => (new CourseResource($course))->toArray(request()),
            'modules' => $course->modules,
            'course' => $course,
            'courseTag' => $course->courseTag,
        ]);
    }





    // course create page
    public function create()
    {
        return Inertia::render('Admin/MyCourses/CourseCreate/Index');
    }








    // course store new
    public function store(CourseCreateRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('course_images', 'public');
        }

        if ($request->hasFile('instructor_image')) {
            $validatedData['instructor_image'] = $request->file('instructor_image')->store('instructor_images', 'public');
        }

        if ($request->hasFile('course_video')) {
            $videoFile = $request->file('course_video');

            if ($videoFile->isValid()) {
                try {
                    // Use Vimeo API to upload video
                    $vimeo = app('vimeo');
                    $response = $vimeo->upload(
                        $videoFile->getPathname(),
                        [
                            'name' => $validatedData['title'] ?? 'Course Video',
                            'description' => $validatedData['description'] ?? 'Uploaded via API'
                        ]
                    );

                    // Save Vimeo URL or ID in database
                    $validatedData['course_video'] = $response;
                } catch (\Exception $e) {
                    return back()->withErrors(['course_video' => 'Video upload to Vimeo failed: ' . $e->getMessage()]);
                }
            } else {
                return back()->withErrors(['course_video' => 'The uploaded video is not valid.']);
            }
        }

        $fieldsToDecode = ['what_you_learn', 'materials_included', 'requirements'];
        foreach ($fieldsToDecode as $field) {
            if (isset($validatedData[$field]) && is_string($validatedData[$field])) {
                $validatedData[$field] = json_decode($validatedData[$field], true);
            }
        }

        $createdCourse = $this->coursesInterface->create($validatedData);
        $courseId = $createdCourse->id;

        // Store tags in the course_tags table
        if (isset($validatedData['course_tag']) && is_array($validatedData['course_tag'])) {
            foreach ($validatedData['course_tag'] as $tag) {
                DB::table('course_tags')->insert([
                    'course_id' => $courseId,
                    'course_tag' => $tag,
                ]);
            }
        }

        return redirect()->route('courses.edit', ['id' => $courseId])->with('success', 'Course created successfully.');
    }







    // course update
    public function update(CourseUpdateRequest $request, $courseId)
    {


        $course = $this->coursesInterface->findById($courseId);
        $updateData = $request->validated();

        $updateData['what_you_learn'] = $request->has('what_you_learn') ? $request->input('what_you_learn') : null;
        $updateData['materials_included'] = $request->has('materials_included') ? $request->input('materials_included') : null;
        $updateData['requirements'] = $request->has('requirements') ? $request->input('requirements') : null;

        // Handle image upload
        if ($request->hasFile('image')) {
            if ($course->image && Storage::disk('public')->exists($course->image)) {
                Storage::disk('public')->delete($course->image);
            }
            $updateData['image'] = $request->file('image')->store('course_images', 'public');
        } else {
            $updateData['image'] = $course->image;
        }

        // Handle instructor image upload
        if ($request->hasFile('instructor_image')) {
            if ($course->instructor_image && Storage::disk('public')->exists($course->instructor_image)) {
                Storage::disk('public')->delete($course->instructor_image);
            }
            $updateData['instructor_image'] = $request->file('instructor_image')->store('instructor_images', 'public');
        } else {
            $updateData['instructor_image'] = $course->instructor_image;
        }

        if ($request->hasFile('course_video') && $request->file('course_video')->isValid()) {
            // Delete existing video from Vimeo
            if ($course->course_video) {
                $videoId = basename($course->course_video);
                try {
                    Vimeo::request("/videos/{$videoId}", [], 'DELETE');
                } catch (\Exception $e) {
                    return back()->withErrors(['course_video' => 'Failed to delete the existing video: ' . $e->getMessage()]);
                }
            }

            // Upload new video to Vimeo
            $videoFile = $request->file('course_video');
            $videoOriginalName = trim($videoFile->getClientOriginalName(), '[]"');
            try {
                $videoPath = $videoFile->getPathname();

                // Upload the video to Vimeo
                $videoUrl = Vimeo::upload($videoPath);

                // Get the video ID from the URL
                $videoId = basename($videoUrl);

                // Update the video data title as course title
                Vimeo::request("/videos/{$videoId}", [
                    'name' => $course->title, // Use the course title as the video name
                ], 'PATCH');

                $updateData['course_video'] = $videoUrl;
                $updateData['video_original_name'] = $videoOriginalName;
            } catch (\Exception $e) {
                return back()->withErrors(['course_video' => 'Video upload to Vimeo failed: ' . $e->getMessage()]);
            }
        } else {
            // Retain the existing video if no new video is uploaded
            $updateData['course_video'] = $course->course_video;
            $updateData['video_original_name'] = $course->video_original_name;
        }

        $course->update($updateData);


        // Update course tags
        if (isset($updateData['course_tag']) && is_array($updateData['course_tag'])) {
            // Delete existing tags for the course
            DB::table('course_tags')->where('course_id', $courseId)->delete();

            // Insert the updated tags
            foreach ($updateData['course_tag'] as $tag) {
                DB::table('course_tags')->insert([
                    'course_id' => $courseId,
                    'course_tag' => $tag,
                ]);
            }
        }

        return redirect()->route('courses.edit', ['id' => $courseId])->with('success', 'Course updated successfully.');
    }








    // course delete
    public function destroy($id)
    {
        $course = $this->coursesInterface->findById($id);
        if ($course->image) {
            Storage::disk('public')->delete($course->image);
        }
        if ($course->instructor_image) {
            Storage::disk('public')->delete($course->instructor_image);
        }

        if ($course->course_video) {
            $videoId = basename($course->course_video);
            try {
                Vimeo::request("/videos/{$videoId}", [], 'DELETE');
            } catch (\Exception $e) {
                return back()->withErrors(['course_video' => 'Failed to delete video from Vimeo: ' . $e->getMessage()]);
            }
        }
        $course->delete();
        return back()->with('success', 'Course deleted successfully');
    }


    public function preview($id)
    {

        $courses = $this->coursesInterface->all()->map(function ($course) {
            $course->lesson_count = $course->modules()->withCount('lessons')->get()->sum('lessons_count');
            return $course;
        });
        $course = $this->coursesInterface->findById($id, ['*'], ['modules.lessons', 'courseTag']);


        $isEnrolled = Auth::user() && $course->userEnrollcourse()->where('user_id', Auth::id())->exists();

        // dd($isEnrolled);


        return Inertia::render('Admin/MyCourses/CourseShow/Index', [
            'isEnrolled' => $isEnrolled,
            'course' => $course,
            'modules' => $course->modules,
            'courses' => $courses,
            'courseTag' => $course->courseTag,

        ]);
    }




    public function clearImage($id)
    {
        $course = $this->coursesInterface->findById($id);
        if ($course->image) {
            Storage::disk('public')->delete($course->image);
            $course->image = null;
            $course->save();
        }
        return back()->with('success', 'Image deleted successfully');
    }




    public function clearInstructorImage($id)
    {
        $course = $this->coursesInterface->findById($id);
        if ($course->instructor_image) {
            Storage::disk('public')->delete($course->instructor_image);
            $course->instructor_image = null;
            $course->save();
        }
        return back()->with(['success' => 'Instructor image cleared successfully']);
    }





    public function clearVideo($courseId)
    {
        $course = $this->coursesInterface->findById($courseId);
        if ($course->course_video) {
            $videoId = basename($course->course_video);
            try {

                Vimeo::request("/videos/{$videoId}", [], 'DELETE');
                $course->course_video = null;
                $course->save();
            } catch (\Exception $e) {
                return back()->withErrors(['course_video' => 'Failed to delete video from Vimeo: ' . $e->getMessage()]);
            }
        }
        return back()->with(['success' => 'Video cleared successfully']);
    }
}
