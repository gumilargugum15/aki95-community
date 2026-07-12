<?php

namespace App\Services;

use App\Models\Touring;
use App\Repositories\Contracts\TouringRepositoryInterface;
use App\Services\Support\FileUploadService;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;

class TouringService
{
    use GeneratesUniqueSlug;

    protected const COVER_DIRECTORY = 'tourings/covers';

    public function __construct(
        protected TouringRepositoryInterface $tourings,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->tourings->query();

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['search'])) {
            $query->where('title', 'like', "%{$filters['search']}%");
        }

        return $query->latest('start_date')->paginate($perPage);
    }

    public function find(int $id): Touring
    {
        return $this->tourings->findOrFail($id)->load(['creator', 'galleryAlbums', 'videos']);
    }

    public function findBySlug(string $slug): Touring
    {
        $touring = $this->tourings->findBySlug($slug);

        abort_if(! $touring, 404, 'Touring tidak ditemukan.');

        return $touring->load(['creator', 'galleryAlbums.photos', 'videos']);
    }

    public function create(array $data, ?UploadedFile $cover = null): Touring
    {
        $data['slug'] = $this->generateUniqueSlug($data['title'], $this->tourings);

        if ($cover) {
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->tourings->create($data);
    }

    public function update(Touring $touring, array $data, ?UploadedFile $cover = null): Touring
    {
        if (! empty($data['title']) && $data['title'] !== $touring->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $this->tourings, $touring->id);
        }

        if ($cover) {
            $this->fileUpload->delete($touring->cover_image);
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->tourings->update($touring, $data);
    }

    public function delete(Touring $touring): bool
    {
        $this->fileUpload->delete($touring->cover_image);

        return $this->tourings->delete($touring);
    }
}
