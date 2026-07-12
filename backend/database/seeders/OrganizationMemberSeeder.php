<?php

namespace Database\Seeders;

use App\Models\OrganizationMember;
use Illuminate\Database\Seeder;

class OrganizationMemberSeeder extends Seeder
{
    public function run(): void
    {
        $structure = [
            'Ketua Umum',
            'Wakil Ketua',
            'Sekretaris',
            'Bendahara',
            'Koordinator Touring',
            'Koordinator Bakti Sosial',
            'Humas',
        ];

        foreach ($structure as $index => $position) {
            OrganizationMember::factory()->create([
                'position' => $position,
                'order' => $index,
                'period' => '2024-2027',
            ]);
        }
    }
}
