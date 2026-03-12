<?php

namespace App\Repositories\All\Profiles\Additional;

use App\Models\User;
use App\Models\UserProfile;
use App\Repositories\Base\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

// Interface
interface AdditionalInterface extends EloquentRepositoryInterface
{


    public function updateOrCreate(array $conditions, array $data):UserProfile;
}
