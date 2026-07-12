import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { ApiResource, DashboardStats } from '@/types'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => (await api.get<ApiResource<DashboardStats>>('/admin/dashboard/stats')).data.data,
  })
}
