<?php

namespace App\Repositories\All\Contacts;

use App\Models\Contact ;
use App\Repositories\All\Contacts\ContactInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class ContactRepository extends BaseRepository implements ContactInterface
{
    /**
     * @var Contact
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Contact  $model
     */
    public function __construct(Contact $model)
    {
        $this->model = $model;
    }


}
