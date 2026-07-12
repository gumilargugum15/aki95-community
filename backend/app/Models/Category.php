<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    public const TYPE_GALLERY = 'gallery';
    public const TYPE_VIDEO = 'video';
    public const TYPE_NEWS = 'news';

    protected $fillable = [
        'type',
        'name',
        'slug',
        'description',
    ];

    public function galleryAlbums(): HasMany
    {
        return $this->hasMany(GalleryAlbum::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }
}
