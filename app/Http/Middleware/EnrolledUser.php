<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnrolledUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $courseId = $request->route('id'); // Ensure this matches the route parameter.

        // Check if the user has purchased the course.
        if (!$user || !$user->userEnrollcourse->contains('course_id', $courseId)) {
            return redirect()->route('home')->with('error', 'You do not have access to this course.');
        }

        return $next($request);
    }
}
