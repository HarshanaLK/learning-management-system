<?php

namespace App\Repositories\All\NewsLetter;
use App\Models\NewsLetterSubscriber;
use App\Repositories\Base\BaseRepository;


// repository Class
class NewsLetterRepository extends BaseRepository implements NewsLetterInterface
{
    /**
     * @var NewsLetterSubscriber
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  NewsLetterSubscriber $model
     */
    public function __construct(NewsLetterSubscriber $model)
    {
        $this->model = $model;
    }


}
