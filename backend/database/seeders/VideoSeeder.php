<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        $videoCategories = Category::query()->where('type', 'video')->get();

        Video::factory()->count(10)->create([
            'category_id' => fn () => $videoCategories->random()->id,
        ]);
    }
}
