<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GalleryAlbum extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'touring_id',
        'baksos_id',
        'title',
        'slug',
        'cover_image',
        'description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function touring(): BelongsTo
    {
        return $this->belongsTo(Touring::class);
    }

    public function baksos(): BelongsTo
    {
        return $this->belongsTo(Baksos::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class, 'album_id')->orderBy('order');
    }
}
