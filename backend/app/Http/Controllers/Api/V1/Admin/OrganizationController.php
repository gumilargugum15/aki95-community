<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organization\StoreOrganizationMemberRequest;
use App\Http\Requests\Organization\UpdateOrganizationMemberRequest;
use App\Http\Resources\OrganizationMemberResource;
use App\Models\OrganizationMember;
use App\Services\OrganizationMemberService;
use Illuminate\Http\JsonResponse;

class OrganizationController extends Controller
{
    public function __construct(protected OrganizationMemberService $members) {}

    public function index()
    {
        return OrganizationMemberResource::collection($this->members->list());
    }

    public function store(StoreOrganizationMemberRequest $request): JsonResponse
    {
        $data = $request->safe()->except('photo');

        $member = $this->members->create($data, $request->file('photo'));

        return response()->json(['data' => new OrganizationMemberResource($member)], 201);
    }

    public function update(UpdateOrganizationMemberRequest $request, OrganizationMember $organizationMember): JsonResponse
    {
        $data = $request->safe()->except('photo');

        $member = $this->members->update($organizationMember, $data, $request->file('photo'));

        return response()->json(['data' => new OrganizationMemberResource($member)]);
    }

    public function destroy(OrganizationMember $organizationMember): JsonResponse
    {
        $this->members->delete($organizationMember);

        return response()->json(['message' => 'Data struktur organisasi berhasil dihapus.']);
    }
}
