<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRegistrationRequest;
use App\Http\Resources\EventRegistrationResource;
use App\Http\Resources\EventResource;
use App\Services\EventService;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function __construct(protected EventService $events) {}

    public function index(Request $request)
    {
        return EventResource::collection(
            $this->events->list($request->only(['status', 'upcoming']))
        );
    }

    public function show(string $slug): EventResource
    {
        return new EventResource($this->events->findBySlug($slug));
    }

    public function register(StoreEventRegistrationRequest $request, string $slug): EventRegistrationResource
    {
        $event = $this->events->findBySlug($slug);

        $registration = $this->events->register($event, $request->validated());

        return new EventRegistrationResource($registration);
    }
}
