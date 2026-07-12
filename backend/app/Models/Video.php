<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'touring_id',
        'baksos_id',
        'title',
        'youtube_url',
        'thumbnail',
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
}
