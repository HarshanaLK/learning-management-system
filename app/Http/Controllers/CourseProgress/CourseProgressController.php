<?php

namespace App\Http\Controllers\CourseProgress;

use App\Http\Controllers\Controller;
use App\Repositories\All\Certificate\CertificateInterface;
use App\Repositories\All\LessonProgress\LessonProgressInterface;
use App\Repositories\All\Courses\CoursesInterface;
use App\Repositories\All\UserEnrollCourse\UserEnrollCourseInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\Storage;



class CourseProgressController extends Controller
{

    public function __construct(
        protected UserEnrollCourseInterface $userEnrollCourseInterface,
        protected CoursesInterface $coursesInterface,
        protected LessonProgressInterface $lessonProgressInterface,
        protected CertificateInterface $certificateInterface,
    ) {}




    public function show($courseId)
    {
        $userId = Auth::id();

        // Check if the course is purchased by the user
        $purchase = $this->userEnrollCourseInterface->findByColumn(
            ['user_id' => $userId, 'course_id' => $courseId],
            ['*']
        );

        if (!$purchase) {
            return response()->json(['message' => 'Course not purchased'], 403);
        }

        // Fetch course details with modules, lessons, and progress
        $course = $this->coursesInterface->findById(
            $courseId,
            ['*'],
            [
                'modules.lessons',
                'modules.lessons.progress' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                },
            ]
        );

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        // Check if all lessons are completed
        $allLessonsCompleted = $course->modules->flatMap(function ($module) {
            return $module->lessons;
        })->every(function ($lesson) use ($userId) {
            $progress = $lesson->progress->where('user_id', $userId)->first();
            return $progress && $progress->completed == true;
        });

        // Calculate the total lesson duration
        $totalLessonDuration = $course->modules->flatMap(function ($module) {
            return $module->lessons;
        })->sum('lesson_duration');

        return inertia('Student/CourseDashboard/Index', [
            'course' => $course,
            'totalLessonDuration' => $totalLessonDuration,
            'certificateIssued' => $allLessonsCompleted,
        ]);
    }








    public function showLesson($courseId, $moduleId, $lessonId)
    {
        $userId = Auth::id();

        // Check if the course is purchased by the user
        $purchase = $this->userEnrollCourseInterface->findByColumn(
            ['user_id' => $userId, 'course_id' => $courseId],
            ['*']
        );

        if (!$purchase) {
            return response()->json(['message' => 'Course not purchased'], 403);
        }

        // Fetch the course, module, and lesson data
        $course = $this->coursesInterface->findById(
            $courseId,
            ['*'],
            [
                'modules.lessons.progress' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                },
            ]
        );

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        // Find the module by ID
        $module = $course->modules->firstWhere('id', $moduleId);

        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }

        // Find the lesson by ID
        $lesson = $module->lessons->firstWhere('id', $lessonId);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        // Fetch the lesson progress for the current user
        $lessonProgress = $lesson->progress->where('user_id', $userId)->first();

        // Check if all lessons are completed
        $allLessonsCompleted = $course->modules->flatMap(function ($module) {
            return $module->lessons;
        })->every(function ($lesson) use ($userId) {
            $progress = $lesson->progress->where('user_id', $userId)->first();
            return $progress && $progress->completed == true;
        });

        return Inertia::render('Student/CourseDashboard/LessonPage/Index', [
            'course' => $course,
            'module' => $module,
            'lesson' => $lesson,
            'progress' => $lessonProgress,
            'certificateIssued' => $allLessonsCompleted,
        ]);
    }






    public function updateProgress(Request $request, $lessonId)
    {
        $request->validate([
            'progress' => 'required|numeric|min:0|max:100',
        ]);

        $user = Auth::user();

        // Fetch the existing progress record using repository method
        $existingProgress = $this->lessonProgressInterface->findByColumn(
            [
                'user_id' => $user->id,
                'lesson_id' => $lessonId,
            ]
        );

        // Check if the new progress is greater than the existing progress
        if ($existingProgress && $request->progress <= $existingProgress->progress) {
            return response()->json([
                'success' => false,
                'message' => 'Progress value must be greater than the current progress.',
            ], 400);
        }

        //completed (100% progress)
        $isCompleted = $request->progress == 100;

        // Update or create the progress record
        $progress = $this->lessonProgressInterface->createOrUpdate(
            [
                'user_id' => $user->id,
                'lesson_id' => $lessonId,
            ],
            [
                'progress' => $request->progress,
                'completed' => $isCompleted,
            ]
        );

        return response()->json(['success' => true, 'progress' => $progress]);
    }







    // certificate create
    public function generateCertificate($courseId)
    {
        $userId = Auth::id();
        $course =  $this->coursesInterface->findById($courseId);
        $user = Auth::user();

        if (!$user || !$course) {
            return response()->json(['message' => 'User or Course not found'], 404);
        }


        $html = view('certificate', compact('course', 'user'))->render();


        $pdf = new Dompdf();
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
        $pdf->setOptions($options);

        $pdf->loadHtml($html);
        $pdf->setPaper('A4', 'portrait');
        $pdf->render();

        $filePath = 'certificates/' . $user->id . '_' . $course->id . '_certificate.pdf';
        Storage::put('public/' . $filePath, $pdf->output());

        $this->certificateInterface->create([
            'user_id' => $userId,
            'course_id' => $courseId,
            'issued_at' => now(),
            'certificate_code' => Str::uuid(),
            'certificate_path' => $filePath,
        ]);


        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'certificate.pdf');
    }





    public function getProgress($courseId, $moduleId, $lessonId)

    {

        dd($courseId);
        $userId = Auth::id();

        // Check if the course is purchased by the user
        $purchase = $this->userEnrollCourseInterface->findByColumn(
            ['user_id' => $userId, 'course_id' => $courseId],
            ['*']
        );

        if (!$purchase) {
            // Return null or any other value to indicate failure, no JSON message
            return null;
        }

        // Fetch the course, module, and lesson data
        $course = $this->coursesInterface->findById(
            $courseId,
            ['*'],
            [
                'modules.lessons.progress' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                },
            ]
        );

        if (!$course) {
            return null; // Return null or handle it as per your requirement
        }

        // Find the module by ID
        $module = $course->modules->firstWhere('id', $moduleId);

        if (!$module) {
            return null; // Return null or handle it as per your requirement
        }

        // Find the lesson by ID
        $lesson = $module->lessons->firstWhere('id', $lessonId);

        if (!$lesson) {
            return null; // Return null or handle it as per your requirement
        }

        // Fetch the lesson progress for the current user
        $lessonProgress = $lesson->progress->where('user_id', $userId)->first();


        return $lessonProgress; // Return the progress without JSON
    }



}










