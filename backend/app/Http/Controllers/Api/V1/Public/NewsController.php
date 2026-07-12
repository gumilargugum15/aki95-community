<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Services\NewsService;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct(protected NewsService $news) {}

    public function index(Request $request)
    {
        $filters = $request->only(['category_id', 'tag', 'search']);
        $filters['status'] = News::STATUS_PUBLISHED;

        return NewsResource::collection($this->news->list($filters));
    }

    public function show(string $slug): NewsResource
    {
        $news = $this->news->findBySlug($slug);

        abort_if($news->status !== News::STATUS_PUBLISHED, 404, 'Berita tidak ditemukan.');

        return new NewsResource($news);
    }
}
