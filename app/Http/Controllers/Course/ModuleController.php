<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Module\ModuleCreateRequest;
use App\Repositories\All\Courses\CoursesInterface;
use App\Repositories\All\Modules\ModulesInterface;


class ModuleController extends Controller
{

    public function __construct(
        protected CoursesInterface $coursesInterface,
        protected ModulesInterface $modulesInterface,

    ) {}


    public function store(ModuleCreateRequest $request, $courseId)
    {
        $course = $this->coursesInterface->findById($courseId);
        $module = $this->modulesInterface->create([
            'course_id' => $course->id,
            'module_title' => $request->module_title,

        ]);

        return redirect()->route('courses.edit', $course->id)
            ->with('success', 'Module created successfully!');
    }


    // Update an existing module
    public function update(ModuleCreateRequest $request, $courseId, $moduleId)
    {

        $course = $this->coursesInterface->findById($courseId);
        $module = $this->modulesInterface->findById($moduleId);
        $module->update([
            'module_title' => $request->module_title,

        ]);

        return redirect()->route('courses.edit', $course->id)
            ->with('success', 'Module updated successfully!');
    }


    // Delete an existing module
    public function destroy($courseId, $moduleId)
    {
        $course = $this->coursesInterface->findById($courseId);
        $module = $this->modulesInterface->findById($moduleId);
        $module->delete();

        return redirect()->route('courses.edit', $course->id)
            ->with('success', 'Module deleted successfully!');
    }
}
