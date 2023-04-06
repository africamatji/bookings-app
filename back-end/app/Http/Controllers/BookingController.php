<?php

namespace App\Http\Controllers;

use App\Repositories\BookingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\FilterBookingRequest;

class BookingController extends Controller
{
    protected BookingRepository $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function create(BookingRequest $request): JsonResponse
    {
        $requestData = $request->all();
        $requestData['user_id'] = Auth::id();
        $booking = $this->bookingRepository->create($requestData);

        return response()->json([
            'message' => 'successful',
            'booking' => $booking
        ]);
    }

    public function list(): JsonResponse
    {
        $bookings = $this->bookingRepository->list();

        return response()->json([
            'message' => 'successful',
            'bookings' => $bookings
        ]);
    }

    public function filter(FilterBookingRequest $request): JsonResponse
    {
        $bookings = $this->bookingRepository->filter($request->type);

        return response()->json([
            'message' => 'successful',
            'bookings' => $bookings
        ]);
    }
}
