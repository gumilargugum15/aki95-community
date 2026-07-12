<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function __construct(protected DashboardService $dashboard) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->dashboard->stats()]);
    }
}
