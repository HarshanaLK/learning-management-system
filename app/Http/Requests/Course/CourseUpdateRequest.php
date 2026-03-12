<?php

namespace App\Http\Requests\Course;

use Illuminate\Foundation\Http\FormRequest;

class CourseUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:120',
            'author' => 'required|string|max:30',
            'lessons' => 'nullable|numeric',
            'image' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        // Check if it's a valid string
                        if (!is_string($value) || strlen($value) > 255) {
                            $fail($attribute . ' must be a valid string with a maximum of 255 characters.');
                        }
                    } elseif (request()->hasFile($attribute)) {
                        // Validate file if present
                        $file = request()->file($attribute);
                        $allowedMimes = ['jpg', 'jpeg', 'png'];
                        $maxSize = 2 * 1024 * 1024; // 2MB
                        if (!$file->isValid() || !in_array($file->getClientOriginalExtension(), $allowedMimes)) {
                            $fail($attribute . ' must be a valid image file of type: jpg, jpeg or png');
                        }
                        if ($file->getSize() > $maxSize) {
                            $fail($attribute . ' must not exceed 2MB in size.');
                        }
                    } else {
                        $fail($attribute . ' must be either a valid string or a valid image file.');
                    }
                },
            ],

            'course_video' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        // Check if it's a valid string
                        if (!is_string($value) || strlen($value) > 255) {
                            $fail($attribute . ' must be a valid string with a maximum of 255 characters.');
                        }
                    } elseif (request()->hasFile($attribute)) {
                        // Validate file if present
                        $file = request()->file($attribute);
                        $allowedMimes = ['mp4', 'avi', 'mkv'];
                        $maxSize = 500 * 1024 * 1024;
                        if (!$file->isValid() || !in_array($file->getClientOriginalExtension(), $allowedMimes)) {
                            $fail($attribute . ' must be a valid file of type: mp4, avi, or mkv.');
                        }
                        if ($file->getSize() > $maxSize) {
                            $fail($attribute . ' must not exceed 500MB in size.');
                        }
                    } else {
                        $fail($attribute . ' must be either a valid string or a valid video file.');
                    }
                },
            ],

            'instructor_image' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        // Check if it's a valid string
                        if (!is_string($value) || strlen($value) > 255) {
                            $fail($attribute . ' must be a valid string with a maximum of 255 characters.');
                        }
                    } elseif (request()->hasFile($attribute)) {
                        // Validate file if present
                        $file = request()->file($attribute);
                        $allowedMimes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
                        $maxSize = 2 * 1024 * 1024; // 2MB
                        if (!$file->isValid() || !in_array($file->getClientOriginalExtension(), $allowedMimes)) {
                            $fail($attribute . ' must be a valid image file of type: jpg, jpeg, png, gif, or bmp.');
                        }
                        if ($file->getSize() > $maxSize) {
                            $fail($attribute . ' must not exceed 2MB in size.');
                        }
                    } else {
                        $fail($attribute . ' must be either a valid string or a valid image file.');
                    }
                },
            ],
            'rating' => 'nullable|numeric|min:0|max:5',
            'instructor_role' => 'required|string|max:30',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string|max:600',
            'what_you_learn' => 'nullable|array',
            'materials_included' => 'nullable|array',
            'requirements' => 'nullable|array',
            'course_tag' => 'nullable|array',
            'audience' => 'nullable|string',
            'course_status' => 'required|in:active,close',
            'course_level' => 'required|in:All Level,Beginner,Intermediate,Expert',
            'course_hours' => 'required|numeric|min:0',
            'course_language' => 'required|string'
        ];
    }



    public function messages()
    {
        return [
            'title.required' => 'The course title is required.',
            'title.max' => 'The course title must not exceed 120 characters.',
            'author.required' => 'The instructor name is required.',
            'author.max' => 'The author name must not exceed 30 characters.',
            'lessons.numeric' => 'The lessons field must be a number.',
            'image.image' => 'Please upload a valid image for the course.',
            'image.max' => 'The image must not exceed 2 MB in size.',
            'course_video.file' => 'Please upload a valid video file.',
            'course_video.mimes' => 'The video format must be MP4, AVI, or MKV.',
            'course_video.max' => 'The video file size must not exceed 500 MB.',
            'rating.numeric' => 'The rating must be a number.',
            'rating.min' => 'The rating cannot be less than 0.',
            'rating.max' => 'The rating cannot exceed 5.',
            'instructor_role.required' => 'The instructor role is required.',
            'instructor_image.image' => 'Please upload a valid image for the instructor.',
            'instructor_image.max' => 'The instructor image must not exceed 2 MB.',
            'price.required' => 'The course price is required.',
            'price.numeric' => 'The course price must be a valid number.',
            'price.min' => 'The course price cannot be less than 0.',
            'description.required' => 'The course description is required.',
            'description.max' => 'The course description must not exceed 600 characters.',
            'what_you_learn.array' => 'The "What You Will Learn" field must be a list.',
            'materials_included.array' => 'The materials included must be a list.',
            'requirements.array' => 'The course requirements must be a list.',
            'course_tag.array' => 'The course tags must be a list.',
            'audience.string' => 'The audience field must be a text description.',
            'course_status.required' => 'The course status is required.',
            'course_status.in' => 'The course status must be either active or close.',
            'course_level.required' => 'The course level is required.',
            'course_level.in' => 'The course level must be one of All Level, Beginner, Intermediate, or Expert.',
            'course_hours.required' => 'Please provide the total hours of the course.',
            'course_hours.numeric' => 'The course hours must be a valid number.',
            'course_hours.min' => 'The course hours cannot be less than 0.',
            'course_language.required' => 'Please specify the language of the course.',
            'course_language.string' => 'The course language must be valid text.',
        ];
    }
}
