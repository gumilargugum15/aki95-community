<?php

namespace App\Repositories\Eloquent;

use App\Models\GalleryPhoto;
use App\Repositories\Contracts\GalleryPhotoRepositoryInterface;

class GalleryPhotoRepository extends BaseRepository implements GalleryPhotoRepositoryInterface
{
    public function __construct(GalleryPhoto $model)
    {
        parent::__construct($model);
    }
}
