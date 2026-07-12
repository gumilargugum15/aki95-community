<?php

namespace App\Services;

use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;
use App\Repositories\Contracts\GalleryPhotoRepositoryInterface;
use App\Services\Support\FileUploadService;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;

class GalleryService
{
    use GeneratesUniqueSlug;

    protected const COVER_DIRECTORY = 'galleries/covers';

    protected const PHOTO_DIRECTORY = 'galleries/photos';

    public function __construct(
        protected GalleryAlbumRepositoryInterface $albums,
        protected GalleryPhotoRepositoryInterface $photos,
        protected FileUploadService $fileUpload,
    ) {}

    public function listAlbums(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->albums->query()->with('photos');

        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (! empty($filters['touring_id'])) {
            $query->where('touring_id', $filters['touring_id']);
        }

        if (! empty($filters['baksos_id'])) {
            $query->where('baksos_id', $filters['baksos_id']);
        }

        return $query->latest()->paginate($perPage);
    }

    public function findAlbum(int $id): GalleryAlbum
    {
        return $this->albums->findOrFail($id)->load('photos', 'category');
    }

    public function findAlbumBySlug(string $slug): GalleryAlbum
    {
        $album = $this->albums->findBySlug($slug);

        abort_if(! $album, 404, 'Album tidak ditemukan.');

        return $album->load('photos', 'category');
    }

    public function createAlbum(array $data, ?UploadedFile $cover = null): GalleryAlbum
    {
        $data['slug'] = $this->generateUniqueSlug($data['title'], $this->albums);

        if ($cover) {
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->albums->create($data);
    }

    public function updateAlbum(GalleryAlbum $album, array $data, ?UploadedFile $cover = null): GalleryAlbum
    {
        if (! empty($data['title']) && $data['title'] !== $album->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $this->albums, $album->id);
        }

        if ($cover) {
            $this->fileUpload->delete($album->cover_image);
            $data['cover_image'] = $this->fileUpload->store($cover, self::COVER_DIRECTORY);
        }

        return $this->albums->update($album, $data);
    }

    public function deleteAlbum(GalleryAlbum $album): bool
    {
        foreach ($album->photos as $photo) {
            $this->fileUpload->delete($photo->photo_path);
        }

        $this->fileUpload->delete($album->cover_image);

        return $this->albums->delete($album);
    }

    /**
     * @param  UploadedFile[]  $files
     * @return GalleryPhoto[]
     */
    public function addPhotos(GalleryAlbum $album, array $files): array
    {
        $created = [];

        foreach ($files as $file) {
            $created[] = $this->photos->create([
                'album_id' => $album->id,
                'photo_path' => $this->fileUpload->store($file, self::PHOTO_DIRECTORY),
                'order' => $album->photos()->count(),
            ]);
        }

        return $created;
    }

    public function deletePhoto(GalleryPhoto $photo): bool
    {
        $this->fileUpload->delete($photo->photo_path);

        return $this->photos->delete($photo);
    }
}
