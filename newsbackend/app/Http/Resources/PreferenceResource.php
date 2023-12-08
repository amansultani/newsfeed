<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PreferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_preferences' => array_unique(json_decode($this->category_preferences)),
            'source_preferences' => array_unique(json_decode($this->source_preferences)),
        ];
    }
}
