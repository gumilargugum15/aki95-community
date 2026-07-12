import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { useSiteSettings } from '@/api/public'

export function AboutPage() {
  const { data: settings, isLoading } = useSiteSettings()

  return (
    <div>
      <PageHero title="Tentang Kami" description="Mengenal lebih dekat Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p className="whitespace-pre-line text-muted-foreground">{settings?.about}</p>
        )}
      </div>
    </div>
  )
}
