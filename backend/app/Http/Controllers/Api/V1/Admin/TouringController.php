<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Touring\StoreTouringRequest;
use App\Http\Requests\Touring\UpdateTouringRequest;
use App\Http\Resources\TouringResource;
use App\Models\Touring;
use App\Services\TouringService;
use Illuminate\Http\JsonResponse;
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

    public function show(Touring $touring): TouringResource
    {
        return new TouringResource($this->tourings->find($touring->id));
    }

    public function store(StoreTouringRequest $request): JsonResponse
    {
        $data = $request->safe()->except('cover_image');
        $data['created_by'] = $request->user()->id;

        $touring = $this->tourings->create($data, $request->file('cover_image'));

        return response()->json(['data' => new TouringResource($touring)], 201);
    }

    public function update(UpdateTouringRequest $request, Touring $touring): JsonResponse
    {
        $data = $request->safe()->except('cover_image');

        $touring = $this->tourings->update($touring, $data, $request->file('cover_image'));

        return response()->json(['data' => new TouringResource($touring)]);
    }

    public function destroy(Touring $touring): JsonResponse
    {
        $this->tourings->delete($touring);

        return response()->json(['message' => 'Touring berhasil dihapus.']);
    }
}
