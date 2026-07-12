<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $newsCategories = Category::query()->where('type', 'news')->get();
        $author = User::query()->where('email', 'pengurus@aki95.com')->first();
        $tags = Tag::factory()->count(8)->create();

        News::factory()->count(15)->create([
            'category_id' => fn () => $newsCategories->random()->id,
            'author_id' => $author?->id,
        ])->each(function (News $news) use ($tags) {
            $news->tags()->attach($tags->random(rand(1, 3))->pluck('id'));
        });
    }
}
