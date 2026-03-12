<?php

namespace App\Http\Requests\Lesson;

use Illuminate\Foundation\Http\FormRequest;


class LessonCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'lesson_title' => [
                'required',
                'regex:/^(?=.*[a-zA-Z])[\pL\s\pN+#]*$/',  // Requires at least one letter, allows letters, spaces, numbers, +, and #
                'max:125',
            ],

            'lesson_duration' => [
                'required',
                'numeric',
                'min:1',
                'max:120',
            ],
            'lesson_video' => 'required|mimes:mp4,avi,mkv|max:1048576000',
            'lesson_note' => 'nullable|string|max:255',
            'lesson_description' => 'required|string|max:600',
            'lesson_introduction' => 'nullable|string|max:255',
            'lesson_files' => 'nullable|max:102400',
            'lesson_files.*' => 'file|mimes:pdf,doc,docx|max:102400',
        ];
    }

    public function messages()
    {
        return [
            'lesson_title.required' => 'Please provide a title for the lesson.',
            'lesson_title.string' => 'The lesson title must contain valid text.',
            'lesson_title.max' => 'The lesson title must not exceed 125 characters.',
            'lesson_title.regex' => 'The lesson title must contain only letters with numbers',

            'lesson_duration.required' => 'Please specify the duration of the lesson.',
            'lesson_duration.numeric' => 'The lesson duration must be a numeric value.',
            'lesson_duration.min' => 'The lesson duration must be a positive number.',
            'lesson_duration.max' => 'The lesson duration must not exceed 120 minutes.',

            'lesson_video.required' => 'Please upload a video for the lesson.',
            'lesson_video.mimes' => 'The video must be in one of the following formats: mp4, avi, or mkv.',
            'lesson_video.max' => 'The video file size must not exceed 1 GB.',

            'lesson_note.max' => 'The lesson note must not exceed 255 characters.',

            'lesson_description.required' => 'Please provide a description for the lesson.',
            'lesson_description.string' => 'The lesson description must contain valid text.',
            'lesson_description.max' => 'The lesson description must not exceed 600 characters.',

            'lesson_introduction.max' => 'The introduction must not exceed 255 characters.',

            'lesson_files.max' => 'The total size of all uploaded files must not exceed 100 MB.',
            'lesson_files.*.file' => 'Each uploaded file must be a valid document.',
            'lesson_files.*.mimes' => 'Uploaded files must be in PDF, DOC, or DOCX format.',
            'lesson_files.*.max' => 'Each uploaded file must not exceed 100 MB.',
        ];
    }
}
