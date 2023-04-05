<?php

namespace App\Http\Controllers;

use App\Repositories\BookingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookingRequest;

class BookingController extends Controller
{
    protected BookingRepository $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function create(BookingRequest $request): JsonResponse
    {
        $booking = $this->bookingRepository->create($request->all());

        return response()->json([
            'message' => 'successful',
            'booking' => $booking
        ]);
    }

    public function list(): JsonResponse
    {
        $userId = Auth::id();
        $bookings = $this->bookingRepository->list($userId);

        return response()->json([
            'message' => 'successful',
            'bookings' => $bookings
        ]);
    }
}