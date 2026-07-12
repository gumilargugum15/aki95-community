<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Member>
 */
class MemberFactory extends Factory
{
    protected static array $regionals = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Bandung'];

    protected static array $motors = ['Honda Astrea Grand', 'Honda Supra Fit', 'Honda Legenda', 'Honda GL Pro'];

    public function definition(): array
    {
        static $number = 1;

        return [
            'user_id' => null,
            'member_number' => sprintf('AKI95-%s-%04d', date('Y'), $number++),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => '08'.$this->faker->numerify('##########'),
            'regional' => $this->faker->randomElement(self::$regionals),
            'motor_type' => $this->faker->randomElement(self::$motors),
            'motor_year' => (string) $this->faker->numberBetween(1995, 2000),
            'join_year' => $this->faker->numberBetween(2018, (int) date('Y')),
            'is_active' => $this->faker->boolean(85),
            'address' => $this->faker->address(),
            'photo' => null,
            'bio' => $this->faker->optional()->sentence(),
        ];
    }
}
