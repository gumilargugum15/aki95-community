import { Bike, HeartHandshake, Images, Newspaper, Users, Video } from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { useDashboardStats } from '@/api/dashboard'
import { useAuthStore } from '@/stores/auth-store'

export function DashboardHomePage() {
  const { data: stats, isLoading } = useDashboardStats()
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Selamat datang, {user?.name}</h1>
        <p className="text-muted-foreground">Ringkasan statistik Komunitas AKI Motor 95.</p>
      </div>

      {isLoading || !stats ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Anggota" value={stats.total_anggota} icon={Users} />
          <StatCard label="Total Touring" value={stats.total_touring} icon={Bike} />
          <StatCard label="Total Event" value={stats.total_event} icon={HeartHandshake} />
          <StatCard label="Total Berita" value={stats.total_berita} icon={Newspaper} />
          <StatCard label="Total Foto" value={stats.total_foto} icon={Images} />
          <StatCard label="Total Video" value={stats.total_video} icon={Video} />
        </div>
      )}
    </div>
  )
}
