<?php

namespace App\Repositories\All\Profiles\Additional;

use App\Models\UserProfile;
use App\Repositories\Base\BaseRepository;


// repository Class
class AdditionalRepository extends BaseRepository implements AdditionalInterface
{
    /**
     * @var UserProfile
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  UserProfile  $model
     */
    public function __construct(UserProfile $model)
    {
        $this->model = $model;
    }


    public function updateOrCreate(array $conditions, array $data):UserProfile
    {
        return $this->model->updateOrCreate($conditions, $data);
    }


}
