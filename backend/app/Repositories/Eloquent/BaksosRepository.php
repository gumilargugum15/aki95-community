<?php

namespace App\Repositories\Eloquent;

use App\Models\Baksos;
use App\Repositories\Contracts\BaksosRepositoryInterface;

class BaksosRepository extends BaseRepository implements BaksosRepositoryInterface
{
    public function __construct(Baksos $model)
    {
        parent::__construct($model);
    }
}
