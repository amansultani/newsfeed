<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CategoryPreferencesController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PreferenceController;
use App\Http\Controllers\Api\SourceController;
use App\Http\Controllers\Api\SourcePreferencesController;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class,'logout'])
      ->middleware('auth:sanctum');
Route::put('/updateAccount', [AuthController::class,'update'])
      ->middleware('auth:sanctum');

Route::apiResource('categories', CategoryController::class)->only('index','show');
Route::apiResource('categories.news', NewsController::class)
     ->scoped()->only('index','show');
Route::apiResource('sources', SourceController::class)->only('index','show');
Route::apiResource('preferences', PreferenceController::class)->only('index');
Route::put('preferences/category', [PreferenceController::class, 'category'])->name('preferences.category');
Route::put('preferences/source', [PreferenceController::class, 'source'])->name('preferences.source');
