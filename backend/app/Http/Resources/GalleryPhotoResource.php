<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryPhotoResource extends JsonResource
{
    use FormatsImageUrl;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'album_id' => $this->album_id,
            'photo_url' => $this->imageUrl($this->photo_path),
            'caption' => $this->caption,
            'order' => $this->order,
        ];
    }
}
