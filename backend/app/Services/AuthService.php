<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login(string $email, string $password, ?string $deviceName = null): array
    {
        $user = User::query()->where('email', $email)->first();

        if (! $user || ! Auth::getProvider()->validateCredentials($user, ['password' => $password])) {
            throw new AuthenticationException('Email atau password salah.');
        }

        if (! $user->is_active) {
            throw new AuthenticationException('Akun anda tidak aktif. Hubungi pengurus.');
        }

        $token = $user->createToken($deviceName ?? 'api-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }
}
