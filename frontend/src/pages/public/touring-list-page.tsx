import { useState } from 'react'
import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { ActivityCard } from '@/components/shared/activity-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTourings } from '@/api/public'

const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'upcoming', label: 'Akan Datang' },
  { value: 'ongoing', label: 'Berlangsung' },
  { value: 'completed', label: 'Selesai' },
]

export function TouringListPage() {
  const [status, setStatus] = useState<string>('all')
  const { data, isLoading } = useTourings(status === 'all' ? {} : { status })

  return (
    <div>
      <PageHero title="Touring" description="Dokumentasi kegiatan touring Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <Select value={status} onValueChange={(value) => setStatus(value ?? 'all')}>
            <SelectTrigger className="w-48">
              <SelectValue>{STATUS_OPTIONS.find((option) => option.value === status)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.data.length ? (
          <EmptyState title="Belum ada kegiatan touring" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((touring) => (
              <ActivityCard
                key={touring.id}
                to={`/touring/${touring.slug}`}
                title={touring.title}
                coverImage={touring.cover_image}
                location={touring.location}
                date={touring.start_date}
                status={touring.status}
                participantCount={touring.participant_count}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
