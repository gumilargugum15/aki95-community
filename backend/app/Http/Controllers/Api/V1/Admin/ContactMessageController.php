<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Services\ContactMessageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function __construct(protected ContactMessageService $messages) {}

    public function index(Request $request)
    {
        return ContactMessageResource::collection(
            $this->messages->list($request->only(['is_read']))
        );
    }

    public function show(ContactMessage $contactMessage): JsonResponse
    {
        $this->messages->markAsRead($contactMessage);

        return response()->json(['data' => new ContactMessageResource($contactMessage->refresh())]);
    }

    public function destroy(ContactMessage $contactMessage): JsonResponse
    {
        $this->messages->delete($contactMessage);

        return response()->json(['message' => 'Pesan berhasil dihapus.']);
    }
}
