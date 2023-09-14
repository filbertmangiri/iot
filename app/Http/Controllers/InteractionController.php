<?php

namespace App\Http\Controllers;

use App\Enums\DeviceStatus;
use App\Enums\LEDStatus;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

use function Pest\Laravel\json;

class InteractionController extends Controller
{
    public function sendDataJson(Request $request)
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

        $attributes['sent_at'] = $attributes['date'] . ' ' . $attributes['time'];

        unset($attributes['date']);
        unset($attributes['time']);

        Log::create($attributes);

        return response('ok', 200);
    }

    public function sendDataString(Request $request)
    {
        $data = $request->validate([
            'data' => ['required']
        ]);

        $data = explode(",", $data['data']);

        $fields = [
            'device',
            'serial_number',
            'password',
            'latitude',
            'longitude',
            'temperature',
            'runtime',
            'stoptime',
            'status',
            'led_01',
            'led_02',
            'time',
            'date',
        ];

        for ($i = 0; $i < count($fields); $i++) {
            if (!isset($data[$i])) break;

            $attributes[$fields[$i]] = $data[$i];
        }

        if (isset($attributes['latitude']) && is_numeric($attributes['latitude']))
            $attributes['latitude'] = (float) $attributes['latitude'];

        if (isset($attributes['longitude']) && is_numeric($attributes['longitude']))
            $attributes['longitude'] = (float) $attributes['longitude'];

        if (isset($attributes['temperature']) && is_numeric($attributes['temperature']))
            $attributes['temperature'] = (float) $attributes['temperature'];

        $validator = Validator::make($attributes, [
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

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $attributes['sent_at'] = $attributes['date'] . ' ' . $attributes['time'];

        unset($attributes['date']);
        unset($attributes['time']);

        Log::create($attributes);

        return response()->setStatusCode(200);
    }
}
