<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'youtube_url' => $this->youtube_url,
            'thumbnail' => $this->imageUrl($this->thumbnail),
            'description' => $this->description,
            'created_at' => $this->created_at,
        ];
    }
}
