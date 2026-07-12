<?php

namespace App\Services;

use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Support\Collection;

class SettingService
{
    public function __construct(protected SettingRepositoryInterface $settings) {}

    public function all(?string $group = null): Collection
    {
        $query = $this->settings->query();

        if ($group) {
            $query->where('group', $group);
        }

        return $query->get()->pluck('value', 'key');
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->settings->query()->where('key', $key)->value('value') ?? $default;
    }

    /**
     * @param  array<string, mixed>  $values
     */
    public function updateMany(array $values, string $group = 'general'): void
    {
        foreach ($values as $key => $value) {
            $this->settings->query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $group]
            );
        }
    }
}
