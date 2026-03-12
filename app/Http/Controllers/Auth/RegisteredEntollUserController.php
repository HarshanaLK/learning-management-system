<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\All\Users\UsersInterface;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\UserRegistrationRequest;

class RegisteredEntollUserController extends Controller
{



    public function __construct(
        protected UsersInterface $usersInterface,
        ) {}
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(UserRegistrationRequest $request): RedirectResponse
    {
        $user = $this->usersInterface-> create($request->validated());

        event(new Registered($user));

        Auth::login($user);

        return back()->with('success', 'User registered successfully!');
    }
}
