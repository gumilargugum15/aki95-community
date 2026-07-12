<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $dashboard) {}

    public function stats(): JsonResponse
    {
        return response()->json(['data' => $this->dashboard->stats()]);
    }
}
