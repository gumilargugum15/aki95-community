<?php

namespace App\Services;

use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MemberService
{
    public function __construct(protected MemberRepositoryInterface $members) {}

    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->members->query();

        if (! empty($filters['regional'])) {
            $query->where('regional', $filters['regional']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', (bool) $filters['is_active']);
        }

        if (! empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                    ->orWhere('member_number', 'like', "%{$filters['search']}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }

    public function find(int $id): Member
    {
        return $this->members->findOrFail($id);
    }

    public function create(array $data): Member
    {
        $data['member_number'] = $this->generateMemberNumber();

        return $this->members->create($data);
    }

    public function update(Member $member, array $data): Member
    {
        return $this->members->update($member, $data);
    }

    public function delete(Member $member): bool
    {
        return $this->members->delete($member);
    }

    protected function generateMemberNumber(): string
    {
        $year = date('Y');
        $lastNumber = $this->members->query()
            ->where('member_number', 'like', "AKI95-{$year}-%")
            ->count();

        return sprintf('AKI95-%s-%04d', $year, $lastNumber + 1);
    }
}
