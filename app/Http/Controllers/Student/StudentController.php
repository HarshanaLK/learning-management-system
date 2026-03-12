<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StudentCreateRequest;
use App\Http\Requests\Student\StudentUpdateRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\All\Users\UsersInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;


class StudentController extends Controller
{


    public function __construct(
        protected UsersInterface $usersInterface,


    ) {}


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        $filters['role'] = 'user';


        return Inertia::render('Admin/Students/Index', [
            'filters' => $filters,
            'students' => UserResource::collection($this->usersInterface->filter($filters)),
        ]);
    }



    // public function index(Request $request)
    // {
    //     $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
    //     $filters['sortBy'] = $filters['sortBy'] ?? "id";
    //     $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
    //     $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
    //     $filters['role'] = 'user';

    //     $students = $this->usersInterface->filter($filters)
    //         ->withCount('userEnrollcourse')
    //         ->get();

    //     return Inertia::render('Admin/Students/Index', [
    //         'filters' => $filters,
    //         'students' => UserResource::collection($students),
    //     ]);
    // }






    // save user
    public function store(StudentCreateRequest $request)
    {
        // Use the usersInterface to create a new user
        $this->usersInterface->create($request->all());

        // Redirect to the students dashboard
        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }


    // update student
    public function update(StudentUpdateRequest $request, $id)
    {

        $student = $this->usersInterface->findById($id);

        $student->update($request->all());

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }


    // Delete Student
    public function destroy($id)
    {
        $student = $this->usersInterface->findById($id);
        $student->delete();
        return back()->with('success', 'Student deleted successfully');
    }
}
