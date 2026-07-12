<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganizationMemberResource;
use App\Services\OrganizationMemberService;

class OrganizationController extends Controller
{
    public function __construct(protected OrganizationMemberService $members) {}

    public function index()
    {
        return OrganizationMemberResource::collection($this->members->list());
    }
}
