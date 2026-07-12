<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryAlbumResource extends JsonResource
{
    use FormatsImageUrl;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->whenLoaded('category', fn () => new CategoryResource($this->category)),
            'touring_id' => $this->touring_id,
            'baksos_id' => $this->baksos_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'cover_image' => $this->imageUrl($this->cover_image),
            'description' => $this->description,
            'photos' => GalleryPhotoResource::collection($this->whenLoaded('photos')),
            'created_at' => $this->created_at,
        ];
    }
}
