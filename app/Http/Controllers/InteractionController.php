<?php

namespace App\Http\Controllers;

use App\Enums\DeviceStatus;
use App\Enums\LEDStatus;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

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
            'status' => ['required', new Enum(DeviceStatus::class)],
            'led_01' => ['required', new Enum(LEDStatus::class)],
            'led_02' => ['required', new Enum(LEDStatus::class)],
            'time' => ['required'],
            'date' => ['required'],
        ]);

        $attributes['latitude'] = (float) $attributes['latitude'];
        $attributes['longitude'] = (float) $attributes['longitude'];
        $attributes['temperature'] = (float) $attributes['temperature'];

        Log::create($attributes);

        return response('ok', 200);
    }
}
