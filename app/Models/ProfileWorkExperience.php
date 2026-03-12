<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileWorkExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'job_role',
        'work_start_date',
        'work_end_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
