<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TouringResource extends JsonResource
{
    use FormatsImageUrl;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'cover_image' => $this->imageUrl($this->cover_image),
            'location' => $this->location,
            'start_date' => $this->start_date?->toDateString(),
            'end_date' => $this->end_date?->toDateString(),
            'route' => $this->route,
            'description' => $this->description,
            'participant_count' => $this->participant_count,
            'status' => $this->status,
            'creator' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'gallery_albums' => GalleryAlbumResource::collection($this->whenLoaded('galleryAlbums')),
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'created_at' => $this->created_at,
        ];
    }
}
