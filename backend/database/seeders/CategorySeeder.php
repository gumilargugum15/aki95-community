<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'gallery' => ['Touring', 'Bakti Sosial', 'Kopdar', 'Event Komunitas'],
            'video' => ['Touring', 'Bakti Sosial', 'Tips Motor', 'Dokumentasi Event'],
            'news' => ['Kegiatan Komunitas', 'Tips & Trik', 'Pengumuman', 'Prestasi Anggota'],
        ];

        foreach ($categories as $type => $names) {
            foreach ($names as $name) {
                Category::query()->create([
                    'type' => $type,
                    'name' => $name,
                    'slug' => Str::slug($type.'-'.$name),
                    'description' => null,
                ]);
            }
        }
    }
}
