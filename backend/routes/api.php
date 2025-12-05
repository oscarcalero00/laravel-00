<?php

use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\ExampleController;
use App\Http\Controllers\SwapiController;
use App\Http\Controllers\StatsController;

Route::get('/health', [HealthController::class, 'index']);

Route::get('/example', [ExampleController::class, 'index']);
Route::post('/example', [ExampleController::class, 'store']);

// SWAPI endpoints
Route::get('/search', [SwapiController::class, 'search']);
Route::get('/details/{type}/{id}', [SwapiController::class, 'details']);
Route::get('/stats', [StatsController::class, 'index']);
