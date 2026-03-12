<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'lesson_title',
        'lesson_duration',
        'lesson_order',
        'lesson_status',
        'lesson_video',
        'lesson_note',
        'lesson_files',
        'lesson_description',
        'lesson_introduction',
        'video_original_name',
        'files_original_names',
    ];


    public function module()
    {
        return $this->belongsTo(CourseModule::class, 'module_id'); // Ensure this uses the correct foreign key
    }


    public function progress()
    {
        return $this->hasMany(LessonProgress::class, 'lesson_id');// Adjust this if your Module model's namespace is different
    }
}
