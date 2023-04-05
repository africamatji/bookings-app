<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthLoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(AuthRegisterRequest $request): JsonResponse
    {
        $requestData = $request->all();
        $requestData['password'] = Hash::make($requestData['password']);
        $user = User::create($requestData);

        return response()->json([
            'message' => 'successful',
            'user' => $user,
        ]);
    }

    public function login(AuthLoginRequest $request): JsonResponse
    {
        $requestData = $request->all();
        if(!auth()->attempt($requestData)) {
            return response()->json([
                'error' => 'Authorised Access'
            ], 401);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response()->json([
            'user' => auth()->user(),
            'access_token' => $accessToken
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->user()->token();
        $token->revoke();

        return response()->json([
            'message' => 'Successfully logged out!',
        ], 200);
    }

    public function me(): JsonResponse
    {
        $user = auth()->user();

        return response()->json([
            'user' => $user,
        ], 200);
    }
}
