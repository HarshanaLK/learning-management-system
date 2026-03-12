<?php

namespace App\Http\Controllers\CourseEnroll;

use App\Http\Controllers\Controller;
use App\Repositories\All\Courses\CoursesInterface;
use Inertia\Inertia;

class CourseEnrollController extends Controller
{


    public function __construct(
        protected CoursesInterface $coursesInterface,

    ) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id)

    {
        $course = $this->coursesInterface->findById(
            $id,
            ['*'],
            ['modules.lessons']
        );

        $lessonCount = $course->modules->reduce(function ($carry, $module) {
            return $carry + $module->lessons->count();
        }, 0);

        return Inertia::render('PublicArea/CourseEnroll/Index', [
            'course' => $course,
            'lessonCount' => $lessonCount,
        ]);
    }
}
