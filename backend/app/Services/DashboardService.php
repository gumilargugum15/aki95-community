<?php

namespace App\Services;

use App\Models\News;
use App\Repositories\Contracts\BaksosRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Repositories\Contracts\GalleryPhotoRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Repositories\Contracts\TouringRepositoryInterface;
use App\Repositories\Contracts\VideoRepositoryInterface;

class DashboardService
{
    public function __construct(
        protected MemberRepositoryInterface $members,
        protected TouringRepositoryInterface $tourings,
        protected BaksosRepositoryInterface $baksos,
        protected EventRepositoryInterface $events,
        protected NewsRepositoryInterface $news,
        protected GalleryPhotoRepositoryInterface $photos,
        protected VideoRepositoryInterface $videos,
    ) {}

    public function stats(): array
    {
        return [
            'total_anggota' => $this->members->query()->where('is_active', true)->count(),
            'total_touring' => $this->tourings->query()->count(),
            'total_baksos' => $this->baksos->query()->count(),
            'total_event' => $this->events->query()->count(),
            'total_berita' => $this->news->query()->where('status', News::STATUS_PUBLISHED)->count(),
            'total_foto' => $this->photos->query()->count(),
            'total_video' => $this->videos->query()->count(),
            'total_regional' => $this->members->query()->where('is_active', true)->distinct('regional')->count('regional'),
        ];
    }
}
