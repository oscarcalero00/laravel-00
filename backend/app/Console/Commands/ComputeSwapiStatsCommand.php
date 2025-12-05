<?php

namespace App\Console\Commands;

use App\Events\RecomputeSwapiStats;
use Illuminate\Console\Command;

class ComputeSwapiStatsCommand extends Command
{
    protected $signature = 'swapi:compute-stats';

    protected $description = 'Dispatch event to recompute SWAPI stats';

    public function handle(): int
    {
        event(new RecomputeSwapiStats());

        $this->info('Dispatched RecomputeSwapiStats event');

        return Command::SUCCESS;
    }
}
