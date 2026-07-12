<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $values = [
            'site_name' => 'Komunitas AKI Motor 95',
            'about' => 'Komunitas AKI Motor 95 adalah wadah silaturahmi para pengguna motor Honda keluaran tahun 1995 yang berdiri untuk mempererat persaudaraan antar anggota melalui kegiatan touring, bakti sosial, dan kopdar rutin.',
            'history' => 'Berdiri sejak tahun 2015, Komunitas AKI Motor 95 bermula dari sekumpulan pengendara motor klasik yang sering bertemu di bengkel langganan. Seiring waktu, komunitas ini berkembang dan tersebar di berbagai regional.',
            'vision' => 'Menjadi komunitas motor klasik terdepan yang solid, peduli sesama, dan melestarikan budaya otomotif klasik Indonesia.',
            'mission' => 'Mempererat silaturahmi antar anggota, aktif dalam kegiatan sosial kemasyarakatan, dan menjaga kelestarian motor klasik Honda tahun 95.',
            'address' => 'Sekretariat AKI Motor 95, Jl. Raya Bogor No. 95, Jakarta Timur',
            'phone' => '081234567895',
            'whatsapp' => '6281234567895',
            'email' => 'kontak@aki95.com',
            'google_maps_embed' => 'https://www.google.com/maps?q=Jakarta+Timur&output=embed',
            'instagram' => 'https://instagram.com/akimotor95',
            'facebook' => 'https://facebook.com/akimotor95',
            'youtube' => 'https://youtube.com/@akimotor95',
        ];

        foreach ($values as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'site']
            );
        }
    }
}
