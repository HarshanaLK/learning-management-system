<?php

namespace App\Http\Controllers;


use App\Repositories\All\Courses\CoursesInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{


    public function __construct(
        protected CoursesInterface $coursesInterface,

    ) {}


    public function home(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "purchased_count";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['course_status'] = 'active';

        $courses = $this->coursesInterface->filter($filters)->map(function ($course) {
            $course->lesson_count = $course->modules()->withCount('lessons')->get()->sum('lessons_count');
            $course->is_enrolled = Auth::check() && $course->userEnrollcourse()->where('user_id', Auth::id())->exists();
            return $course;
        });

        return Inertia::render('PublicArea/Home/Index', [
            'filters' => $filters,
            'courses' => $courses,
        ]);
    }
}
