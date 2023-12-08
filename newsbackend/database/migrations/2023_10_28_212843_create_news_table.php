<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('data_source')->nullable();
            $table->foreignIdFor(\App\Models\Source::class)->nullable();
            $table->string('author')->nullable();
            $table->text('title');
            $table->text('description')->nullable();
            $table->text('url');
            $table->text('url_to_image')->nullable();
            $table->dateTime('published_at');
            $table->text('content')->nullable();

            $table->foreignIdFor(\App\Models\Category::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
