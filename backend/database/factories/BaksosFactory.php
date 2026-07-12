<?php

namespace Database\Factories;

use App\Models\Baksos;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Baksos>
 */
class BaksosFactory extends Factory
{
    protected static array $themes = [
        'Donor Darah', 'Santunan Anak Yatim', 'Bantuan Korban Banjir', 'Bagi Takjil Ramadhan', 'Peduli Sesama',
    ];

    public function definition(): array
    {
        $theme = $this->faker->randomElement(self::$themes).' '.$this->faker->year();
        $target = $this->faker->randomElement([5000000, 10000000, 15000000, 20000000]);

        return [
            'created_by' => User::factory(),
            'title' => $theme,
            'slug' => Str::slug($theme.'-'.$this->faker->unique()->randomNumber(6)),
            'cover_image' => null,
            'location' => $this->faker->city(),
            'date' => $this->faker->dateTimeBetween('-6 months', '+2 months'),
            'description' => $this->faker->paragraphs(2, true),
            'donation_target' => $target,
            'donation_collected' => $this->faker->numberBetween(0, $target),
            'status' => $this->faker->randomElement(['upcoming', 'ongoing', 'completed', 'cancelled']),
        ];
    }
}
