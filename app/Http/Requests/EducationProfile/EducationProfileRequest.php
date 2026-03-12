<?php

namespace App\Http\Requests\EducationProfile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EducationProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'institute_name' => 'required|string|alpha|max:150',
            'degree' => 'required|string|alpha|max:150',
            'education_start_date' => 'required|date',
            'education_end_date' => 'nullable|date',
        ];

    }
}
