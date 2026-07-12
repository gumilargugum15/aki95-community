<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\FormatsImageUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    use FormatsImageUrl;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'member_number' => $this->member_number,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'regional' => $this->regional,
            'motor_type' => $this->motor_type,
            'motor_year' => $this->motor_year,
            'join_year' => $this->join_year,
            'is_active' => $this->is_active,
            'address' => $this->address,
            'photo' => $this->imageUrl($this->photo),
            'bio' => $this->bio,
            'created_at' => $this->created_at,
        ];
    }
}
