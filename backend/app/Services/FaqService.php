<?php

namespace App\Services;

use App\Models\Faq;
use App\Repositories\Contracts\FaqRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class FaqService
{
    public function __construct(protected FaqRepositoryInterface $faqs) {}

    public function list(bool $onlyActive = false): Collection
    {
        $query = $this->faqs->query()->orderBy('order');

        if ($onlyActive) {
            $query->where('is_active', true);
        }

        return $query->get();
    }

    public function find(int $id): Faq
    {
        return $this->faqs->findOrFail($id);
    }

    public function create(array $data): Faq
    {
        return $this->faqs->create($data);
    }

    public function update(Faq $faq, array $data): Faq
    {
        return $this->faqs->update($faq, $data);
    }

    public function delete(Faq $faq): bool
    {
        return $this->faqs->delete($faq);
    }
}
