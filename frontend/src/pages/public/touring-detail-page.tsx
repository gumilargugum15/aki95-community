import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Users } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { YoutubeEmbed } from '@/components/shared/youtube-embed'
import { PhotoGridLightbox } from '@/components/shared/photo-grid-lightbox'
import { Button } from '@/components/ui/button'
import { useTouring } from '@/api/public'

export function TouringDetailPage() {
  const { slug } = useParams()
  const { data: touring, isLoading } = useTouring(slug)

  if (isLoading) return <LoadingSpinner className="py-32" />
  if (!touring) return null

  return (
    <div>
      <div className="aspect-[21/9] w-full overflow-hidden bg-muted">
        {touring.cover_image && (
          <img src={touring.cover_image} alt={touring.title} className="size-full object-cover" />
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 -ml-2"
          render={
            <Link to="/touring">
              <ArrowLeft className="size-4" /> Kembali
            </Link>
          }
        />

        <h1 className="text-3xl font-bold tracking-tight">{touring.title}</h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" /> {touring.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {new Date(touring.start_date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4" /> {touring.participant_count} peserta
          </span>
        </div>

        {touring.route && (
          <div className="mt-6">
            <h2 className="mb-1 font-semibold">Rute</h2>
            <p className="text-muted-foreground">{touring.route}</p>
          </div>
        )}

        {touring.description && (
          <div className="mt-6">
            <h2 className="mb-1 font-semibold">Deskripsi</h2>
            <p className="whitespace-pre-line text-muted-foreground">{touring.description}</p>
          </div>
        )}

        {touring.gallery_albums?.some((album) => album.photos?.length) && (
          <div className="mt-10">
            <h2 className="mb-4 font-semibold">Album Foto</h2>
            {touring.gallery_albums.map(
              (album) =>
                album.photos?.length ? <PhotoGridLightbox key={album.id} photos={album.photos} /> : null,
            )}
          </div>
        )}

        {touring.videos && touring.videos.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="font-semibold">Video</h2>
            {touring.videos.map((video) => (
              <YoutubeEmbed key={video.id} url={video.youtube_url} title={video.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
