import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Wallet } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { YoutubeEmbed } from '@/components/shared/youtube-embed'
import { PhotoGridLightbox } from '@/components/shared/photo-grid-lightbox'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useBaksos } from '@/api/public'

function formatRupiah(value: string | number | null) {
  if (value === null) return null
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
    Number(value),
  )
}

export function BaksosDetailPage() {
  const { slug } = useParams()
  const { data: baksos, isLoading } = useBaksos(slug)

  if (isLoading) return <LoadingSpinner className="py-32" />
  if (!baksos) return null

  const target = baksos.donation_target ? Number(baksos.donation_target) : null
  const collected = baksos.donation_collected ? Number(baksos.donation_collected) : 0
  const progress = target ? Math.min(100, Math.round((collected / target) * 100)) : null

  return (
    <div>
      <div className="aspect-[21/9] w-full overflow-hidden bg-muted">
        {baksos.cover_image && (
          <img src={baksos.cover_image} alt={baksos.title} className="size-full object-cover" />
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 -ml-2"
          render={
            <Link to="/bakti-sosial">
              <ArrowLeft className="size-4" /> Kembali
            </Link>
          }
        />

        <h1 className="text-3xl font-bold tracking-tight">{baksos.title}</h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" /> {baksos.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {new Date(baksos.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
          </span>
        </div>

        {target !== null && (
          <div className="mt-6 rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium">
                <Wallet className="size-4" /> Donasi Terkumpul
              </span>
              <span className="text-muted-foreground">
                {formatRupiah(collected)} / {formatRupiah(target)}
              </span>
            </div>
            <Progress value={progress ?? 0} />
          </div>
        )}

        {baksos.description && (
          <p className="mt-6 whitespace-pre-line text-muted-foreground">{baksos.description}</p>
        )}

        {baksos.gallery_albums?.some((album) => album.photos?.length) && (
          <div className="mt-10">
            <h2 className="mb-4 font-semibold">Dokumentasi</h2>
            {baksos.gallery_albums.map(
              (album) =>
                album.photos?.length ? <PhotoGridLightbox key={album.id} photos={album.photos} /> : null,
            )}
          </div>
        )}

        {baksos.videos && baksos.videos.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="font-semibold">Video</h2>
            {baksos.videos.map((video) => (
              <YoutubeEmbed key={video.id} url={video.youtube_url} title={video.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
