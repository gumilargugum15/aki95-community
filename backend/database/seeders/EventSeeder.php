<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin@aki95.com')->first();
        $members = Member::query()->inRandomOrder()->take(10)->get();

        Event::factory()->count(8)->create([
            'created_by' => $admin?->id,
        ])->each(function (Event $event) use ($members) {
            if (! $event->registration_required) {
                return;
            }

            foreach ($members->random(min(3, $members->count())) as $member) {
                EventRegistration::factory()->create([
                    'event_id' => $event->id,
                    'member_id' => $member->id,
                    'name' => $member->name,
                    'phone' => $member->phone,
                    'email' => $member->email,
                    'motor_type' => $member->motor_type,
                ]);
            }
        });
    }
}
