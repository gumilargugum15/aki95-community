<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Http\Resources\EventRegistrationResource;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\JsonResponse;
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

    public function show(Event $event): EventResource
    {
        return new EventResource($this->events->find($event->id));
    }

    public function store(StoreEventRequest $request): JsonResponse
    {
        $data = $request->safe()->except('cover_image');
        $data['created_by'] = $request->user()->id;

        $event = $this->events->create($data, $request->file('cover_image'));

        return response()->json(['data' => new EventResource($event)], 201);
    }

    public function update(UpdateEventRequest $request, Event $event): JsonResponse
    {
        $data = $request->safe()->except('cover_image');

        $event = $this->events->update($event, $data, $request->file('cover_image'));

        return response()->json(['data' => new EventResource($event)]);
    }

    public function destroy(Event $event): JsonResponse
    {
        $this->events->delete($event);

        return response()->json(['message' => 'Agenda berhasil dihapus.']);
    }

    public function registrations(Event $event)
    {
        return EventRegistrationResource::collection($this->events->registrations($event));
    }
}
