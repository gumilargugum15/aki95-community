<?php

namespace App\Repositories\Eloquent;

use App\Models\EventRegistration;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;

class EventRegistrationRepository extends BaseRepository implements EventRegistrationRepositoryInterface
{
    public function __construct(EventRegistration $model)
    {
        parent::__construct($model);
    }
}
