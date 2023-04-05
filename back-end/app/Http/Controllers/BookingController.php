<?php

namespace App\Http\Controllers;

use App\Repositories\BookingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class BookingController extends Controller
{
    protected BookingRepository $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function create(Request $request): JsonResponse
    {
        $booking = $this->bookingRepository->create($request->all());

        return response()->json([
            'message' => 'successful',
            'booking' => $booking
        ]);
    }
}
