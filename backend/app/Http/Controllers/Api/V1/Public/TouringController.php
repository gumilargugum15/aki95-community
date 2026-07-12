<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\TouringResource;
use App\Services\TouringService;
use Illuminate\Http\Request;

class TouringController extends Controller
{
    public function __construct(protected TouringService $tourings) {}

    public function index(Request $request)
    {
        return TouringResource::collection(
            $this->tourings->list($request->only(['status', 'search']))
        );
    }

    public function show(string $slug): TouringResource
    {
        return new TouringResource($this->tourings->findBySlug($slug));
    }
}
