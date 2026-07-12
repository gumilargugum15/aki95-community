<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Baksos\StoreBaksosRequest;
use App\Http\Requests\Baksos\UpdateBaksosRequest;
use App\Http\Resources\BaksosResource;
use App\Models\Baksos;
use App\Services\BaksosService;
use Illuminate\Http\JsonResponse;
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

    public function show(Baksos $baksos): BaksosResource
    {
        return new BaksosResource($this->baksos->find($baksos->id));
    }

    public function store(StoreBaksosRequest $request): JsonResponse
    {
        $data = $request->safe()->except('cover_image');
        $data['created_by'] = $request->user()->id;

        $baksos = $this->baksos->create($data, $request->file('cover_image'));

        return response()->json(['data' => new BaksosResource($baksos)], 201);
    }

    public function update(UpdateBaksosRequest $request, Baksos $baksos): JsonResponse
    {
        $data = $request->safe()->except('cover_image');

        $baksos = $this->baksos->update($baksos, $data, $request->file('cover_image'));

        return response()->json(['data' => new BaksosResource($baksos)]);
    }

    public function destroy(Baksos $baksos): JsonResponse
    {
        $this->baksos->delete($baksos);

        return response()->json(['message' => 'Kegiatan bakti sosial berhasil dihapus.']);
    }
}
