<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Services\Support\FileUploadService;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;

class EventService
{
    use GeneratesUniqueSlug;

    protected const COVER_DIRECTORY = 'events/covers';

    public function __construct(
        protected EventRepositoryInterface $events,
        protected EventRegistrationRepositoryInterface $registrations,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->events->query()->withCount('registrations');

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['upcoming'])) {
            $query->where('start_date', '>=', now()->toDateString());
        }

        return $query->orderBy('start_date')->paginate($perPage);
    }

    public function upcoming(int $limit = 5)
    {
        return $this->events->query()
            ->where('start_date', '>=', now()->toDateString())
            ->where('status', '!=', 'cancelled')
            ->orderBy('start_date')
            ->limit($limit)
            ->get();
    }

    public function find(int $id): Event
    {
        return $this->events->findOrFail($id)->loadCount('registrations');
    }

    public function findBySlug(string $slug): Event
    {
        $event = $this->events->findBySlug($slug);

        abort_if(! $event, 404, 'Agenda tidak ditemukan.');

        return $event->loadCount('registrations');
    }

    public function create(array $data, ?UploadedFile $cover = null): Event
    {
        $data['slug'] = $this->generateUniqueSlug($data['title'], $this->events);

        if ($cover) {
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->events->create($data);
    }

    public function update(Event $event, array $data, ?UploadedFile $cover = null): Event
    {
        if (! empty($data['title']) && $data['title'] !== $event->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $this->events, $event->id);
        }

        if ($cover) {
            $this->fileUpload->delete($event->cover_image);
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->events->update($event, $data);
    }

    public function delete(Event $event): bool
    {
        $this->fileUpload->delete($event->cover_image);

        return $this->events->delete($event);
    }

    public function registrations(Event $event): LengthAwarePaginator
    {
        return $this->registrations->query()
            ->where('event_id', $event->id)
            ->latest()
            ->paginate(15);
    }

    public function register(Event $event, array $data): EventRegistration
    {
        if (! $event->registration_required) {
            throw ValidationException::withMessages(['event' => 'Agenda ini tidak memerlukan pendaftaran.']);
        }

        if ($event->quota !== null && $event->registrations()->count() >= $event->quota) {
            throw ValidationException::withMessages(['event' => 'Kuota peserta sudah penuh.']);
        }

        $data['event_id'] = $event->id;

        return $this->registrations->create($data);
    }
}
