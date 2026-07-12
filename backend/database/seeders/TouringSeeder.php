<?php

namespace Database\Seeders;

use App\Models\Touring;
use App\Models\User;
use Illuminate\Database\Seeder;

class TouringSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin@aki95.com')->first();

        Touring::factory()->count(8)->create([
            'created_by' => $admin?->id,
        ]);
    }
}
