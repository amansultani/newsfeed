<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Source;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('exists_in_category', function ($attribute, $value, $parameters, $validator) {
            foreach ($value as $id) {
                if (!is_int($id)) {
                    return false; 
                }
            }
            $categoryIds = Category::pluck('id')->toArray();

            return collect($value)->every(function ($id) use ($categoryIds) {
                return in_array($id, $categoryIds);
            });
        });

        Validator::extend('exists_in_source', function ($attribute, $value, $parameters, $validator) {
            // $value = array_unique($value);
            foreach ($value as $id) {
                if (!is_int($id)) {
                    return false;
                }
            }
            // $value is the array of IDs to validate
            $sourceIds = Source::pluck('id')->merge([0])->toArray();
            return collect($value)->every(function ($id) use ($sourceIds) {
                return in_array($id, $sourceIds);
            });
        });
    }
}
