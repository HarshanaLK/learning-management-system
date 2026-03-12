<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;



class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {

        $id = $this->route('id');

        return [
            'first_name' => 'required|string|regex:/^[a-zA-Z]+$/',
            'last_name' => 'required|string|regex:/^[a-zA-Z]+$/',
            'email' => 'required|email|unique:users,email,' . $id,
        ];
    }


    public function messages(): array
{
    return [
        'first_name.required' => 'Please provide your first name.',
        'first_name.string' => 'Your first name should only contain letters.',
        'first_name.regex' => 'Your first name can only include alphabetic characters.',

        'last_name.required' => 'Please provide your last name.',
        'last_name.string' => 'Your last name should only contain letters.',
        'last_name.regex' => 'Your last name can only include alphabetic characters.',

        'email.required' => 'Please provide your email address.',
        'email.email' => 'Oops! That doesn’t look like a valid email address.',
        'email.unique' => 'This email is already registered. ',
    ];
}
}
