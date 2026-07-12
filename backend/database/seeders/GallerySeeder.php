<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Models\Touring;
use App\Models\Baksos;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleryCategories = Category::query()->where('type', 'gallery')->get();
        $tourings = Touring::query()->get();
        $baksosList = Baksos::query()->get();

        foreach ($tourings->take(5) as $touring) {
            $album = GalleryAlbum::factory()->create([
                'category_id' => $galleryCategories->firstWhere('name', 'Touring')?->id,
                'touring_id' => $touring->id,
                'title' => 'Dokumentasi '.$touring->title,
            ]);

            GalleryPhoto::factory()->count(rand(4, 8))->create(['album_id' => $album->id]);
        }

        foreach ($baksosList->take(3) as $baksos) {
            $album = GalleryAlbum::factory()->create([
                'category_id' => $galleryCategories->firstWhere('name', 'Bakti Sosial')?->id,
                'baksos_id' => $baksos->id,
                'title' => 'Dokumentasi '.$baksos->title,
            ]);

            GalleryPhoto::factory()->count(rand(4, 8))->create(['album_id' => $album->id]);
        }

        GalleryAlbum::factory()->count(3)->create([
            'category_id' => $galleryCategories->firstWhere('name', 'Kopdar')?->id,
        ])->each(function (GalleryAlbum $album) {
            GalleryPhoto::factory()->count(rand(4, 8))->create(['album_id' => $album->id]);
        });
    }
}
