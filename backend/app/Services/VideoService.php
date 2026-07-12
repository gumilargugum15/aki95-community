<?php

namespace App\Services;

use App\Models\Video;
use App\Repositories\Contracts\VideoRepositoryInterface;
use App\Services\Support\FileUploadService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;

class VideoService
{
    protected const THUMBNAIL_DIRECTORY = 'videos/thumbnails';

    public function __construct(
        protected VideoRepositoryInterface $videos,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->videos->query();

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

    public function find(int $id): Video
    {
        return $this->videos->findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $thumbnail = null): Video
    {
        if ($thumbnail) {
            $data['thumbnail'] = $this->fileUpload->store($thumbnail, self::THUMBNAIL_DIRECTORY);
        } else {
            $data['thumbnail'] = $this->extractYoutubeThumbnail($data['youtube_url']);
        }

        return $this->videos->create($data);
    }

    public function update(Video $video, array $data, ?UploadedFile $thumbnail = null): Video
    {
        if ($thumbnail) {
            $this->fileUpload->delete($video->thumbnail);
            $data['thumbnail'] = $this->fileUpload->store($thumbnail, self::THUMBNAIL_DIRECTORY);
        }

        return $this->videos->update($video, $data);
    }

    public function delete(Video $video): bool
    {
        $this->fileUpload->delete($video->thumbnail);

        return $this->videos->delete($video);
    }

    protected function extractYoutubeThumbnail(string $youtubeUrl): ?string
    {
        preg_match(
            '/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/',
            $youtubeUrl,
            $matches
        );

        return isset($matches[1])
            ? "https://img.youtube.com/vi/{$matches[1]}/hqdefault.jpg"
            : null;
    }
}
