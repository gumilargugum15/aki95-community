<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $memberId = $this->route('member')?->id;

        return [
            'user_id' => ['nullable', 'exists:users,id', Rule::unique('members', 'user_id')->ignore($memberId)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'regional' => ['sometimes', 'required', 'string', 'max:255'],
            'motor_type' => ['sometimes', 'required', 'string', 'max:255'],
            'motor_year' => ['nullable', 'string', 'max:4'],
            'join_year' => ['sometimes', 'required', 'integer', 'min:1990', 'max:'.(date('Y') + 1)],
            'is_active' => ['boolean'],
            'address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'bio' => ['nullable', 'string'],
        ];
    }
}
