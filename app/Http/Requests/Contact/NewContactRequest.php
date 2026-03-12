<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class NewContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {


        Validator::extend('strict_email', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_EMAIL) && preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/', $value);
        });


        return [
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => ['required', 'strict_email', 'max:255'],
            'contactNumber' => ['required', 'string', 'regex:/^[0-9]{10,15}$/'],
            'message' => ['required', 'string','max:1000'],
            'helpNeeded' => ['required', 'array'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.string' => 'Your name should only contain letters.',
            'name.max' => 'Your name should not exceed 255 characters.',
            'name.regex' => 'Please use only letters and spaces for your name.',

            'email' => [
                'required' => 'Please enter your email address.',
                'email' => 'Please enter a valid email address (e.g., example@example.com).',
                'max' => 'The email address must not exceed 255 characters.',
                'strict_email' => 'Please enter a valid email address with a proper domain (e.g., example@example.com).'
            ],

            'contactNumber.required' => 'Please enter your contact number.',
            'contactNumber.string' => 'The contact number should only contain numbers.',
            'contactNumber.regex' => 'Please enter a valid contact number between 10 to 15 digits.',

            'message.required' => 'Please enter your message.',
            'message.string' => 'Your message should be in text format.',
            'message.max' =>'Your massage should not be grater than 150 words limit ',

            'helpNeeded.required' => 'Please select at least one area where you need help.',
            'helpNeeded.array' => 'Your selection is not in a valid format.',
        ];
    }



}
