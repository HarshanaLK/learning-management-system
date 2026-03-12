<?php

namespace App\Providers;

use App\Repositories\All\Certificate\CertificateInterface;
use App\Repositories\All\Certificate\CertificateRepository;
use App\Repositories\All\Contacts\ContactInterface;
use App\Repositories\All\Contacts\ContactRepository;
use App\Repositories\All\LessonProgress\LessonProgressInterface;
use App\Repositories\All\Courses\CoursesInterface;
use App\Repositories\All\Courses\CoursesRepository;
use App\Repositories\All\LessonProgress\LessonProgressRepository;
use App\Repositories\All\Lessons\LessonsInterface;
use App\Repositories\All\Lessons\LessonsRepository;
use App\Repositories\All\Modules\ModulesInterface;
use App\Repositories\All\Modules\ModulesRepository;
use App\Repositories\All\NewsLetter\NewsLetterInterface;
use App\Repositories\All\NewsLetter\NewsLetterRepository;
use App\Repositories\All\PrivacyPolicy\PrivacyPolicyInterface;
use App\Repositories\All\PrivacyPolicy\PrivacyPolicyRepository;
use App\Repositories\All\Profiles\Additional\AdditionalInterface;
use App\Repositories\All\Profiles\Additional\AdditionalRepository;
use App\Repositories\All\Profiles\Education\EducationInterface;
use App\Repositories\All\Profiles\Education\EducationRepository;
use App\Repositories\All\Profiles\Work\WorkInterface;
use App\Repositories\All\Profiles\Work\WorkRepository;
use App\Repositories\All\UserEnrollCourse\UserEnrollCourseInterface;
use App\Repositories\All\UserEnrollCourse\UserEnrollCourseRepository;
use App\Repositories\All\UserProfile\UserProfileInterface;
use App\Repositories\All\UserProfile\UserProfileRepository;
use App\Repositories\All\Users\UsersInterface;
use App\Repositories\All\Users\UsersRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UsersInterface::class, UsersRepository::class);
        $this->app->bind(ContactInterface::class, ContactRepository::class);
        $this->app->bind(CoursesInterface::class, CoursesRepository::class);
        $this->app->bind(AdditionalInterface::class, AdditionalRepository::class);
        $this->app->bind(EducationInterface::class, EducationRepository::class);
        $this->app->bind(WorkInterface::class, WorkRepository::class);
        $this->app->bind(ModulesInterface::class, ModulesRepository::class);
        $this->app->bind(LessonsInterface::class, LessonsRepository::class);
        $this->app->bind(NewsLetterInterface::class, NewsLetterRepository::class);
        $this->app->bind(PrivacyPolicyInterface::class, PrivacyPolicyRepository::class);
        $this->app->bind(UserProfileInterface::class, UserProfileRepository::class);
        $this->app->bind(UserEnrollCourseInterface::class, UserEnrollCourseRepository::class);
        $this->app->bind(CertificateInterface::class, CertificateRepository::class);
        $this->app->bind(LessonProgressInterface::class, LessonProgressRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
