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
        $password = $this->faker->password();
        $user = User::factory([
            'password' => Hash::make($password)
        ])->create();
        $requestData = [
            'email' => $user->email,
            'password' => $password,
        ];

        $response = $this->postJson('/api/login', $requestData);

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
    }
}
