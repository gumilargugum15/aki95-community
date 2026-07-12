import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'
import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEvents } from '@/api/public'

export function EventsPage() {
  const { data, isLoading } = useEvents()
  const [month, setMonth] = useState(new Date())

  const eventDates = useMemo(
    () => data?.data.map((event) => new Date(`${event.start_date}T00:00:00`)) ?? [],
    [data],
  )

  return (
    <div>
      <PageHero title="Jadwal Kegiatan" description="Agenda dan kalender kegiatan Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <Card className="h-fit">
            <CardContent className="flex justify-center py-4">
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                modifiers={{ event: eventDates }}
                modifiersClassNames={{ event: 'bg-primary/15 text-primary font-semibold rounded-md' }}
              />
            </CardContent>
          </Card>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Agenda Mendatang</h2>
            {isLoading ? (
              <LoadingSpinner />
            ) : !data?.data.length ? (
              <EmptyState title="Belum ada agenda kegiatan" />
            ) : (
              <div className="space-y-4">
                {data.data.map((event) => (
                  <Link key={event.id} to={`/jadwal-kegiatan/${event.slug}`}>
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="flex items-start justify-between gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="size-3.5" />
                              {new Date(event.start_date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="size-3.5" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        {event.registration_required && <Badge>Pendaftaran Dibuka</Badge>}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
