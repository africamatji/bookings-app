<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithFaker;

    public function test_can_register_user(): void
    {
        $password = $this->faker->password();
        $requestData = [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'password' => $password,
            'password_confirmation' => $password,
        ];

        $response = $this->postJson('/api/register', $requestData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'successful',
            'user' => [
                'name' => $requestData['name'],
                'email' => $requestData['email'],
            ],
        ]);
    }

    public function test_can_login_with_valid_credentials(): void
    {
        // Create a user with a random password
        $password = $this->faker->password();
        $user = User::factory()->create([
            'password' => Hash::make($password)
        ]);

        // Request payload
        $requestData = [
            'email' => $user->email,
            'password' => $password,
        ];

        // Login request
        $response = $this->post('/api/login', $requestData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'access_token',
        ]);
        $responseData = $response->json();
        $this->assertNotEmpty($responseData['access_token']);
    }

    public function test_can_login_with_invalid_credentials(): void
    {
        $requestData = [
            'email' => $this->faker->safeEmail(),
            'password' => $this->faker->password(),
        ];

        $response = $this->postJson('/api/login', $requestData);

        $response->assertStatus(401);
        $response->assertJson([
            'error' => 'Authorised Access',
        ]);
    }

    public function test_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->accessToken;

        $headers = ['Authorization' => 'Bearer ' . $token];
        $response = $this->get('api/logout', $headers);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Successfully logged out!',
            ]);

        //assert token is revoked
        $this->assertNull($user->tokens()->find($token));
    }

    public function test_me_endpoint(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->accessToken;

        $headers = ['Authorization' => 'Bearer ' . $token];
        $response = $this->get('api/me', $headers);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
        ]);
    }

}
