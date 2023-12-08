<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use jcobhams\NewsApi\NewsApi;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $newsApi = new NewsApi(config('apikey.newsapi_key'));

        $categories = \App\Models\Category::all();
        foreach ($categories as $category) {
            $sources = $newsApi->getSources($category->name,'en','us');
        // print_r($sources->sources);
            foreach ($sources->sources as $source) {
                // echo print_r($source);
                Source::create([
                    'sourceid'=> $source->id,
                    'name'=> $source->name,
                    'description'=> $source->description,
                    'url'=> $source->url,
                    'language'=> $source->language,
                    'country'=> $source->country,
                    'category_id'=> $category->id,
                ]);
            }
        }
    }
}
