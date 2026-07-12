<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventRegistrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_id' => $this->event_id,
            'member_id' => $this->member_id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'motor_type' => $this->motor_type,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
