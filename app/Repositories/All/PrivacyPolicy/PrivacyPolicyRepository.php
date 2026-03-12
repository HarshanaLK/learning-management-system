<?php

namespace App\Repositories\All\PrivacyPolicy;
use App\Models\PrivacyPolicy;
use App\Repositories\Base\BaseRepository;


// repository Class
class PrivacyPolicyRepository extends BaseRepository implements PrivacyPolicyInterface
{
    /**
     * @var PrivacyPolicy
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  PrivacyPolicy $model
     */
    public function __construct(PrivacyPolicy $model)
    {
        $this->model = $model;
    }


}
