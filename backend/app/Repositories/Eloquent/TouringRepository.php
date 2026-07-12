<?php

namespace App\Repositories\Eloquent;

use App\Models\Touring;
use App\Repositories\Contracts\TouringRepositoryInterface;

class TouringRepository extends BaseRepository implements TouringRepositoryInterface
{
    public function __construct(Touring $model)
    {
        parent::__construct($model);
    }
}
