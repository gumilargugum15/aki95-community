<?php

namespace App\Repositories\Eloquent;

use App\Models\GalleryAlbum;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;

class GalleryAlbumRepository extends BaseRepository implements GalleryAlbumRepositoryInterface
{
    public function __construct(GalleryAlbum $model)
    {
        parent::__construct($model);
    }
}
