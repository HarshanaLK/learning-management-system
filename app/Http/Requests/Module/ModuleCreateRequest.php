<?php

namespace App\Http\Requests\Module;

use Illuminate\Foundation\Http\FormRequest;

class ModuleCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'module_title' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'module_title.required' => 'The module title is required. Please provide a title for the module.',
            'module_title.max' => 'The module title must not exceed 255 characters. Please shorten the title.',
        ];
    }
}
