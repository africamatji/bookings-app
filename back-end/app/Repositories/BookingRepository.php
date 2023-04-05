<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Collection;

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

    public function list(int $userId): Collection
    {
        return $this->model->where('user_id', $userId)->get();
    }
}
