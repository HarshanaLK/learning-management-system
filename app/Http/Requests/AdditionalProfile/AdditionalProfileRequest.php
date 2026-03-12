<?php

namespace App\Http\Requests\AdditionalProfile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AdditionalProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'interest_fields' => 'nullable|string|required_without_all:levels,about_message',
            'levels' => 'nullable|string|required_without_all:interest_fields,about_message',
            'about_message' => 'nullable|string|required_without_all:interest_fields,levels|max:225',
        ];
    }

    public function messages()
    {
        return [
            'interest_fields.required_without_all' => '',
            'levels.required_without_all' => '',
            'about_message.required_without_all' => 'Please provide details at least one or more field',
            'about_message.max' => 'The about message must be 225 characters or less.',
        ];
    }
}
