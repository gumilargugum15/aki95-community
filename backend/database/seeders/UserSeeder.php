<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->create([
            'name' => 'Super Admin',
            'email' => 'admin@aki95.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_ADMIN,
            'is_active' => true,
        ]);

        User::query()->create([
            'name' => 'Pengurus AKI95',
            'email' => 'pengurus@aki95.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_PENGURUS,
            'is_active' => true,
        ]);

        User::query()->create([
            'name' => 'Member AKI95',
            'email' => 'member@aki95.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_MEMBER,
            'is_active' => true,
        ]);

        User::factory()->count(5)->member()->create();
    }
}
