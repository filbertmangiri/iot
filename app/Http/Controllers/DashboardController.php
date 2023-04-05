<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogResource;
use App\Models\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $log = fn () => LogResource::make(Log::orderBy('id', 'desc')->first());

        return Inertia::render('Dashboard', compact('log'));
    }
}
