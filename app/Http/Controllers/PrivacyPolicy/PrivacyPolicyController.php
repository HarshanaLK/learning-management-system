<?php

namespace App\Http\Controllers\PrivacyPolicy;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrivacyPolicy\PrivacyPolicyRequest;
use App\Repositories\All\PrivacyPolicy\PrivacyPolicyInterface;
use Inertia\Inertia;

class PrivacyPolicyController extends Controller
{
    public function __construct(
        protected PrivacyPolicyInterface $privacyPolicyInterface,
    ) {}



    public function index()
    {

        return Inertia::render('Admin/TermConditionHandle/Index', [
            'privacyPolicy' => $this->policyForPage(),
        ]);
    }



    public function store(PrivacyPolicyRequest $request)
    {
        // Check if a privacy policy exists
        $policy = $this->privacyPolicyInterface->findByColumn([], ['*']);
        if ($policy) {
            // Update existing privacy policy
            $this->privacyPolicyInterface->update($policy->id, ['content' => $request->input('privacy_policy')]);
        } else {
            // Create a new privacy policy
            $this->privacyPolicyInterface->create(['content' => $request->input('privacy_policy')]);
        }
        return redirect()->back()->with('success', 'Privacy policy saved successfully.');
    }


    public function show()
    {
        return Inertia::render('PublicArea/Term&Condition/Index', [
            'privacyPolicy' => $this->policyForPage(),
        ]);
    }

    /**
     * Always supply a consistent prop shape, even before the first policy is created.
     * React and Inertia SSR can safely render a missing or empty policy.
     *
     * @return array{content: string}
     */
    private function policyForPage(): array
    {
        $policy = $this->privacyPolicyInterface->findByColumn([], ['content']);

        return [
            'content' => $policy?->content ?? '',
        ];
    }
}
