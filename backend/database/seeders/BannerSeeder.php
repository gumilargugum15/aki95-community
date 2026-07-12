<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        Banner::query()->create([
            'title' => 'Selamat Datang di Komunitas AKI Motor 95',
            'image' => 'https://picsum.photos/seed/banner1/1600/600',
            'link_url' => null,
            'position' => 'home_hero',
            'order' => 0,
            'is_active' => true,
        ]);

        Banner::query()->create([
            'title' => 'Touring Akbar 2026 Segera Hadir',
            'image' => 'https://picsum.photos/seed/banner2/1600/600',
            'link_url' => null,
            'position' => 'home_hero',
            'order' => 1,
            'is_active' => true,
        ]);
    }
}
