<?php

namespace App\Services;

use App\Models\News;
use Carbon\Carbon;
use jcobhams\NewsApi\NewsApi;

class NewsUpdater
{
    public function updateNews()
    {
        $newsApi = new NewsApi(config('apikey.newsapi_key'));
        $categories = \App\Models\Category::with('sources')->get();

        foreach ($categories as $category) {
            // Delete existing records for the category
            News::where('category_id', $category->id)->delete();
            $news = $newsApi->getTopHeadLines(null,null,'us',$category->name,null,null);
            foreach($news->articles as $article)
            {
                if (is_null($article->urlToImage)) //continue; 
                 $source_id = \App\Models\Source::where('sourceid', $article->source->id)->first();  
                 $source_id ? $insert_source_id = $source_id->id : $insert_source_id = null;
                    News::create([
                    'data_source'   => 'NewsAPI',
                    'source_id'     => $insert_source_id,
                    'author'        => $article->author,
                    'title'         => strip_tags($article->title),
                    'description'   => strip_tags($article->description),
                    'url'           => $article->url,
                    'url_to_image'  => $article->urlToImage,
                    'published_at'  => Carbon::parse( $article->publishedAt),
                    'content'       => strip_tags($article->content),
                    'category_id'   =>$category->id,
                    ]);
    
                
            } 
            
    }
    }
}
