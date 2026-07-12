import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { ActivityCard } from '@/components/shared/activity-card'
import { useBaksosList } from '@/api/public'

export function BaksosListPage() {
  const { data, isLoading } = useBaksosList()

  return (
    <div>
      <PageHero title="Bakti Sosial" description="Kegiatan sosial dan kepedulian Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.data.length ? (
          <EmptyState title="Belum ada kegiatan bakti sosial" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((baksos) => (
              <ActivityCard
                key={baksos.id}
                to={`/bakti-sosial/${baksos.slug}`}
                title={baksos.title}
                coverImage={baksos.cover_image}
                location={baksos.location}
                date={baksos.date}
                status={baksos.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
