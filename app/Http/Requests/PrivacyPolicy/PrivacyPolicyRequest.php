<?php

namespace App\Http\Requests\PrivacyPolicy;

use Illuminate\Foundation\Http\FormRequest;

class PrivacyPolicyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Update this if you have authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'privacy_policy' => 'required|string|max:9000',
        ];
    }

    /**
     * Get the custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'privacy_policy.required' => 'The privacy policy is required.',
            'privacy_policy.string' => 'The privacy policy must be a valid paragraph.',
            'privacy_policy.max' => 'The privacy policy must not exceed 1200 words.',
        ];
    }
}
