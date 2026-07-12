<?php

namespace Database\Factories;

use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sponsor>
 */
class SponsorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'logo' => 'https://picsum.photos/seed/'.$this->faker->unique()->numberBetween(1, 100000).'/400/400',
            'website' => $this->faker->url(),
            'description' => $this->faker->optional()->sentence(),
            'order' => $this->faker->numberBetween(0, 20),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
