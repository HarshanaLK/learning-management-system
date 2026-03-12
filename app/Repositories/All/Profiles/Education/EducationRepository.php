<?php

namespace App\Repositories\All\Profiles\Education;
use App\Models\EducationProfile;
use App\Repositories\All\Profiles\Education\EducationInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class EducationRepository extends BaseRepository implements EducationInterface
{
    /**
     * @var EducationProfile
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  EducationProfile  $model
     */
    public function __construct(EducationProfile $model)
    {
        $this->model = $model;
    }




}
