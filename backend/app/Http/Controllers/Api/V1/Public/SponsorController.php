<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\SponsorResource;
use App\Services\SponsorService;

class SponsorController extends Controller
{
    public function __construct(protected SponsorService $sponsors) {}

    public function index()
    {
        return SponsorResource::collection($this->sponsors->list(onlyActive: true));
    }
}
