<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(protected UserService $users) {}

    public function index(Request $request)
    {
        return UserResource::collection(
            $this->users->list($request->only(['role', 'search']))
        );
    }

    public function show(User $user): UserResource
    {
        return new UserResource($this->users->find($user->id));
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $data = $request->safe()->except('avatar');

        $user = $this->users->create($data);

        return response()->json(['data' => new UserResource($user)], 201);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $data = $request->safe()->except('avatar');

        $user = $this->users->update($user, $data);

        return response()->json(['data' => new UserResource($user)]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->users->delete($user);

        return response()->json(['message' => 'Pengguna berhasil dihapus.']);
    }
}
