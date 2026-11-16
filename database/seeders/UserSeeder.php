<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        $users = [
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@lms.test',
                'password' => 'Admin@12345',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Instructor',
                'last_name' => 'User',
                'email' => 'instructor@lms.test',
                'password' => 'Instructor@12345',
                'role' => 'user',
            ],
            [
                'first_name' => 'Student',
                'last_name' => 'User',
                'email' => 'student@lms.test',
                'password' => 'Student@12345',
                'role' => 'user',
            ],
        ];

        foreach ($users as $data) {
            $user = User::firstOrNew([
                'email' => $data['email'],
            ]);

            $user->forceFill([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'password' => Hash::make($data['password']),
                'role' => $data['role'],
                'course_count' => 0,
                'email_verified_at' => now(),
            ])->save();
        }

        $this->command->info('LMS users seeded successfully!');
    }
}
