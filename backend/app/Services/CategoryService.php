<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Services\Support\GeneratesUniqueSlug;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    use GeneratesUniqueSlug;

    public function __construct(protected CategoryRepositoryInterface $categories) {}

    public function listByType(string $type): Collection
    {
        return $this->categories->query()->where('type', $type)->orderBy('name')->get();
    }

    public function find(int $id): Category
    {
        return $this->categories->findOrFail($id);
    }

    public function create(array $data): Category
    {
        $data['slug'] = $this->generateUniqueSlug($data['name'], $this->categories);

        return $this->categories->create($data);
    }

    public function update(Category $category, array $data): Category
    {
        if (! empty($data['name']) && $data['name'] !== $category->name) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $this->categories, $category->id);
        }

        return $this->categories->update($category, $data);
    }

    public function delete(Category $category): bool
    {
        return $this->categories->delete($category);
    }
}
