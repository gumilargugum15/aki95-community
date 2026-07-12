<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function __construct(protected MemberService $members) {}

    public function index(Request $request)
    {
        return MemberResource::collection(
            $this->members->list($request->only(['regional', 'is_active', 'search']))
        );
    }

    public function show(Member $member): MemberResource
    {
        return new MemberResource($member);
    }

    public function store(StoreMemberRequest $request): JsonResponse
    {
        $member = $this->members->create($request->validated());

        return response()->json(['data' => new MemberResource($member)], 201);
    }

    public function update(UpdateMemberRequest $request, Member $member): JsonResponse
    {
        $member = $this->members->update($member, $request->validated());

        return response()->json(['data' => new MemberResource($member)]);
    }

    public function destroy(Member $member): JsonResponse
    {
        $this->members->delete($member);

        return response()->json(['message' => 'Anggota berhasil dihapus.']);
    }
}
