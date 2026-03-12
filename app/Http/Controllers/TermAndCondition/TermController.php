<?php

namespace App\Http\Controllers\TermAndCondition;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TermController extends Controller
{
    public function index() {
        return Inertia::render('PublicArea/Term&Condition/Index');
    }

}
