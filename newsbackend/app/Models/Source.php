<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Source extends Model
{
    use HasFactory;

    protected $fillable = [
                'name',
                'sourceid',
                'description',
                'category_id',
                'language',
                'country',
            ];

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function news() : HasMany
    {
        return $this->hasMany(News::class);
    }

}
