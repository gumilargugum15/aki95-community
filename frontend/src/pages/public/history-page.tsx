import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { useSiteSettings } from '@/api/public'

export function HistoryPage() {
  const { data: settings, isLoading } = useSiteSettings()

  return (
    <div>
      <PageHero title="Sejarah Komunitas" description="Perjalanan Komunitas AKI Motor 95 dari masa ke masa" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p className="whitespace-pre-line text-muted-foreground">{settings?.history}</p>
        )}
      </div>
    </div>
  )
}
