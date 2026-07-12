<?php

namespace App\Services;

use App\Models\News;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Services\Support\FileUploadService;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class NewsService
{
    use GeneratesUniqueSlug;

    protected const IMAGE_DIRECTORY = 'news/featured';

    public function __construct(
        protected NewsRepositoryInterface $news,
        protected TagRepositoryInterface $tags,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->news->query()->with(['category', 'author', 'tags']);

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (! empty($filters['tag'])) {
            $query->whereHas('tags', fn ($q) => $q->where('slug', $filters['tag']));
        }

        if (! empty($filters['search'])) {
            $query->where('title', 'like', "%{$filters['search']}%");
        }

        return $query->latest('published_at')->paginate($perPage);
    }

    public function find(int $id): News
    {
        return $this->news->findOrFail($id)->load(['category', 'author', 'tags']);
    }

    public function findBySlug(string $slug): News
    {
        $news = $this->news->findBySlug($slug);

        abort_if(! $news, 404, 'Berita tidak ditemukan.');

        $news->increment('views');

        return $news->load(['category', 'author', 'tags']);
    }

    public function create(array $data, ?UploadedFile $image = null): News
    {
        $data['slug'] = $this->generateUniqueSlug($data['title'], $this->news);
        $data['published_at'] = $data['status'] === News::STATUS_PUBLISHED ? Carbon::now() : null;

        if ($image) {
            $data['featured_image'] = $this->fileUpload->store($image, self::IMAGE_DIRECTORY);
        }

        $tagNames = $data['tags'] ?? [];
        unset($data['tags']);

        $news = $this->news->create($data);
        $news->tags()->sync($this->resolveTagIds($tagNames));

        return $news->load(['category', 'author', 'tags']);
    }

    public function update(News $news, array $data, ?UploadedFile $image = null): News
    {
        if (! empty($data['title']) && $data['title'] !== $news->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $this->news, $news->id);
        }

        if (isset($data['status'])) {
            $data['published_at'] = $data['status'] === News::STATUS_PUBLISHED
                ? ($news->published_at ?? Carbon::now())
                : null;
        }

        if ($image) {
            $this->fileUpload->delete($news->featured_image);
            $data['featured_image'] = $this->fileUpload->store($image, self::IMAGE_DIRECTORY);
        }

        if (array_key_exists('tags', $data)) {
            $news->tags()->sync($this->resolveTagIds($data['tags']));
            unset($data['tags']);
        }

        return $this->news->update($news, $data)->load(['category', 'author', 'tags']);
    }

    public function delete(News $news): bool
    {
        $this->fileUpload->delete($news->featured_image);

        return $this->news->delete($news);
    }

    protected function resolveTagIds(array $tagNames): array
    {
        return collect($tagNames)
            ->filter()
            ->map(function (string $name) {
                return $this->tags->query()->firstOrCreate(
                    ['slug' => Str::slug($name)],
                    ['name' => $name]
                )->id;
            })
            ->all();
    }
}
