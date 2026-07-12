<?php

namespace Database\Factories;

use App\Models\GalleryAlbum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<GalleryAlbum>
 */
class GalleryAlbumFactory extends Factory
{
    public function definition(): array
    {
        $title = ucwords($this->faker->unique()->words(3, true));

        return [
            'category_id' => null,
            'touring_id' => null,
            'baksos_id' => null,
            'title' => $title,
            'slug' => Str::slug($title),
            'cover_image' => null,
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
