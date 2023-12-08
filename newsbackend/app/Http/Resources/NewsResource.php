<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $titleParts = explode('-', $this->title);
        $title = trim($titleParts[0]); // Part before the hyphen
        $source = trim($titleParts[1]); // Part after the hyphen
        // return parent::toArray($request);
        $publishedAt = Carbon::parse($this->published_at);
        $customPublishedAt = $publishedAt->format('l, F j, Y');
        return [
            "id"=> $this->id,
            "data_source" => $this->data_source,
            "author"=> $this->author,
            "title"=> $title,
            "source" =>$source,
            "description"=> $this->description,
            "url" => $this->url,
            "url_to_image" => $this->url_to_image,
            "content" => $this->content,
            "published_at" => $customPublishedAt,
            "category_id" => $this->category_id,
            
        ];
    }
}
