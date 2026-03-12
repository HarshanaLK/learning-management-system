<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Contact\ContactController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\NewsLetter\NewsletterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\UserCourse\UserCourseController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\RegisteredEntollUserController;
use App\Http\Controllers\Course\LessonController;
use App\Http\Controllers\Course\ModuleController;
use App\Http\Controllers\CourseEnroll\CourseEnrollController;
use App\Http\Controllers\CourseProgress\CourseProgressController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\PrivacyPolicy\PrivacyPolicyController;
use App\Http\Controllers\Setting\SettingController;
use App\Http\Middleware\EnrolledUser;

Route::get('/', function () {
    return Inertia::render('', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});




// Authentication users controllers
Route::middleware('auth')->group(function () {

    Route::prefix('profile')->controller(ProfileController::class)->name("profile.")->group(function () {
        Route::get('/',  'index')->name('index');
        Route::post('/',  'update')->name('update');
        Route::post('/additional',  'storeAdditional')->name('update.additional');
        Route::post('/education',  'storeEducation')->name('store.education');
        Route::patch('/education/{id}',  'updateEducation')->name('update.education');
        Route::delete('/education/{id}',  'destroyEducation')->name('delete.education');
        Route::post('/work',  'storeWork')->name('store.work');
        Route::patch('/work/{id}',  'updateWork')->name('update.work');
        Route::delete('/work/{id}',  'destroyWork')->name('delete.work');
        Route::delete('/additional/{id}',  'destroyAdditional')->name('delete.additional');
        Route::post('/delete-icon',  'deleteProfileIcon')->name('deleteIcon');
    });

    Route::post('/lessons/{lesson}/progress', [CourseProgressController::class, 'updateProgress'])->name('lesson.progress.update');


    Route::prefix('users')->controller(UserCourseController::class)->name("users.")->group(function () {
        Route::get('/completed-courses', 'getCompletedCourses')->name('getCompletedCourses');
        Route::get('/ongoing-courses', 'getOngoingCourses')->name('getOngoingCourses');
    });

    Route::post('/courses/{course}/checkout', [PaymentController::class, 'checkout'])->name('courses.checkout');
    Route::get('/checkout/success', [PaymentController::class, 'success'])->name('checkout.success');
});



// google authentication controller
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);




// Admin area controllers
Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');


    Route::prefix('privacy-policy')->controller(PrivacyPolicyController::class)->name('privacy-policy.')->group(function () {
        Route::get('/edit', 'index')->name('index');
        Route::post('/', 'store')->name('store');
    });


    Route::prefix('courses')->controller(CourseController::class)->name('courses.')->group(function () {
        Route::get('/all', 'all')->name('all');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::post('/update/{id}', 'update')->name('update');
        Route::get('/create', 'create')->name('create');
        Route::post('/{id}/clearImage', 'clearImage')->name('clearImage');
        Route::post('/{id}/clearInstructorImage', 'clearInstructorImage')->name('clearInstructorImage');
        Route::post('/{courseId}/clear-video', 'clearVideo')->name('clearVideo');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}/preview', 'preview')->name('preview');
    });


    Route::prefix('courses/{courseId}')->name('course.modules.')->controller(ModuleController::class)->group(function () {
        Route::post('modules', 'store')->name('store');
        Route::put('modules/{moduleId}', 'update')->name('update');
        Route::delete('modules/{moduleId}', 'destroy')->name('destroy');
    });


    Route::post('/lessons/{lesson}', [LessonController::class, 'update'])->name('lesson.update');


    Route::prefix('courses')->controller(LessonController::class)->name("course.lessons.")->group(function () {
        Route::post('/{moduleId}/lessons', 'store')->name('store');
        Route::post('/{moduleId}/lessons/{lessonId}', 'update')->name('update');
    });


    Route::delete('/course/{moduleId}/lesson/{lessonId}', [LessonController::class, 'destroy'])->name('lesson.destroy');

    Route::prefix('setting')->controller(SettingController::class)->name("setting.")->group(function () {
        Route::get('/',  'index')->name('index');
        Route::post('/', 'update')->name('update');
        Route::post('/delete-picture',  'deleteProfilePhoto')->name('delete_picture');
    });


    Route::prefix('students')->controller(StudentController::class)->name("students.")->group(function () {
        Route::get('/',  'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::patch('/{id}',  'update')->name('update');
        Route::delete('/{id}',  'destroy')->name('destroy');
    });
});





// course Enrolled users Area
Route::middleware(['auth', EnrolledUser::class])->group(function () {

    Route::prefix('my-courses/{id}')->name('my-courses.')->controller(CourseProgressController::class)->group(function () {
        Route::get('/', 'show')->name('show');
        Route::get('/modules/{module_id}/lessons/{lesson_id}', 'showLesson')->name('lessons.show');
        Route::get('/certificate', 'generateCertificate')->name('certificate');
        Route::get('/modulesa/{module_id}/lessons/{lesson_id}', 'getProgress')->name('progress.get');
    });

    Route::prefix('users')->controller(UserCourseController::class)->name("users.")->group(function () {
        Route::get('/modules/{id}', 'showModule')->name('module');
        Route::get('/grades/{id}', 'showGrade')->name('grade');
    });
});





// public users area
Route::get('/', [HomeController::class, 'home'])->name('home');

Route::get('/about', function () {
    return Inertia::render('PublicArea/AboutUs/Index');
})->name('about');

Route::prefix('contact')->controller(ContactController::class)->name("contact.")->group(function () {
    Route::get('/',  'index')->name('index');
    Route::post('/', 'store')->name('store');
});

Route::post('/subcribe', [NewsletterController::class, 'store'])->name('subscribe');

Route::get('/privacy-policy', [PrivacyPolicyController::class, 'show'])->name('privacy-policy.show');

Route::prefix('courses')->controller(CourseController::class)->name("courses.")->group(function () {
    Route::get('/',  'index')->name('index');
    Route::get('/{id}', 'show')->name('show');
});

Route::prefix('enroll')->controller(CourseEnrollController::class)->name("enroll.")->group(function () {
    Route::get('/{id}',  'show')->name('show');
    Route::post('/', 'store')->name('store');
});

Route::post('/register-enroll', [RegisteredEntollUserController::class, 'store'])->name('register.enroll');



require __DIR__ . '/auth.php';
