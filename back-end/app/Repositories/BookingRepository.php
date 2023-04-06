<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class BookingRepository implements BookingInterface
{
    protected Booking $model;

    public function __construct(Booking $model)
    {
        $this->model = $model;
    }

    public function create(array $data): Booking
    {
        return $this->model->create($data);
    }

    public function list(): Collection
    {
        $userId = Auth::id();
        return $this->model->where('user_id', $userId)->get();
    }

    public function filter(string $filter): Collection
    {
        if($filter === 'past')
        {
            //$bookings = Booking::where('user_id')
        }
    }
}
