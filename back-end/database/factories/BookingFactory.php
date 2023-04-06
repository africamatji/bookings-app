<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reason' => fake()->sentence(),
            'date' => fake()->dateTime()->format('Y-m-d H:i:s'),
            'user_id' => function () {
                return User::inRandomOrder()->first()->id;
            }
        ];
    }
}
