<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Baksos extends Model
{
    use HasFactory;

    protected $table = 'baksos';

    protected $fillable = [
        'created_by',
        'title',
        'slug',
        'cover_image',
        'location',
        'date',
        'description',
        'donation_target',
        'donation_collected',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'donation_target' => 'decimal:2',
            'donation_collected' => 'decimal:2',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function galleryAlbums(): HasMany
    {
        return $this->hasMany(GalleryAlbum::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
