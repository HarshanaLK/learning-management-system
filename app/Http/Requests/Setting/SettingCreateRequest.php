<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SettingCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {


        Validator::extend('strict_email', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_EMAIL) && preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/', $value);
        });


        return [
            'first_name' => 'required|alpha|max:100',
            'last_name' => 'required|alpha|max:100',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date|before:today',
            'mobile' => 'nullable|regex:/^\+?[0-9]*$/|max:15',
            'email' => 'email|max:100|strict_email|unique:users,email,' . Auth::id(),
            'gender' => 'nullable|string',
            'profile_photo' => 'nullable|image|mimes:jpg,png|max:1024',
        ];

    }


    public function messages()
    {
        return [
            'first_name.required' => 'Please provide your first name.',

            'last_name.required' => 'Please provide your last name.',

            'date_of_birth.date' => 'Please provide a valid date of birth.',

            'mobile.regex' => 'Your mobile number should only contain numbers, and can optionally start with a "+" symbol.',
            'mobile.max' => 'Your mobile number can not be longer than 15 numbers',

            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'Your email can\'t be longer than 100 characters.',
            'email.strict_email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already in use. Please try another one.',

            'gender.string' => 'Please specify your gender in text format.',

            'profile_photo.image' => 'The profile photo must be an image file (like .jpg, .png).',
            'profile_photo.max' => 'The profile photo can\'t be larger than 1MB.',
        ];
    }
}
