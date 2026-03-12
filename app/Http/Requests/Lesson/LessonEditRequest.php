<?php

namespace App\Http\Requests\Lesson;

use Illuminate\Foundation\Http\FormRequest;


class LessonEditRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'lesson_title' => 'required|string|max:255',
            'lesson_duration' => 'required|numeric',
            'lesson_video' => [
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
                        $maxSize = 1073741824; // 2MB in KB
                        if (!$file->isValid() || !in_array($file->getClientOriginalExtension(), $allowedMimes)) {
                            $fail($attribute . ' must be a valid file of type: mp4, avi, or mkv.');
                        }
                        if ($file->getSize() > $maxSize) {
                            $fail($attribute . ' must not exceed 1GB in size.');
                        }
                    } else {
                        $fail($attribute . ' must be either a valid string or a valid video file.');
                    }
                },
            ],
            'lesson_note' => 'nullable|string|max:255',
            'lesson_description' => 'nullable|string|max:500',
            'lesson_introduction' => 'nullable|string|max:255',
            'lesson_files.*' => 'nullable|max:102400',
        ];
    }
}
