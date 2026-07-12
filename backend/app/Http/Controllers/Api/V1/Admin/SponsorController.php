<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sponsor\StoreSponsorRequest;
use App\Http\Requests\Sponsor\UpdateSponsorRequest;
use App\Http\Resources\SponsorResource;
use App\Models\Sponsor;
use App\Services\SponsorService;
use Illuminate\Http\JsonResponse;

class SponsorController extends Controller
{
    public function __construct(protected SponsorService $sponsors) {}

    public function index()
    {
        return SponsorResource::collection($this->sponsors->list());
    }

    public function store(StoreSponsorRequest $request): JsonResponse
    {
        $data = $request->safe()->except('logo');

        $sponsor = $this->sponsors->create($data, $request->file('logo'));

        return response()->json(['data' => new SponsorResource($sponsor)], 201);
    }

    public function update(UpdateSponsorRequest $request, Sponsor $sponsor): JsonResponse
    {
        $data = $request->safe()->except('logo');

        $sponsor = $this->sponsors->update($sponsor, $data, $request->file('logo'));

        return response()->json(['data' => new SponsorResource($sponsor)]);
    }

    public function destroy(Sponsor $sponsor): JsonResponse
    {
        $this->sponsors->delete($sponsor);

        return response()->json(['message' => 'Sponsor berhasil dihapus.']);
    }
}
