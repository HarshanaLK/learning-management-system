<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\NewContactRequest;
use App\Notifications\ContactNotification;
use App\Repositories\All\Contacts\ContactInterface;
use App\Repositories\All\Users\UsersInterface;
use Inertia\Inertia;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{



    public function __construct(
        protected UsersInterface $usersInterface,
        protected ContactInterface $contactInterface,
    ) {}


    public function index()
    {
        return Inertia::render('PublicArea/ContactUs/Index');
    }



    public function store(NewContactRequest $request)
    {

        $isRegistered = $this->usersInterface->existsByColumn(['email' => $request->email]);

        $this->contactInterface->create([
            'helpNeeded' => json_encode($request->helpNeeded),
            'name' => $request->name,
            'email' => $request->email,
            'contactNumber' => $request->contactNumber,
            'message' => $request->message,
            'is_registered' => $isRegistered,
        ]);

        $adminEmail = config('services.admin_email');

        Notification::route('mail', $adminEmail)
            ->notify(new ContactNotification($request->all()));

        return redirect()->back()->with('success', 'Thank you for reaching out! Your message has been successfully sent. We will get back to you soon.');
    }
}
