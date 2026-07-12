<?php

namespace Database\Factories;

use App\Models\GalleryPhoto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryPhoto>
 */
class GalleryPhotoFactory extends Factory
{
    public function definition(): array
    {
        static $order = 0;

        return [
            'album_id' => null,
            'photo_path' => 'https://picsum.photos/seed/'.$this->faker->unique()->numberBetween(1, 100000).'/1200/800',
            'caption' => $this->faker->optional()->sentence(4),
            'order' => $order++,
        ];
    }
}
