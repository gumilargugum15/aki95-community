<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpdateSettingRequest;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct(protected SettingService $settings) {}

    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $this->settings->all($request->string('group')->toString() ?: null),
        ]);
    }

    public function update(UpdateSettingRequest $request): JsonResponse
    {
        $this->settings->updateMany(
            $request->validated('values'),
            $request->validated('group') ?? 'general'
        );

        return response()->json(['message' => 'Pengaturan berhasil disimpan.']);
    }
}
