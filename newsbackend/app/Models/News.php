<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use SebastianBergmann\Type\VoidType;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['data_source', 'source_id','author',
                        'title','description','url','url_to_image',
                        'published_at','content','category_id'];

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function source() : BelongsTo
    {
        return $this->belongsTo(Source::class);
    }

    public function scopeNewsWithPreferedSources(Builder $query, Request $request): void 
    {
        $userSources = json_decode($request->user()->preference->source_preferences);
        $query->whereIn('source_id', $userSources)
          ->when(in_array(0, $userSources), function ($query) {
              $query->orWhereNull('source_id');
          });
    }
}
