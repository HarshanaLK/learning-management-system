<?php

use App\Models\PrivacyPolicy;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the public privacy page when no policy record exists', function () {
    $this->get('/privacy-policy')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('PublicArea/Term&Condition/Index')
            ->where('privacyPolicy.content', '')
        );
});

it('renders the public privacy page when policy content is empty', function () {
    PrivacyPolicy::create(['content' => '']);

    $this->get('/privacy-policy')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('PublicArea/Term&Condition/Index')
            ->where('privacyPolicy.content', '')
        );
});

it('renders existing privacy policy content', function () {
    PrivacyPolicy::create(['content' => '<p>Privacy policy text</p>']);

    $this->get('/privacy-policy')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('PublicArea/Term&Condition/Index')
            ->where('privacyPolicy.content', '<p>Privacy policy text</p>')
        );
});

it('renders the admin privacy editor before a policy has been created', function () {
    $admin = User::create([
        'first_name' => 'Admin',
        'last_name' => 'Example',
        'email' => 'admin-privacy@example.test',
        'password' => 'test-password',
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get('/privacy-policy/edit')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/TermConditionHandle/Index')
            ->where('privacyPolicy.content', '')
        );
});
