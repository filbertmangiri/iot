<?php

namespace App\Models;

use App\Enums\DeviceStatus;
use App\Enums\LEDStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
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

    protected $searchable = [
        'id',
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

    protected $sortable = [
        'id',
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

    protected $casts = [
        'status' => DeviceStatus::class,
        'led_01' => LEDStatus::class,
        'led_02' => LEDStatus::class,
    ];

    public static function getSearchable()
    {
        return (new static)->searchable;
    }

    public static function getSortable()
    {
        return (new static)->sortable;
    }
}
