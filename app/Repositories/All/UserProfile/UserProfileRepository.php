<?php

namespace App\Repositories\All\UserProfile;

use App\Models\User ;
use App\Models\UserProfile;
use App\Repositories\All\Users\UsersInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class UserProfileRepository extends BaseRepository implements UserProfileInterface
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


}
