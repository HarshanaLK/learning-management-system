<?php

namespace App\Repositories\All\LessonProgress;

use App\Models\LessonProgress;
use App\Repositories\Base\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

// Interface
interface LessonProgressInterface extends EloquentRepositoryInterface
{

    public function createOrUpdate(array $load, array $payload): ?LessonProgress;
}
