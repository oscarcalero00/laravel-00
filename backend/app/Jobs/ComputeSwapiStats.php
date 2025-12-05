<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ComputeSwapiStats implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $logPath = storage_path('app/swapi_queries.log');
        $outputPath = storage_path('app/swapi_stats.json');

        if (!file_exists($logPath)) {
            file_put_contents($outputPath, json_encode(["generated_at" => now()->toISOString(), "stats" => []], JSON_PRETTY_PRINT));
            return;
        }

        $lines = file($logPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $total = count($lines);

        $queries = [];
        $durations = [];
        $hours = [];

        foreach ($lines as $line) {
            $entry = json_decode($line, true);
            if (!$entry) {
                continue;
            }

            // Only consider search entries for top queries
            if (!empty($entry['query'])) {
                $q = mb_strtolower(trim($entry['query']));
                $queries[$q] = ($queries[$q] ?? 0) + 1;
            }

            if (isset($entry['duration_ms'])) {
                $durations[] = (float) $entry['duration_ms'];
            }

            if (!empty($entry['timestamp'])) {
                $dt = \DateTime::createFromFormat(DATE_ATOM, $entry['timestamp']);
                if ($dt) {
                    $hour = (int) $dt->format('H');
                    $hours[$hour] = ($hours[$hour] ?? 0) + 1;
                }
            }
        }

        // Top five queries with percentages
        arsort($queries);
        $top = array_slice($queries, 0, 5, true);
        $topWithPerc = [];
        foreach ($top as $q => $count) {
            $topWithPerc[] = [
                'query' => $q,
                'count' => $count,
                'percentage' => $total > 0 ? round(($count / $total) * 100, 2) : 0,
            ];
        }

        // Average length of request timing
        $avgDuration = count($durations) > 0 ? array_sum($durations) / count($durations) : 0;

        // Most popular hour
        arsort($hours);
        $popularHour = count($hours) > 0 ? array_keys($hours)[0] : null;

        $stats = [
            'total_requests' => $total,
            'top_queries' => $topWithPerc,
            'average_duration_ms' => round($avgDuration, 2),
            'most_popular_hour' => $popularHour,
            'generated_at' => now()->toISOString(),
        ];

        file_put_contents($outputPath, json_encode($stats, JSON_PRETTY_PRINT));
    }
}
