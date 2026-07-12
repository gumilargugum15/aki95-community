<?php

namespace App\Http\Requests\Gallery;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryAlbumRequest extends FormRequest
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
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'description' => ['nullable', 'string'],
        ];
    }
}
