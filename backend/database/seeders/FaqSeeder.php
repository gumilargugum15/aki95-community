<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['question' => 'Bagaimana cara bergabung menjadi anggota AKI95?', 'answer' => 'Anda dapat mengisi formulir pendaftaran pada halaman Kontak atau datang langsung saat kegiatan Kopdar rutin.'],
            ['question' => 'Apakah ada biaya pendaftaran anggota?', 'answer' => 'Tidak ada biaya pendaftaran. Anggota hanya dikenakan iuran sukarela untuk kegiatan komunitas.'],
            ['question' => 'Apakah semua jenis motor Honda tahun 95 bisa bergabung?', 'answer' => 'Ya, komunitas ini terbuka untuk semua pengguna motor Honda keluaran tahun 1995 ke atas.'],
            ['question' => 'Bagaimana cara mendaftar touring?', 'answer' => 'Pendaftaran touring dapat dilakukan melalui halaman Jadwal Kegiatan atau menghubungi pengurus.'],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::query()->create([
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'order' => $index,
                'is_active' => true,
            ]);
        }

        Faq::factory()->count(4)->create();
    }
}
