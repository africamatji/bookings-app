<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Collection;

interface BookingInterface
{
    public function create(array $data): Booking;
    public function list(int $userId): Collection;
}
