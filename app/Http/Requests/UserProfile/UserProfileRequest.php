<?php

namespace App\Http\Requests\UserProfile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        Validator::extend('strict_email', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_EMAIL) && preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/', $value);
        });

        return [
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date|before:today',
            'mobile' => 'nullable|regex:/^\+?[0-9]*$/|max:15',
            'email' => 'strict_email|max:255|unique:users,email,' . Auth::id(),
            'gender' => 'nullable|string',
            'profile_photo' => 'nullable|image|mimes:jpg,png|max:1024',
        ];

    }



    public function messages()
    {
        return [
            'first_name.required' => 'First name is required.',
            'first_name.alpha' => 'First name should only contain letters.',
            'first_name.max' => 'First name cannot exceed 255 characters.',

            'last_name.required' => 'Last name is required.',
            'last_name.alpha' => 'Last name should only contain letters.',
            'last_name.max' => 'Last name cannot exceed 255 characters.',

            'address.string' => 'Address must be a valid string.',
            'address.max' => 'Address cannot exceed 255 characters.',

            'date_of_birth.date' => 'Date of birth must be a valid date.',

            'mobile.regex' => 'Mobile number must contain only digits and may start with a plus sign.',
            'mobile.max' => 'Mobile number cannot exceed 15 digits.',

            'email' => [
                'required' => 'Please enter your email address.',
                'email' => 'Please enter a valid email address (e.g., example@example.com).',
                'max' => 'The email address must not exceed 255 characters.',
                'strict_email' => 'Please enter a valid email address with a proper domain (e.g., example@example.com).'
            ],


            'email.strict_email' => 'Please enter a valid email address.',
            'email.max' => 'Email address cannot exceed 255 characters.',
            'email.unique' => 'This email address is already in use.',

            'gender.string' => 'Gender must be a valid string.',

            'profile_photo.image' => 'Profile photo must be an image.',
            'profile_photo.mimes' => 'Profile photo must be in JPG or PNG format.',
            'profile_photo.max' => 'Profile photo size cannot exceed 1MB.',
        ];
    }

}



