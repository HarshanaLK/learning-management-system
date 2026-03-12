<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'lessons',
        'image',
        'course_video',
        'rating',
        'instructor_role',
        'instructor_image',
        'price',
        'description',
        'what_you_learn',
        'materials_included',
        'requirements',
        'tags',
        'audience',
        'course_status',
        'purchased_count',
        'purchased_income',
        'course_level',
        'course_hours',
        'course_language',
    ];

    protected $casts = [
        'what_you_learn' => 'array',
        'materials_included' => 'array',
        'requirements' => 'array',
        'tags' => 'array',
    ];




    protected static function booted()
    {
        static::saving(function ($course) {
            $course->purchased_income = $course->purchased_count * $course->price;
        });
    }



    public function scopeOrderByColumn($query, $column, $direction = 'asc')
    {
        if ($column === 'created_date') {
            $query->orderByRaw('DATE(created_at) ' . $direction);
        } elseif ($column === 'created_time') {
            $query->orderByRaw('TIME(created_at) ' . $direction);
        } else {
            $query->orderBy($column, $direction);
        }
    }




    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['searchParam'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%$search%")
                    ->orWhere('course_status', 'like', "%$search%")
                    ->orWhere('created_at', 'like', "%$search%")
                    ->orWhere('purchased_income', 'like', "%$search%")
                    ->orWhere('author', 'like', "%$search%");
            });
        })
        ->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        })
        ->when($filters['course_status'] ?? null, function ($query) {
            $query->where('course_status', 'active');
        });
    }



    public function modules()
    {
        return $this->hasMany(CourseModule::class);
    }


    public function CourseTag()
    {
        return $this->hasMany(CourseTag::class);
    }

    public function userEnrollcourse()
    {
        return $this->hasMany(UserEnrollCourse::class);
    }


    public function certificate()
    {
        return $this->hasMany(Certificate::class);
    }



    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot('purchase_date', 'progress')
            ->withTimestamps();
    }
}
