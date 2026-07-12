<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Services\BannerService;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function __construct(protected BannerService $banners) {}

    public function index(Request $request)
    {
        $filters = $request->only(['position']);
        $filters['only_active'] = true;

        return BannerResource::collection($this->banners->list($filters));
    }
}
