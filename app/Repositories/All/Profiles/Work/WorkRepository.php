<?php

namespace App\Repositories\All\Profiles\Work;

use App\Models\ProfileWorkExperience;
use App\Models\UserProfile;
use App\Repositories\Base\BaseRepository;


// repository Class
class WorkRepository extends BaseRepository implements WorkInterface
{
    /**
     * @var ProfileWorkExperience
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  ProfileWorkExperience  $model
     */
    public function __construct(ProfileWorkExperience $model)
    {
        $this->model = $model;
    }




}
