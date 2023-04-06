<?php

use App\Http\Controllers\InteractionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/send-data', [InteractionController::class, 'sendData']);

Route::get('/test-get', function () {
    return response('hello from test-post', 200);
});

Route::post('/test-post', function (Request $request) {
    $request->validate([
        'serial_number' => ['required'],
    ]);

    return response('hello from test-post', 200);
});
