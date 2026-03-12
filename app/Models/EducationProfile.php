<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'institute_name',
        'degree',
        'education_start_date',
        'education_end_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
