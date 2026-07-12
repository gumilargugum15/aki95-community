<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Video\StoreVideoRequest;
use App\Http\Requests\Video\UpdateVideoRequest;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Services\VideoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function __construct(protected VideoService $videos) {}

    public function index(Request $request)
    {
        return VideoResource::collection(
            $this->videos->list($request->only(['category_id', 'touring_id', 'baksos_id']))
        );
    }

    public function show(Video $video): VideoResource
    {
        return new VideoResource($this->videos->find($video->id));
    }

    public function store(StoreVideoRequest $request): JsonResponse
    {
        $data = $request->safe()->except('thumbnail');

        $video = $this->videos->create($data, $request->file('thumbnail'));

        return response()->json(['data' => new VideoResource($video)], 201);
    }

    public function update(UpdateVideoRequest $request, Video $video): JsonResponse
    {
        $data = $request->safe()->except('thumbnail');

        $video = $this->videos->update($video, $data, $request->file('thumbnail'));

        return response()->json(['data' => new VideoResource($video)]);
    }

    public function destroy(Video $video): JsonResponse
    {
        $this->videos->delete($video);

        return response()->json(['message' => 'Video berhasil dihapus.']);
    }
}
