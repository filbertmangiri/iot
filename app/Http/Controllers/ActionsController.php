<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionsController extends Controller
{
    public function index()
    {
        return Inertia::render('Action/Index');
    }
}
