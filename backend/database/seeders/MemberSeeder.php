<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        $memberUser = User::query()->where('email', 'member@aki95.com')->first();

        if ($memberUser) {
            Member::factory()->create([
                'user_id' => $memberUser->id,
                'name' => $memberUser->name,
                'email' => $memberUser->email,
            ]);
        }

        Member::factory()->count(24)->create();
    }
}
