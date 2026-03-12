<?php

namespace App\Repositories\All\Lessons;
use App\Models\CourseLesson;
use App\Repositories\Base\BaseRepository;


// repository Class
class LessonsRepository extends BaseRepository implements LessonsInterface
{
    /**
     * @var CourseLesson
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  CourseLesson  $model
     */
    public function __construct(CourseLesson $model)
    {
        $this->model = $model;
    }


}
