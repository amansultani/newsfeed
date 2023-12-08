<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }
    public function index(Request $request,Category $category)
    {
        $search = $request->query('search');
        $securedSearch = $search ? htmlspecialchars($search, ENT_QUOTES, 'UTF-8') : null;
        $newsQuery = $category->news()->newsWithPreferedSources($request);

        if ($securedSearch) {
            $newsQuery->where(function ($query) use ($securedSearch) {
                $query->where('title', 'like', '%' . $securedSearch . '%')
                    ->orWhere('description', 'like', '%' . $securedSearch . '%')
                    ->orWhere('author', 'like', '%' . $securedSearch . '%');
        });
        }

        $paginatedNews = $newsQuery->paginate(4);

        return NewsResource::collection($paginatedNews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category,string $news)
    {
        return new NewsResource( $category->news()->findOrFail($news));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
