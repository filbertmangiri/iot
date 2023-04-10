<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    public function sendData(Request $request)
    {
        $attributes = $request->validate([
            'device' => ['required'],
            'serial_number' => ['required'],
            'password' => ['required'],
            'latitude' => ['required'],
            'longitude' => ['required'],
            'temperature' => ['required'],
            'runtime' => ['required'],
            'stoptime' => ['required'],
            'status' => ['required'],
            'led_01' => ['required'],
            'led_02' => ['required'],
            'time' => ['required'],
            'date' => ['required'],
        ]);

        Log::create($attributes);

        return response('ok', 200);
    }
}
