<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Repositories\All\Courses\CoursesInterface;
use App\Repositories\All\UserEnrollCourse\UserEnrollCourseInterface;
use App\Repositories\All\Users\UsersInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller

{

    public function __construct(
        protected CoursesInterface $coursesInterface,
        protected UserEnrollCourseInterface $userEnrollCourseInterface,
        protected UsersInterface $usersInterface,

    ) {}


    public function checkout(Request $request, $courseId)
    {
        $course = $this->coursesInterface->findById($courseId);
        $user = $request->user();


        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));

        $checkoutSession = $stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $course->title,
                    ],
                    'unit_amount' => $course->price * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('checkout.success') . "?&session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route('courses.show', ['id' => $courseId]),
            'metadata' => [
                'user_id' => $user->id,
                'course_id' => $course->id,
            ],
        ]);

        return Inertia::location($checkoutSession->url);
    }






    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');

        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        $session = $stripe->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status === 'paid') {
            $courseId = $session->metadata->course_id ?? null;
            $userId = $session->metadata->user_id ?? null;

            if (!$courseId || !$userId) {
                return redirect()->route('profile.index')->with('error', 'Invalid resource IDs.');
            }

            $course = $this->coursesInterface->findById($courseId);
            $user =  $this->usersInterface->findById($userId);

            if ($course && $user) {
                $this->userEnrollCourseInterface->create([
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                    'purchase_date' => now(),
                    'progress' => 0,
                ]);

                return redirect()->route('my-courses.show', ['id' => $course->id])
                    ->with('success', 'Course purchased successfully!');
            }

            return redirect()->route('profile.index')->with('error', 'Course or User not found.');
        }

        return redirect()->route('profile.index')->with('error', 'Payment not completed.');
    }
}
