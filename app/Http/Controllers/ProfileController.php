<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdditionalProfile\AdditionalProfileRequest;
use App\Http\Requests\EducationProfile\EducationProfileRequest;
use App\Http\Requests\UserProfile\UserProfileRequest;
use App\Http\Requests\WorkProfile\WorkProfileRequest;
use App\Repositories\All\Profiles\Additional\AdditionalInterface;
use App\Repositories\All\Profiles\Education\EducationInterface;
use App\Repositories\All\Profiles\Work\WorkInterface;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;



class ProfileController extends Controller
{


    public function __construct(
        protected AdditionalInterface $additionalInterface,
        protected WorkInterface $workInterface,
        protected EducationInterface $educationInterface

    ) {}



    public function index(Request $request): Response
    {

        $userProfile = $this->additionalInterface->findByColumn(['user_id' => Auth::id()]);
        $educationProfiles = $this->educationInterface->getByColumn(['user_id' => Auth::id()]);
        $workProfiles = $this->workInterface->getByColumn(['user_id' => Auth::id()]);

        return Inertia::render('Profile/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user(),
            'userProfile' => $userProfile,
            'educationProfiles' => $educationProfiles,
            'workProfiles' => $workProfiles,
        ]);
    }



    public function update(UserProfileRequest $request)
    {
        $user = Auth::user();
        // Update user details
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

        return redirect()->route('profile.index')->with('success', 'Profile updated successfully.');
    }



    public function storeAdditional(AdditionalProfileRequest $request)
    {
        $this->additionalInterface->updateOrCreate(
            ['user_id' => Auth::id()],
            $request->only(['interest_fields', 'levels', 'about_message'])
        );
        return redirect()->back()->with('success', 'Profile updated successfully!');
    }



    // Education details
    public function storeEducation(EducationProfileRequest $request)
    {

        $this->educationInterface->create([
            'user_id' => Auth::id(),
            'institute_name' => $request->institute_name,
            'degree' => $request->degree,
            'education_start_date' => $request->education_start_date,
            'education_end_date' => $request->education_end_date,
        ]);

        return back()->with('success', 'Education information saved successfully!');
    }


    public function updateEducation(EducationProfileRequest $request, $id)
    {
        $educationProfile = $this->educationInterface->findById($id);
        if ($educationProfile->user_id !== Auth::id()) {
            return back()->withErrors('You do not have permission to edit this education entry.');
        }
        $educationProfile->update($request->all());

        return back()->with('success', 'Education information updated successfully!');
    }

    public function destroyEducation($id)
    {
        $educationProfile = $this->educationInterface->findByColumn(
            ['user_id' => Auth::id(), 'id' => $id]
        );
        if (!$educationProfile) {
            return redirect()->route('profile.index')->with('error', 'Education record not found.');
        }
        $this->educationInterface->deleteById($id);

        return redirect()->route('profile.index')->with('success', 'Education record deleted successfully.');
    }



    //Work details
    public function storeWork(WorkProfileRequest $request)
    {
        $this->workInterface->create([
            'user_id' => Auth::id(),
            'company_name' => $request->company_name,
            'job_role' => $request->job_role,
            'work_start_date' => $request->work_start_date,
            'work_end_date' => $request->work_end_date,
        ]);

        return back()->with('success', 'Work experience saved successfully!');
    }


    public function updateWork(WorkProfileRequest $request, $id)
    {
        $workProfile =  $this->workInterface->findById($id);
        if ($workProfile->user_id !== Auth::id()) {
            return back()->withErrors('You do not have permission to edit this work entry.');
        }
        $workProfile->update($request->all());

        return back()->with('success', 'Work experience updated successfully!');
    }



    public function destroyAdditional($id)
    {

        $additionalProfile = $this->additionalInterface->findByColumn([
            'user_id' => Auth::id(),
            'id' => $id
        ]);

        if (!$additionalProfile) {
            return redirect()->route('profile.index')->with('error', 'Additional information not found.');
        }

        $this->additionalInterface->deleteById($id);

        return redirect()->route('profile.index')->with('success', 'Additional information deleted successfully.');
    }


    public function destroyWork($id)
    {
        $workProfile = $this->workInterface->findByColumn([
            'user_id' => Auth::id(),
            'id' => $id
        ]);
        $workProfile->delete();
        return redirect()->route('profile.index')->with('success', 'Work profile deleted successfully.');
    }





    public function deleteProfileIcon()
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if ($user && $user->profile_avatar) {
            Storage::disk('public')->delete($user->profile_avatar);
            $user->profile_avatar = null;
            $user->save();

            return back()->with('success', 'Profile photo deleted successfully.');
        }
    }
}
