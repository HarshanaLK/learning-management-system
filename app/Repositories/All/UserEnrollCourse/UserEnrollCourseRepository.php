<?php

namespace App\Repositories\All\UserEnrollCourse;
use App\Models\NewsLetterSubscriber;
use App\Models\UserEnrollCourse;
use App\Repositories\Base\BaseRepository;


// repository Class
class UserEnrollCourseRepository extends BaseRepository implements UserEnrollCourseInterface
{
    /**
     * @var UserEnrollCourse
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  UserEnrollCourse $model
     */
    public function __construct(UserEnrollCourse $model)
    {
        $this->model = $model;
    }

  


}
