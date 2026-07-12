<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaksosResource extends JsonResource
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
            'date' => $this->date?->toDateString(),
            'description' => $this->description,
            'donation_target' => $this->donation_target,
            'donation_collected' => $this->donation_collected,
            'status' => $this->status,
            'creator' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'gallery_albums' => GalleryAlbumResource::collection($this->whenLoaded('galleryAlbums')),
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'created_at' => $this->created_at,
        ];
    }
}
