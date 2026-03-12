<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEnrollCourse extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'course_id',
        'purchase_date',
        'progress',
    ];



    protected static function booted()
    {
        static::created(function ($enrollCourse) {
            $enrollCourse->user->increment('course_count');
        });

        static::deleted(function ($enrollCourse) {
            $enrollCourse->user->decrement('course_count');
        });
    }



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
