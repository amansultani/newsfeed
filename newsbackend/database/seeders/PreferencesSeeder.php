<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Preference;
use App\Models\Source;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PreferencesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::all()->each(function ($user) {
            $categoryPreferences = Category::inRandomOrder()->take(4)->pluck('id');
            $sourcePreferences = Source::inRandomOrder()->take(30)->pluck('id');

            Preference::create([
                'user_id' => $user->id,
                'category_preferences' => $categoryPreferences,
                'source_preferences' => $sourcePreferences,
            ]);
        });
    }
}
