<?php

namespace Database\Seeders;

use App\Models\Baksos;
use App\Models\User;
use Illuminate\Database\Seeder;

class BaksosSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin@aki95.com')->first();

        Baksos::factory()->count(5)->create([
            'created_by' => $admin?->id,
        ]);
    }
}
