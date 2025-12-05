<?php

namespace App\Listeners;

use App\Events\RecomputeSwapiStats;
use App\Jobs\ComputeSwapiStats;

class ComputeSwapiStatsListener
{
    public function handle(RecomputeSwapiStats $event): void
    {
        // Dispatch the job to the queue
        ComputeSwapiStats::dispatch();
    }
}
