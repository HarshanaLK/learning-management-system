<?php

namespace App\Http\Requests\Student;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class StudentCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {

        $id = $this->route('id');

        Validator::extend('strict_email', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_EMAIL) && preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/', $value);
        });

        return [
            'first_name' => 'required|string|regex:/^[a-zA-Z]+$/|max:30',
            'last_name' => 'required|string|regex:/^[a-zA-Z]+$/|max:30',
            'email' => 'required|max:50|strict_email|unique:users,email,' . $id ,
            'password' => [
                'required',
                'string',
                'min:8',
                'max:30',
                'regex:/[!@#$%^&*(),.?":{}|<>]/',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'first_name.required' => 'Please provide student first name.',
            'first_name.string' => 'Student first name should only contain letters.',
            'first_name.regex' => 'Please provide student first name.',

            'last_name.required' => 'Please provide student last name.',
            'last_name.string' => 'Student last name should only contain letters.',
            'last_name.regex' => 'Please provide student last name.',

            'email.required' => 'Please provide student email address.',
            'email.strict_email' => 'Please enter a valid email address.',
            'email.email' => 'Oops! That doesn’t look like a valid email address.',
            'email.unique' => 'This email is already registered. ',

            'password.required' => 'Please provide a password.',
            'password.min' => 'Student password must be at least 8 characters long.',
            'password.regex' => 'Student password must include at least one special character (!@#$%^&*(),.?":{}|<>).',
        ];
    }
}
