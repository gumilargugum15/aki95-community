<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<News>
 */
class NewsFactory extends Factory
{
    public function definition(): array
    {
        $title = ucfirst($this->faker->unique()->sentence(6));
        $status = $this->faker->randomElement(['draft', 'published']);

        return [
            'category_id' => null,
            'author_id' => User::factory(),
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => $this->faker->sentence(15),
            'content' => $this->faker->paragraphs(6, true),
            'featured_image' => null,
            'status' => $status,
            'published_at' => $status === 'published' ? $this->faker->dateTimeBetween('-3 months', 'now') : null,
            'views' => $this->faker->numberBetween(0, 2500),
        ];
    }
}
