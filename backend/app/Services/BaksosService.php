<?php

namespace App\Services;

use App\Models\Baksos;
use App\Repositories\Contracts\BaksosRepositoryInterface;
use App\Services\Support\FileUploadService;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;

class BaksosService
{
    use GeneratesUniqueSlug;

    protected const COVER_DIRECTORY = 'baksos/covers';

    public function __construct(
        protected BaksosRepositoryInterface $baksos,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->baksos->query();

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['search'])) {
            $query->where('title', 'like', "%{$filters['search']}%");
        }

        return $query->latest('date')->paginate($perPage);
    }

    public function find(int $id): Baksos
    {
        return $this->baksos->findOrFail($id)->load(['creator', 'galleryAlbums', 'videos']);
    }

    public function findBySlug(string $slug): Baksos
    {
        $baksos = $this->baksos->findBySlug($slug);

        abort_if(! $baksos, 404, 'Kegiatan bakti sosial tidak ditemukan.');

        return $baksos->load(['creator', 'galleryAlbums.photos', 'videos']);
    }

    public function create(array $data, ?UploadedFile $cover = null): Baksos
    {
        $data['slug'] = $this->generateUniqueSlug($data['title'], $this->baksos);

        if ($cover) {
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->baksos->create($data);
    }

    public function update(Baksos $baksos, array $data, ?UploadedFile $cover = null): Baksos
    {
        if (! empty($data['title']) && $data['title'] !== $baksos->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $this->baksos, $baksos->id);
        }

        if ($cover) {
            $this->fileUpload->delete($baksos->cover_image);
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->baksos->update($baksos, $data);
    }

    public function delete(Baksos $baksos): bool
    {
        $this->fileUpload->delete($baksos->cover_image);

        return $this->baksos->delete($baksos);
    }
}
