<?php

namespace App\Repositories\Eloquent;

use App\Models\OrganizationMember;
use App\Repositories\Contracts\OrganizationMemberRepositoryInterface;

class OrganizationMemberRepository extends BaseRepository implements OrganizationMemberRepositoryInterface
{
    public function __construct(OrganizationMember $model)
    {
        parent::__construct($model);
    }
}
