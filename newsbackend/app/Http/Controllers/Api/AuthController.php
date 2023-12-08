<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use \App\Models\Preference;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.']
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.']
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            // 'name' => $user->name,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' =>'Logged out successfully']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'cpassword' => 'required|string|min:6',
            'password' => 'required|string|min:6',
        ]);

        $user = $request->user();

        // Validate current password
        if (!Hash::check($request->input('cpassword'), $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 401);
        }

        // If the current password is correct, proceed with updating user information
        $user->name = $request->input('name');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response()->json(['message' => 'User updated successfully']);
    }
    public function signup(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'name' => 'required|string',
        ]);

        $user = \App\Models\User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
            $categoryPreferences = \App\Models\Category::inRandomOrder()->take(4)->pluck('id');
            $sourcePreferences = \App\Models\Source::inRandomOrder()->take(30)->pluck('id');
            $sourcePreferences->push(0);
            $preference = new Preference([
            
            'category_preferences'=>$categoryPreferences,
            'source_preferences' => $sourcePreferences,
    ]);
        $user->preference()->save($preference);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ]);
    }
}
