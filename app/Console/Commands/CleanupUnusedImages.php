<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class CleanupUnusedImages extends Command
{
    // The name and signature of the console command.
    protected $signature = 'cleanup:unused-images';

    // The console command description.
    protected $description = 'Delete unused image files from storage';

    // Execute the console command.
    public function handle()
    {
        // Get all course images in storage
        $storedImages = Storage::disk('public')->files('course_images');
        $storedInstructorImages = Storage::disk('public')->files('instructor_images');
        $storedProfilePhotos = Storage::disk('public')->files('profile_photos');

        // Get all image files used by the courses
        $usedImages = Course::pluck('image')->filter()->toArray();
        $usedInstructorImages = Course::pluck('instructor_image')->filter()->toArray();
        $usedProfilePhotos = User::whereNotNull('profile_avatar')->pluck('profile_avatar')->filter()->toArray();

        // Delete any unused course images
        foreach ($storedImages as $image) {
            if (!in_array($image, $usedImages)) {
                Storage::disk('public')->delete($image);
                $this->info("Deleted unused course image: $image");
            }
        }

        // Delete any unused instructor images
        foreach ($storedInstructorImages as $image) {
            if (!in_array($image, $usedInstructorImages)) {
                Storage::disk('public')->delete($image);
                $this->info("Deleted unused instructor image: $image");
            }
        }

        // Delete any unused profile photos
        foreach ($storedProfilePhotos as $photo) {
            if (!in_array($photo, $usedProfilePhotos)) {
                Storage::disk('public')->delete($photo);
                $this->info("Deleted unused profile photo: $photo");
            }
        }

        $this->info('Unused images cleanup completed.');
    }
}
