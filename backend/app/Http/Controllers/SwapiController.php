<?php

namespace App\Http\Controllers;

use App\Services\SwapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SwapiController extends Controller
{
    public function __construct(
        private readonly SwapiService $swapiService
    ) {}

    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'type' => 'required|in:people,movies',
            'query' => 'required|string|min:1'
        ]);

        $type = $request->input('type');
        $query = $request->input('query');

        $start = microtime(true);
        $result = $this->swapiService->search($type, $query);
        $end = microtime(true);

        $durationMs = round(($end - $start) * 1000, 2);

        // Log the query to storage (one JSON object per line)
        try {
            $logEntry = [
                'timestamp' => now()->toISOString(),
                'endpoint' => 'search',
                'type' => $type,
                'query' => $query,
                'duration_ms' => $durationMs,
                'success' => $result['success'] ?? false,
            ];

            $logPath = storage_path('app/swapi_queries.log');
            file_put_contents($logPath, json_encode($logEntry) . PHP_EOL, FILE_APPEND | LOCK_EX);
        } catch (\Throwable) {
            // prevent logging failures from breaking API
        }

        if (!$result['success']) {
            return response()->json([
                'error' => $result['message']
            ], 500);
        }

        return response()->json($result['data']);
    }

    public function details(string $type, int $id): JsonResponse
    {
        if (!in_array($type, ['people', 'movies'])) {
            return response()->json([
                'error' => 'Invalid type. Must be people or movies'
            ], 400);
        }

        $start = microtime(true);
        $result = $this->swapiService->getDetails($type, $id);
        $end = microtime(true);

        $durationMs = round(($end - $start) * 1000, 2);

        try {
            $logEntry = [
                'timestamp' => now()->toISOString(),
                'endpoint' => 'details',
                'type' => $type,
                'id' => $id,
                'duration_ms' => $durationMs,
                'success' => $result['success'] ?? false,
            ];

            $logPath = storage_path('app/swapi_queries.log');
            file_put_contents($logPath, json_encode($logEntry) . PHP_EOL, FILE_APPEND | LOCK_EX);
        } catch (\Throwable) {
            // ignore logging errors
        }

        if (!$result['success']) {
            return response()->json([
                'error' => $result['message']
            ], 404);
        }

        return response()->json($result['data']);
    }
}
