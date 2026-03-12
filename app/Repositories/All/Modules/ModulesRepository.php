<?php

namespace App\Repositories\All\Modules;
use App\Models\CourseModule;
use App\Repositories\Base\BaseRepository;


// repository Class
class ModulesRepository extends BaseRepository implements ModulesInterface
{
    /**
     * @var CourseModule
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  CourseModule  $model
     */
    public function __construct(CourseModule $model)
    {
        $this->model = $model;
    }


}
