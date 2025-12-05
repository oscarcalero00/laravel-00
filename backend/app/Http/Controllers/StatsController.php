<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function index(): JsonResponse
    {
        $path = storage_path('app/swapi_stats.json');

        if (!file_exists($path)) {
            return response()->json(['error' => 'No stats generated yet'], 404);
        }

        $content = file_get_contents($path);
        $data = json_decode($content, true);

        return response()->json($data);
    }
}
