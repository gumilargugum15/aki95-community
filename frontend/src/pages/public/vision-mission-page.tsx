import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSiteSettings } from '@/api/public'

export function VisionMissionPage() {
  const { data: settings, isLoading } = useSiteSettings()

  return (
    <div>
      <PageHero title="Visi & Misi" description="Arah dan tujuan Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-muted-foreground">{settings?.vision}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-muted-foreground">{settings?.mission}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
