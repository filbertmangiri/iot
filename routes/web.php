<?php

use App\Http\Controllers\ActionsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LogController;
use Illuminate\Support\Facades\Route;

Route::get('/', DashboardController::class)
    ->name('dashboard');

Route::name('log.')->group(function () {
    Route::get('/logs', [LogController::class, 'index'])
        ->name('index');

    Route::get('/log/{log}', [LogController::class, 'show'])
        ->name('show');

    Route::get('/logs/export', [LogController::class, 'export'])
        ->name('export');
});

Route::controller(ActionsController::class)->name('action.')->group(function () {
    Route::get('/actions', 'index')
        ->name('index');
});
