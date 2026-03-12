<?php

namespace App\Repositories\All\Certificate;

use App\Models\Certificate ;
use App\Repositories\All\Certificate\CertificateInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class CertificateRepository extends BaseRepository implements CertificateInterface
{
    /**
     * @var Certificate
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Certificate  $model
     */
    public function __construct(Certificate $model)
    {
        $this->model = $model;
    }


}
