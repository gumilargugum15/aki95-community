<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Gallery\StoreGalleryAlbumRequest;
use App\Http\Requests\Gallery\StoreGalleryPhotoRequest;
use App\Http\Requests\Gallery\UpdateGalleryAlbumRequest;
use App\Http\Resources\GalleryAlbumResource;
use App\Http\Resources\GalleryPhotoResource;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Services\GalleryService;
use Illuminate\Http\JsonResponse;
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

    public function show(GalleryAlbum $album): GalleryAlbumResource
    {
        return new GalleryAlbumResource($this->gallery->findAlbum($album->id));
    }

    public function store(StoreGalleryAlbumRequest $request): JsonResponse
    {
        $data = $request->safe()->except('cover_image');

        $album = $this->gallery->createAlbum($data, $request->file('cover_image'));

        return response()->json(['data' => new GalleryAlbumResource($album)], 201);
    }

    public function update(UpdateGalleryAlbumRequest $request, GalleryAlbum $album): JsonResponse
    {
        $data = $request->safe()->except('cover_image');

        $album = $this->gallery->updateAlbum($album, $data, $request->file('cover_image'));

        return response()->json(['data' => new GalleryAlbumResource($album)]);
    }

    public function destroy(GalleryAlbum $album): JsonResponse
    {
        $this->gallery->deleteAlbum($album);

        return response()->json(['message' => 'Album berhasil dihapus.']);
    }

    public function storePhotos(StoreGalleryPhotoRequest $request, GalleryAlbum $album): JsonResponse
    {
        $photos = $this->gallery->addPhotos($album, $request->file('photos'));

        return response()->json(['data' => GalleryPhotoResource::collection($photos)], 201);
    }

    public function destroyPhoto(GalleryAlbum $album, GalleryPhoto $photo): JsonResponse
    {
        $this->gallery->deletePhoto($photo);

        return response()->json(['message' => 'Foto berhasil dihapus.']);
    }
}
