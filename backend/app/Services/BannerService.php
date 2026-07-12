<?php

namespace App\Services;

use App\Models\Banner;
use App\Repositories\Contracts\BannerRepositoryInterface;
use App\Services\Support\FileUploadService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class BannerService
{
    protected const IMAGE_DIRECTORY = 'banners';

    public function __construct(
        protected BannerRepositoryInterface $banners,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(array $filters = []): Collection
    {
        $query = $this->banners->query()->orderBy('order');

        if (! empty($filters['position'])) {
            $query->where('position', $filters['position']);
        }

        if (! empty($filters['only_active'])) {
            $today = now()->toDateString();
            $query->where('is_active', true)
                ->where(fn ($q) => $q->whereNull('start_date')->orWhere('start_date', '<=', $today))
                ->where(fn ($q) => $q->whereNull('end_date')->orWhere('end_date', '>=', $today));
        }

        return $query->get();
    }

    public function find(int $id): Banner
    {
        return $this->banners->findOrFail($id);
    }

    public function create(array $data, UploadedFile $image): Banner
    {
        $data['image'] = $this->fileUpload->store($image, self::IMAGE_DIRECTORY);

        return $this->banners->create($data);
    }

    public function update(Banner $banner, array $data, ?UploadedFile $image = null): Banner
    {
        if ($image) {
            $this->fileUpload->delete($banner->image);
            $data['image'] = $this->fileUpload->store($image, self::IMAGE_DIRECTORY);
        }

        return $this->banners->update($banner, $data);
    }

    public function delete(Banner $banner): bool
    {
        $this->fileUpload->delete($banner->image);

        return $this->banners->delete($banner);
    }
}
