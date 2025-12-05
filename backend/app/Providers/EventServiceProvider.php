<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        Event::listen(
            \App\Events\RecomputeSwapiStats::class,
            [\App\Listeners\ComputeSwapiStatsListener::class, 'handle']
        );
    }
}
