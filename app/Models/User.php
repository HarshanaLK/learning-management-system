<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;


    use Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'profile_avatar',
        'address',
        'date_of_birth',
        'mobile',
        'gender',
        'course_count'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function scopeOrderByColumn($query, $column, $direction = 'asc')
    {
        $query->orderBy($column, $direction);
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['searchParam'] ?? null, function ($query, $search) {
            // Check if the search term contains both first and last names
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$search%"])
                    ->orWhere('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });

        // Filter by role
        $query->when($filters['role'] ?? null, function ($query, $role) {
            $query->where('role', $role);
        });
    }

    public function educationmodules()
    {
        return $this->hasMany(EducationProfile::class); // Adjust this if your Module model's namespace is different
    }

    public function modules()
    {
        return $this->hasMany(ProfileWorkExperience::class); // Adjust this if your Module model's namespace is different
    }


    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user')
            ->withPivot('purchase_date', 'progress')
            ->withTimestamps();
    }

    public function certificate()
    {
        return $this->hasMany(Certificate::class);
    }



    public function userEnrollcourse()
    {
        return $this->hasMany(UserEnrollCourse::class); // Adjust this if your Module model's namespace is different
    }


}
