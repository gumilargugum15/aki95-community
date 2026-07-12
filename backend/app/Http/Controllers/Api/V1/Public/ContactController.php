<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Services\ContactMessageService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(protected ContactMessageService $messages) {}

    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $message = $this->messages->submit($request->validated());

        return response()->json([
            'message' => 'Pesan anda berhasil dikirim.',
            'data' => new ContactMessageResource($message),
        ], 201);
    }
}
