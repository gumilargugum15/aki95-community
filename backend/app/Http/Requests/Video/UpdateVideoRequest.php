<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['nullable', 'exists:categories,id'],
            'touring_id' => ['nullable', 'exists:tourings,id'],
            'baksos_id' => ['nullable', 'exists:baksos,id'],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'youtube_url' => ['sometimes', 'required', 'url'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'description' => ['nullable', 'string'],
        ];
    }
}
