<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\UserEnrollCourse;
use App\Repositories\All\Courses\CoursesInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(
        protected CoursesInterface $coursesInterface,

    ) {}


    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 5;

        $user = Auth::user();

        // Get enrolled courses and their user count
        $enrollCourses = UserEnrollCourse::all();

        // Get all courses
        $courses = $this->coursesInterface->all();

        // Get user count per course
        $userCountByCourse = UserEnrollCourse::select('course_id', DB::raw('count(user_id) as user_count'))
            ->groupBy('course_id')
            ->get()
            ->keyBy('course_id');  // Key by course_id for easy lookup

        foreach ($userCountByCourse as $courseId => $data) {

            $course = $this->coursesInterface->findById($courseId);
            if ($course) {
                $course->purchased_count = $data->user_count;
                $course->save();
            }
        }

        return Inertia::render('Admin/Dashboard/Index', [
            'filters' => $filters,
            'allCourses' => $courses,
            'enrollCourses' => $enrollCourses,
            'courses' => CourseResource::collection($this->coursesInterface->filter($filters)),
            'userCountByCourse' => $userCountByCourse, 
            'firstName' => $user->first_name,
        ]);
    }


}
