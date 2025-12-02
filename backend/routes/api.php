<?php

use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\ExampleController;

Route::get('/health', [HealthController::class, 'index']);

Route::get('/example', [ExampleController::class, 'index']);
Route::post('/example', [ExampleController::class, 'store']);
