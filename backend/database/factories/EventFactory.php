<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    protected static array $titles = [
        'Kopdar Rutin Bulanan', 'Rapat Anggota Tahunan', 'Servis Gratis Motor Klasik', 'Latihan Safety Riding', 'Halal Bihalal Komunitas',
    ];

    public function definition(): array
    {
        $title = $this->faker->randomElement(self::$titles).' '.$this->faker->year();
        $start = $this->faker->dateTimeBetween('-2 months', '+3 months');

        return [
            'created_by' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title.'-'.$this->faker->unique()->randomNumber(6)),
            'cover_image' => null,
            'description' => $this->faker->paragraph(),
            'location' => $this->faker->city(),
            'start_date' => $start,
            'start_time' => '09:00',
            'end_date' => $start,
            'end_time' => '17:00',
            'quota' => $this->faker->optional(0.6)->numberBetween(20, 100),
            'registration_required' => $this->faker->boolean(60),
            'status' => $this->faker->randomElement(['upcoming', 'ongoing', 'completed', 'cancelled']),
        ];
    }
}
