<?php

namespace App\Http\Controllers\UserCourse;

use App\Models\UserEnrollCourse;
use App\Repositories\All\Courses\CoursesInterface;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Repositories\All\UserEnrollCourse\UserEnrollCourseInterface;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserCourseController extends Controller
{

    public function __construct(
        protected CoursesInterface $coursesInterface,
        protected UserEnrollCourseInterface $userEnrollCourseInterface,

    ) {}


    public function index()
    {
        return Inertia::render('Student/Course/Index', []);
    }




    public function showModule($id)
    {

        $courses = $this->coursesInterface->all();
        $course = $this->coursesInterface->findById($id, ['*'], ['modules.lessons']);

        return Inertia::render('Student/Course/Modules/Index', [
            'course' => $course,
            'modules' => $course->modules,
            'courses' => $courses,
            'course_id' => $course->id,
        ]);
    }



    public function showGrade($courseId)
    {
        $userId = Auth::id();

        // Check if the course is purchased by the user
        $purchase = $this->userEnrollCourseInterface->findByColumn(
            ['user_id' => $userId, 'course_id' => $courseId]
        );

        if (!$purchase) {
            return response()->json(['message' => 'Course not purchased'], 403);
        }

        // Fetch the course with its modules, lessons, and user progress
        $course = $this->coursesInterface->findById(
            $courseId,
            ['*'], // Select all columns
            [
                'modules.lessons',
                'modules.lessons.progress' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                }
            ]
        );

        return inertia('Student/Course/Grades/Index', ['course' => $course]);
    }





    public function getCompletedCourses()
    {
        $userId = Auth::id();

        // Fetch all courses the user is enrolled in
        $enrolledCourses = UserEnrollCourse::where('user_id', $userId)
            ->pluck('course_id');

        // Fetch all courses with their modules and lessons progress
        $courses = Course::with([
            'modules.lessons',
            'modules.lessons.progress' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            },
        ])->whereIn('id', $enrolledCourses)->get();

        // Filter courses where all lessons are completed
        $completedCourses = $courses->filter(function ($course) use ($userId) {
            return $course->modules->flatMap(function ($module) {
                return $module->lessons;
            })->every(function ($lesson) use ($userId) {
                $progress = $lesson->progress->where('user_id', $userId)->first();
                return $progress && $progress->completed == true;
            });
        })->map(function ($course) {
            // Add lesson count for each course
            $totalLessons = $course->modules->flatMap(function ($module) {
                return $module->lessons;
            })->count();

            $course->lesson_count = $totalLessons;
            return $course;
        });

        return inertia('Student/Course/Complete/Index', [
            'completedCourses' => $completedCourses,
        ]);
    }







    public function getOngoingCourses()
    {
        $userId = Auth::id();

        $enrolledCourses = UserEnrollCourse::where('user_id', $userId)
            ->pluck('course_id');

        $courses = Course::with([
            'modules.lessons',
            'modules.lessons.progress' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            },
        ])->whereIn('id', $enrolledCourses)->get();

        $ongoingCourses = $courses->map(function ($course) use ($userId) {
            // Get all lessons from all modules of the course
            $lessons = $course->modules->flatMap(function ($module) {
                return $module->lessons;
            });

            // Total lessons count across the course
            $totalLessons = $lessons->count();

            // Calculate total progress for all lessons
            $totalProgress = $lessons->reduce(function ($carry, $lesson) use ($userId) {
                $progress = $lesson->progress->where('user_id', $userId)->first();
                return $carry + ($progress ? $progress->progress : 0);
            }, 0);

            // Calculate progress percentage
            $progressPercentage = $totalLessons > 0
                ? round(($totalProgress / ($totalLessons * 100)) * 100, 2)
                : 0;

            // Add 'lessonCount' for the total lessons in the course
            return [
                'course' => $course,
                'progressPercentage' => $progressPercentage,
                'lessonCount' => $totalLessons, // Total lesson count for the entire course
            ];
        })->filter(function ($courseData) {
            return $courseData['progressPercentage'] < 100;
        });

        return inertia('Student/Course/Ongoing/Index', [
            'ongoingCourses' => $ongoingCourses,
        ]);
    }


}
