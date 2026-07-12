<?php

namespace Database\Factories;

use App\Models\EventRegistration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EventRegistration>
 */
class EventRegistrationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'event_id' => null,
            'member_id' => null,
            'name' => $this->faker->name(),
            'phone' => '08'.$this->faker->numerify('##########'),
            'email' => $this->faker->optional()->safeEmail(),
            'motor_type' => 'Honda Astrea Grand',
            'status' => $this->faker->randomElement(['registered', 'confirmed', 'cancelled']),
        ];
    }
}
