<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SourceResource;
use Illuminate\Http\Request;
use \App\Models\Source;

class SourceController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }
    public function index(Request $request)
    {
        $sources =  SourceResource::collection( Source::with('category')->get());
        $userSources = json_decode($request->user()->preference->source_preferences);  

        return [
            'sources' => $sources,
            'userSources' => $userSources
        ];
    }

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Source $source)
    {
        return new SourceResource( $source);
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
