<?php

namespace Database\Factories;

use App\Models\Touring;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Touring>
 */
class TouringFactory extends Factory
{
    protected static array $destinations = ['Puncak Bogor', 'Lembang Bandung', 'Pantai Anyer', 'Gunung Bromo', 'Dieng Wonosobo', 'Baturaden'];

    public function definition(): array
    {
        $destination = $this->faker->randomElement(self::$destinations).' '.$this->faker->year();
        $start = $this->faker->dateTimeBetween('-6 months', '+3 months');

        return [
            'created_by' => User::factory(),
            'title' => 'Touring '.$destination,
            'slug' => Str::slug('Touring '.$destination.'-'.$this->faker->unique()->randomNumber(6)),
            'cover_image' => null,
            'location' => $destination,
            'start_date' => $start,
            'end_date' => (clone $start)->modify('+2 days'),
            'route' => $this->faker->sentence(10),
            'description' => $this->faker->paragraphs(3, true),
            'participant_count' => $this->faker->numberBetween(10, 80),
            'status' => $this->faker->randomElement(['upcoming', 'ongoing', 'completed', 'cancelled']),
        ];
    }
}
