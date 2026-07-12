<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faq\StoreFaqRequest;
use App\Http\Requests\Faq\UpdateFaqRequest;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use App\Services\FaqService;
use Illuminate\Http\JsonResponse;

class FaqController extends Controller
{
    public function __construct(protected FaqService $faqs) {}

    public function index()
    {
        return FaqResource::collection($this->faqs->list());
    }

    public function store(StoreFaqRequest $request): JsonResponse
    {
        $faq = $this->faqs->create($request->validated());

        return response()->json(['data' => new FaqResource($faq)], 201);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): JsonResponse
    {
        $faq = $this->faqs->update($faq, $request->validated());

        return response()->json(['data' => new FaqResource($faq)]);
    }

    public function destroy(Faq $faq): JsonResponse
    {
        $this->faqs->delete($faq);

        return response()->json(['message' => 'FAQ berhasil dihapus.']);
    }
}
