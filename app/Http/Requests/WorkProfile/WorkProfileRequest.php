<?php

namespace App\Http\Requests\WorkProfile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class WorkProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'company_name' => 'required|string|max:255',
            'job_role' => 'required|string|max:255',
            'work_start_date' => 'required|date',
            'work_end_date' => 'nullable|date',
        ];

    }
}
