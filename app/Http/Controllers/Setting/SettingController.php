<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\SettingCreateRequest;
use App\Repositories\All\UserProfile\UserProfileInterface;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{

    public function __construct(
        protected UserProfileInterface $userProfileInterface,
    ) {}


    public function index(Request $request): Response
    {
        $userProfile = $this->userProfileInterface->findByColumn(
            ['user_id' => Auth::id()],
            ['*']
        );

        return Inertia::render('Admin/Settings/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user(),
            'userProfile' => $userProfile
        ]);
    }



    public function update(SettingCreateRequest $request)
    {

        $user = Auth::user();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->address = $request->address;
        $user->date_of_birth = $request->date_of_birth;
        $user->mobile = $request->mobile;
        $user->email = $request->email;
        $user->gender = $request->gender;


        if ($request->hasFile('profile_photo')) {

            if ($user->profile_avatar && Storage::exists($user->profile_avatar)) {
                Storage::delete($user->profile_avatar);
            }

            $path = $request->file('profile_photo')->store('profile_photos', 'public');
            $user->profile_avatar = $path;
        }

        $request->user()->save();

        return redirect()->route('setting.index')->with('success', 'Profile updated successfully.');
    }





    public function deleteProfilePhoto()
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if ($user && $user->profile_avatar) {
            Storage::disk('public')->delete($user->profile_avatar);
            $user->profile_avatar = null;
            $user->save();

            return redirect()->route('setting.index')->with('success', 'Profile photo deleted successfully.');
        }
    }
}
