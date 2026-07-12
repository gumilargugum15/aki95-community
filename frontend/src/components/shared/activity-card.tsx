import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ActivityStatus } from '@/types'

const STATUS_LABEL: Record<ActivityStatus, string> = {
  upcoming: 'Akan Datang',
  ongoing: 'Berlangsung',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

interface ActivityCardProps {
  to: string
  title: string
  coverImage: string | null
  location: string
  date: string
  status: ActivityStatus
  participantCount?: number
  highlighted?: boolean
}

export function ActivityCard({
  to,
  title,
  coverImage,
  location,
  date,
  status,
  participantCount,
  highlighted,
}: ActivityCardProps) {
  return (
    <Link to={to} className="group block h-full">
      <Card
        className={cn(
          'h-full overflow-hidden py-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10',
          highlighted && 'border-primary',
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <MapPin className="size-8" />
            </div>
          )}
          <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
            {STATUS_LABEL[status]}
          </span>
        </div>
        <CardContent className="space-y-2.5 py-4">
          <h3 className="line-clamp-2 text-base font-extrabold tracking-tight uppercase leading-snug">{title}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              {location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0" />
              {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            {participantCount !== undefined && (
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5 shrink-0" />
                {participantCount} peserta
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
