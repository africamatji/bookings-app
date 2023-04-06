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

    public function filter(string $type): Collection
    {
        $userId = Auth::id();
        $operand = $type === 'past' ? '<' : '>=';
        $order = $type === 'past' ? 'desc' : 'asc';

        return Booking::where('user_id', $userId)
            ->where('date', $operand, now())
            ->orderBy('date', $order)
            ->get();
    }
}
