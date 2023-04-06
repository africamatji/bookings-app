<?php

namespace Tests\Feature;

use App\Http\Controllers\BookingController;
use App\Models\User;
use App\Repositories\BookingRepository;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Illuminate\Http\JsonResponse;

class BookingTest extends TestCase
{
    use WithFaker;

    public function test_can_create_booking(): void
    {
        $user = User::factory()->create();

        $request = [
            'reason' => $this->faker->sentence,
            'date' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
        ];

        //$booking = new Booking();
/*        $mockBookingRepository = $this->createMock(BookingRepository::class);
        $mockBookingRepository->expects($this->once())
            ->method('create')
            ->with($request->all());
        $controller = new BookingController($mockBookingRepository);*/

        $response = $this->actingAs($user, 'api')->post('api/booking/create', $request);

        $response->assertJson([
            'message' => 'successful',
            'booking' => $request
        ]);

        $response->assertStatus(200);
    }

    public function test_can_list_bookings(): void
    {
        //$user = User::factory()->create();
        $user = User::where('email', 'charles@test.com')->first();
        $token = $user->createToken('TestToken')->accessToken;

        $headers = ['Authorization' => 'Bearer ' . $token];
        $response = $this->get('api/booking/list', $headers);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'bookings' => [
                '*' => [
                    'id',
                    'reason',
                    'date',
                    'user_id'
                ]
            ]
        ]);
    }

    public function test_can_list_bookings_function_with_mock(): void
    {
        $user = User::where('email', 'charles@test.com')->first();
        $userId = $user->id;
        // Create a mock BookingRepository instance
        $mockBookingRepository = $this->createMock(BookingRepository::class);
        // Expectations for the mock BookingRepository
        $bookings = Collection::make([
            [
                'id' => 1,
                'reason' => $this->faker->sentence,
                'date' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
                'user_id' => $userId
            ]
        ]);
        Auth::shouldReceive('id')->andReturn($userId);
        $mockBookingRepository->expects($this->once())
            ->method('list')
            ->willReturn($bookings);
        // Call the list() method on the BookingController instance
        $bookingController = new BookingController($mockBookingRepository);
        $response = $bookingController->list();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('successful', $responseData['message']);
        $this->assertEquals($bookings->toArray(), $responseData['bookings']);
    }
}
