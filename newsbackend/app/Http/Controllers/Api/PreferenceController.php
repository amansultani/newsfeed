<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PreferenceResource;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }

    public function index(Request $request)
    {
        return new PreferenceResource(
            $request->user()->preference
        );
    }
    public function category(Request $request)
    {

        $rules = [
            'category_preferences' => 'array|exists_in_category',
            'category_preferences.*' => 'integer',
            ];
    
        $messages = [
            'category_preferences.required' => 'Category preferences is required.',
            'category_preferences.array' => 'Category preferences must be an array.',
            'category_preferences.*.integer' => 'Each item in category preferences must be an integer.',
            'category_preferences.exists_in_category' => 'Invalid array or Category not found.',
        ];

        $validatedData = $request->validate($rules, $messages);
        // Convert the validated arrays to JSON format
        $categoryPreferences = json_encode($validatedData['category_preferences']);
        $preference = $request->user()->preference;
        $preference->update(['category_preferences' => $categoryPreferences]);
        return new PreferenceResource( $preference);

    }

    public function source(Request $request)
    {
        $rules = [
            'source_preferences' => 'array|exists_in_source',
            'source_preferences.*' => 'integer', 
        ];
    
        $messages = [
            'source_preferences.required' => 'Source preferences is required.',
            'source_preferences.array' => 'Source preferences must be an array.',
            'source_preferences.*.integer' => 'Each item in source preferences must be an integer.',
            'source_preferences.exists_in_source' => 'Invalid array or Source not found.',
        ];

        $validatedData      = $request->validate($rules, $messages);
        $sourcePreferences  = json_encode($validatedData['source_preferences']);
        $preference         = $request->user()->preference;
        $preference->update(['source_preferences' => $sourcePreferences,]);
        return new PreferenceResource($preference);
    }
}
