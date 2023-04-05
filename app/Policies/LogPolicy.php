<?php

namespace App\Policies;

use App\Models\Log;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LogPolicy
{
    public function viewAny(User $user): bool
    {
        //
    }

    public function view(User $user, Log $log): bool
    {
        //
    }
}
