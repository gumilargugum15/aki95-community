<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BaksosResource;
use App\Services\BaksosService;
use Illuminate\Http\Request;

class BaksosController extends Controller
{
    public function __construct(protected BaksosService $baksos) {}

    public function index(Request $request)
    {
        return BaksosResource::collection(
            $this->baksos->list($request->only(['status', 'search']))
        );
    }

    public function show(string $slug): BaksosResource
    {
        return new BaksosResource($this->baksos->findBySlug($slug));
    }
}
