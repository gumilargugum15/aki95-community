<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Services\VideoService;
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

    public function show(int $id): VideoResource
    {
        return new VideoResource($this->videos->find($id));
    }
}
