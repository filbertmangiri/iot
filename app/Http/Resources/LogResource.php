<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'device' => $this->device,
            'serial_number' => $this->serial_number,
            'password' => $this->password,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'temperature' => $this->temperature,
            'runtime' => $this->runtime,
            'stoptime' => $this->stoptime,
            'status' => $this->status ? $this->status->label() : null,
            'led_01' => $this->led_01 ? $this->led_01->label() : null,
            'led_02' => $this->led_02 ? $this->led_02->label() : null,
            'time' => $this->time,
            'date' => $this->date,
        ];
    }
}
