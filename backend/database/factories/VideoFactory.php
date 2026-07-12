<?php

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Video>
 */
class VideoFactory extends Factory
{
    protected static array $youtubeIds = [
        'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'M7lc1UVf-VE', '9bZkp7q19f0', 'kXYiU_JCYtU',
    ];

    public function definition(): array
    {
        $videoId = $this->faker->randomElement(self::$youtubeIds);

        return [
            'category_id' => null,
            'touring_id' => null,
            'baksos_id' => null,
            'title' => ucwords($this->faker->words(4, true)),
            'youtube_url' => "https://www.youtube.com/watch?v={$videoId}",
            'thumbnail' => "https://img.youtube.com/vi/{$videoId}/hqdefault.jpg",
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
