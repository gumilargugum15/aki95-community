import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/auth-store'
import type { ApiResource, User } from '@/types'

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<LoginResponse>('/auth/login', payload)
      return data
    },
    onSuccess: (data) => setAuth(data.user, data.token),
  })
}

export function useLogout() {
  const clear = useAuthStore((state) => state.clear)

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
    },
    onSettled: () => clear(),
  })
}

/**
 * Shared logout flow: calls the API, clears local auth state (already
 * handled by useLogout's onSettled), then redirects to /login.
 */
export function useHandleLogout() {
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout.mutateAsync().catch(() => {})
    navigate('/login', { replace: true })
  }

  return { handleLogout, isPending: logout.isPending }
}

export async function fetchCurrentUser() {
  const { data } = await api.get<ApiResource<User>>('/auth/me')
  return data.data
}
