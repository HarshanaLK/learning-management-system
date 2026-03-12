<?php

namespace App\Repositories\All\LessonProgress;

use App\Models\LessonProgress;
use App\Repositories\All\LessonProgress\LessonProgressInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class LessonProgressRepository extends BaseRepository implements LessonProgressInterface
{
    /**
     * @var LessonProgress
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  LessonProgress  $model
     */
    public function __construct(LessonProgress $model)
    {
        $this->model = $model;
    }

    public function createOrUpdate(array $load, array $payload): ?LessonProgress
    {
        return parent::createOrUpdate($load, $payload);
    }


}
