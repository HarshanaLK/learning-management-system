<?php

namespace App\Http\Controllers\NewsLetter;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsLetter\SubscribeNewsletterRequest;
use App\Repositories\All\NewsLetter\NewsLetterInterface;


class NewsletterController extends Controller
{

    public function __construct(
        protected NewsLetterInterface $newsLetterInterface,
    ) {}


    public function store(SubscribeNewsletterRequest $request)
    {
        // Check if the email already exists using existsByColumn
        if ($this->newsLetterInterface->existsByColumn(['email' => $request->email])) {
            return redirect()->back()->withErrors(['email' => 'This email address is already subscribed.']);
        }

        // Save the email to the database
        $this->newsLetterInterface->create([
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'Thank you for subscribing to our newsletter. Stay tuned for the latest updates!');
    }
}
