<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\All\Users\UsersInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
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
        $filters['role'] = 'admin';

        return Inertia::render('Admin/Index', [
            'filters' => $filters,
            'admins' => UserResource::collection($this->usersInterface->filter($filters)),
        ]);
    }


    // save user
    // public function store(UserRequest $request)
    // {

    //     $data = $request->all();
    //     $data['role'] = 'admin';
    //     $this->usersInterface->create($data);

    //     return redirect()->route('admins.index')->with('message', 'Admin created successfully.');
    // }


    // // update student
    // public function update(UserRequest $request, $id)
    // {

    //     $admin = $this->usersInterface->findById($id);
    //     $admin->update($request->all());
    //     return redirect()->route('admins.index')->with('message', 'Admin updated successfully.');
    // }


    // Delete Student
    public function destroy($id)
    {
        $admin = $this->usersInterface->findById($id);
        $admin->delete();
        return back()->with('message', 'Student deleted successfully');
    }
}
