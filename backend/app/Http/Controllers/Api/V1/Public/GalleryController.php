<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryAlbumResource;
use App\Services\GalleryService;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function __construct(protected GalleryService $gallery) {}

    public function index(Request $request)
    {
        return GalleryAlbumResource::collection(
            $this->gallery->listAlbums($request->only(['category_id', 'touring_id', 'baksos_id']))
        );
    }

    public function show(string $slug): GalleryAlbumResource
    {
        return new GalleryAlbumResource($this->gallery->findAlbumBySlug($slug));
    }
}
