<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MemberSeeder::class,
            CategorySeeder::class,
            TouringSeeder::class,
            BaksosSeeder::class,
            GallerySeeder::class,
            VideoSeeder::class,
            NewsSeeder::class,
            EventSeeder::class,
            SponsorSeeder::class,
            FaqSeeder::class,
            BannerSeeder::class,
            OrganizationMemberSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
