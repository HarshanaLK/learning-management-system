<?php

namespace App\Http\Requests\Course;

use Illuminate\Foundation\Http\FormRequest;

class CourseCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:120',
            'author' => 'required|string|regex:/^[a-zA-Z\s]+$/|max:30',
            'lessons' => 'nullable|numeric',
            'image' => 'required|mimes:jpeg,png,jpg|max:2048',
            'course_video' => 'required|file|mimes:mp4,avi,mkv|max:512000',
            'rating' => 'nullable|numeric|min:0|max:5',
            'instructor_role' => 'required|string|max:30',
            'instructor_image' => 'required|image|max:2048',
            'price' => 'required|numeric|min:0|regex:/^\d{1,7}(\.\d{1,2})?$/',
            'description' => 'required|string|max:500',
            'what_you_learn' => 'nullable|string|max:255',
            'materials_included' => 'nullable|string|max:255',
            'requirements' => 'nullable|string|max:255',
            'course_tag' => 'required|array|max:25',
            'audience' => 'nullable|string',
            'course_status' => 'required|in:active,close',
            'course_level' => 'required|in:All Level,Beginner,Intermediate,Expert',
            'course_hours' => 'required|numeric|min:0|max:999',
            'course_language' => 'required|string'
        ];
    }


    public function messages()
    {
        return [
            'title.required' => 'Please provide a title for the course.',
            'title.string' => 'The course title must be a valid text.',
            'title.max' => 'The course title should not exceed 120 characters.',

            'author.required' => 'Please provide the author\'s name.',
            'author.string' => 'The author\'s name must be valid text.',
            'author.alpha' => 'The author\'s name must only contain alphabetic characters.',
            'author.max' => 'The author\'s name should not exceed 30 characters.',

            'lessons.numeric' => 'Please provide a valid number for the number of lessons.',

            'image.required' => 'Please upload a course image.',
            'image.mimes' => 'The uploaded file must be in JPEG, PNG, or JPG format.',
            'image.max' => 'The image should not exceed 2 MB.',

            'course_video.required' => 'Please upload a course trailer video.',
            'course_video.file' => 'The uploaded file must be a video.',
            'course_video.mimes' => 'The video must be in MP4, AVI, or MKV format.',
            'course_video.max' => 'The video file should not exceed 500 MB.',

            'rating.numeric' => 'Please provide a valid rating.',
            'rating.min' => 'The rating cannot be less than 0.',
            'rating.max' => 'The rating cannot exceed 5.',

            'instructor_role.required' => 'Please provide the instructor\'s role.',
            'instructor_role.string' => 'The instructor\'s role must be valid text.',
            'instructor_role.max' => 'The instructor\'s role should not exceed 30 characters.',

            'instructor_image.required' => 'Please upload the instructor\'s image.',
            'instructor_image.image' => 'The uploaded file must be an image.',
            'instructor_image.max' => 'The image should not exceed 2 MB.',

            'price.required' => 'Please provide the course price.',
            'price.numeric' => 'Please provide a valid price.',
            'price.min' => 'The price cannot be less than 0.',
            'price.regex' => 'The price must be a valid monetary value with up to 7 digits and 2 decimal places.',

            'description.required' => 'Please provide a description of the course.',
            'description.string' => 'The description must be valid text.',
            'description.max' => 'The description should not exceed 500 characters.',

            'what_you_learn.string' => 'Please provide the topics you will cover in the course.',
            'what_you_learn.max' => 'The topics you will learn should not exceed 255 characters.',

            'materials_included.string' => 'Please provide a list of materials included in the course.',
            'materials_included.max' => 'The materials included description should not exceed 255 characters.',

            'requirements.string' => 'Please list the prerequisites for the course.',
            'requirements.max' => 'The requirements description should not exceed 255 characters.',

            'course_tag.array' => 'Please provide valid tags for the course.',
            'course_tag.max' => 'The tags should not exceed 25 items.',

            'audience.string' => 'Please specify the target audience for the course.',

            'course_status.required' => 'Please select the course status (active or closed).',
            'course_status.in' => 'The course status must be either active or closed.',

            'course_level.required' => 'Please select the course level type.',
            'course_level.in' => 'The course level must be one of All Level, Beginner, Intermediate, or Expert.',

            'course_hours.required' => 'Please provide the total hours of the course.',
            'course_hours.numeric' => 'The course hours must be a valid number.',
            'course_hours.min' => 'The course hours cannot be less than 0.',
            'course_hours.max' => 'The course hours cannot exceed 999.',

            'course_language.required' => 'Please specify the language of the course.',
            'course_language.string' => 'The course language must be valid text.',
        ];
    }
}
