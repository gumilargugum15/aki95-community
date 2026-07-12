<?php

namespace App\Http\Requests\Touring;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTouringRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'route' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'participant_count' => ['nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'required', Rule::in(['upcoming', 'ongoing', 'completed', 'cancelled'])],
        ];
    }
}
