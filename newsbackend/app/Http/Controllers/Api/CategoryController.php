<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }
    

    public function index(Request $request)
    {

            $allCategories = CategoryResource::collection(Category::all());
        
            // Get user preferences
            $userPreferences = Category::whereIn('id', json_decode($request->user()->preference->category_preferences))->get();       
            // Return an array with both sets of data
            return [
                'categories' => $allCategories,
                'userCategories' => CategoryResource::collection($userPreferences),
            ];
        
    }

    public function store(Request $request)
    {
        
    }

    public function show(Category $category)
    {
        return new CategoryResource( $category);
    }


    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        // 
    }
}
