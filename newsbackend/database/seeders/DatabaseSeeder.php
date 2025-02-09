<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the specific user
        User::create([
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => Hash::make('test12345'),
        ]);

        // Create 100 random users
        \App\Models\User::factory(99)->create();

        // Call other seeders
        $this->call(CategorySeeder::class);
        $this->call(SourceSeeder::class);
        $this->call(NewsSeeder::class);
        $this->call(PreferencesSeeder::class);
    }
}
