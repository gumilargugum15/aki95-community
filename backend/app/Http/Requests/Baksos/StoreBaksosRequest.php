<?php

namespace App\Http\Requests\Baksos;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBaksosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'location' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
            'donation_target' => ['nullable', 'numeric', 'min:0'],
            'donation_collected' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['upcoming', 'ongoing', 'completed', 'cancelled'])],
        ];
    }
}
