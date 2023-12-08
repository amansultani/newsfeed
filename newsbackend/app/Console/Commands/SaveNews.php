<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsUpdater;

class SaveNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:save-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will fetch news from news sources and save it into the local database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $newsUpdater = app(NewsUpdater::class);
        $newsUpdater->updateNews();
    }
}
