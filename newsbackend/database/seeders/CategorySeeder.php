<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Source;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use jcobhams\NewsApi\NewsApi;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $newsApi = new NewsApi(config('apikey.newsapi_key'));
        $categories = $newsApi->getCategories();

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
