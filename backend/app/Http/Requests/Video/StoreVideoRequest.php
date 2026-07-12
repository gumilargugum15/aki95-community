<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'youtube_url' => ['required', 'url'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'description' => ['nullable', 'string'],
        ];
    }
}
