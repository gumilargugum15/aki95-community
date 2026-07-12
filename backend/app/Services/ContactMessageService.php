<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ContactMessageService
{
    public function __construct(protected ContactMessageRepositoryInterface $messages) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->messages->query();

        if (isset($filters['is_read'])) {
            $query->where('is_read', (bool) $filters['is_read']);
        }

        return $query->latest()->paginate($perPage);
    }

    public function find(int $id): ContactMessage
    {
        return $this->messages->findOrFail($id);
    }

    public function submit(array $data): ContactMessage
    {
        return $this->messages->create($data);
    }

    public function markAsRead(ContactMessage $message): ContactMessage
    {
        return $this->messages->update($message, ['is_read' => true]);
    }

    public function delete(ContactMessage $message): bool
    {
        return $this->messages->delete($message);
    }
}
