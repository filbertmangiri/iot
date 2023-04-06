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
        $log = Log::orderBy('id', 'desc')->first();

        $log = fn () => $log ? LogResource::make($log) : [
            'data' => null,
        ];

        return Inertia::render('Dashboard', compact('log'));
    }
}
