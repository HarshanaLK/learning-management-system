<?php

namespace App\Repositories\All\Courses;

use App\Models\Course;
use App\Repositories\Base\BaseRepository;


// repository Class
class CoursesRepository extends BaseRepository implements CoursesInterface
{
    /**
     * @var Course
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Course  $model
     */
    public function __construct(Course $model)
    {
        $this->model = $model;
    }


}
