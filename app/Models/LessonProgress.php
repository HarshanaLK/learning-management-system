<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lesson_id',
        'progress',
        'completed',
    ];


    public function lessons()
    {
        return $this->belongsTo(CourseLesson::class, 'lesson_id');
    }

}
