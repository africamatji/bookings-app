<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
}
