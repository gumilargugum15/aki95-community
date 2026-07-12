<?php

namespace App\Services;

use App\Models\Sponsor;
use App\Repositories\Contracts\SponsorRepositoryInterface;
use App\Services\Support\FileUploadService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class SponsorService
{
    protected const LOGO_DIRECTORY = 'sponsors/logos';

    public function __construct(
        protected SponsorRepositoryInterface $sponsors,
        protected FileUploadService $fileUpload,
    ) {}

    public function list(bool $onlyActive = false): Collection
    {
        $query = $this->sponsors->query()->orderBy('order');

        if ($onlyActive) {
            $query->where('is_active', true);
        }

        return $query->get();
    }

    public function find(int $id): Sponsor
    {
        return $this->sponsors->findOrFail($id);
    }

    public function create(array $data, UploadedFile $logo): Sponsor
    {
        $data['logo'] = $this->fileUpload->store($logo, self::LOGO_DIRECTORY);

        return $this->sponsors->create($data);
    }

    public function update(Sponsor $sponsor, array $data, ?UploadedFile $logo = null): Sponsor
    {
        if ($logo) {
            $this->fileUpload->delete($sponsor->logo);
            $data['logo'] = $this->fileUpload->store($logo, self::LOGO_DIRECTORY);
        }

        return $this->sponsors->update($sponsor, $data);
    }

    public function delete(Sponsor $sponsor): bool
    {
        $this->fileUpload->delete($sponsor->logo);

        return $this->sponsors->delete($sponsor);
    }
}
