<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Services\FaqService;

class FaqController extends Controller
{
    public function __construct(protected FaqService $faqs) {}

    public function index()
    {
        return FaqResource::collection($this->faqs->list(onlyActive: true));
    }
}
