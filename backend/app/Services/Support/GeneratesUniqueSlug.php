<?php

namespace App\Services\Support;

use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Support\Str;

trait GeneratesUniqueSlug
{
    protected function generateUniqueSlug(string $title, RepositoryInterface $repository, ?int $ignoreId = null): string
    {
        $original = Str::slug($title);
        $slug = $original;
        $suffix = 1;

        while (
            $repository->query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$original}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
