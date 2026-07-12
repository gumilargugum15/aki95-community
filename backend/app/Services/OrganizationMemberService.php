<?php

namespace App\Services;

use App\Models\OrganizationMember;
use App\Repositories\Contracts\OrganizationMemberRepositoryInterface;
use App\Services\Support\FileUploadService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class OrganizationMemberService
{
    protected const PHOTO_DIRECTORY = 'organization/photos';

    public function __construct(
        protected OrganizationMemberRepositoryInterface $members,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(): Collection
    {
        return $this->members->query()->orderBy('order')->get();
    }

    public function find(int $id): OrganizationMember
    {
        return $this->members->findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $photo = null): OrganizationMember
    {
        if ($photo) {
            $data['photo'] = $this->fileUpload->store($photo, self::PHOTO_DIRECTORY);
        }

        return $this->members->create($data);
    }

    public function update(OrganizationMember $member, array $data, ?UploadedFile $photo = null): OrganizationMember
    {
        if ($photo) {
            $this->fileUpload->delete($member->photo);
            $data['photo'] = $this->fileUpload->store($photo, self::PHOTO_DIRECTORY);
        }

        return $this->members->update($member, $data);
    }

    public function delete(OrganizationMember $member): bool
    {
        $this->fileUpload->delete($member->photo);

        return $this->members->delete($member);
    }
}
