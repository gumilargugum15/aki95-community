<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\StoreBannerRequest;
use App\Http\Requests\Banner\UpdateBannerRequest;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Services\BannerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function __construct(protected BannerService $banners) {}

    public function index(Request $request)
    {
        return BannerResource::collection($this->banners->list($request->only(['position'])));
    }

    public function store(StoreBannerRequest $request): JsonResponse
    {
        $data = $request->safe()->except('image');

        $banner = $this->banners->create($data, $request->file('image'));

        return response()->json(['data' => new BannerResource($banner)], 201);
    }

    public function update(UpdateBannerRequest $request, Banner $banner): JsonResponse
    {
        $data = $request->safe()->except('image');

        $banner = $this->banners->update($banner, $data, $request->file('image'));

        return response()->json(['data' => new BannerResource($banner)]);
    }

    public function destroy(Banner $banner): JsonResponse
    {
        $this->banners->delete($banner);

        return response()->json(['message' => 'Banner berhasil dihapus.']);
    }
}
