<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\News\StoreNewsRequest;
use App\Http\Requests\News\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Services\NewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct(protected NewsService $news) {}

    public function index(Request $request)
    {
        return NewsResource::collection(
            $this->news->list($request->only(['status', 'category_id', 'tag', 'search']))
        );
    }

    public function show(News $news): NewsResource
    {
        return new NewsResource($this->news->find($news->id));
    }

    public function store(StoreNewsRequest $request): JsonResponse
    {
        $data = $request->safe()->except('featured_image');
        $data['author_id'] = $request->user()->id;

        $news = $this->news->create($data, $request->file('featured_image'));

        return response()->json(['data' => new NewsResource($news)], 201);
    }

    public function update(UpdateNewsRequest $request, News $news): JsonResponse
    {
        $data = $request->safe()->except('featured_image');

        $news = $this->news->update($news, $data, $request->file('featured_image'));

        return response()->json(['data' => new NewsResource($news)]);
    }

    public function destroy(News $news): JsonResponse
    {
        $this->news->delete($news);

        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }
}
