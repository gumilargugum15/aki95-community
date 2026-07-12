import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { PhotoGridLightbox } from '@/components/shared/photo-grid-lightbox'
import { Button } from '@/components/ui/button'
import { useGalleryAlbum } from '@/api/public'

export function GalleryAlbumDetailPage() {
  const { slug } = useParams()
  const { data: album, isLoading } = useGalleryAlbum(slug)

  if (isLoading) return <LoadingSpinner className="py-32" />
  if (!album) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2"
        render={
          <Link to="/galeri-foto">
            <ArrowLeft className="size-4" /> Kembali
          </Link>
        }
      />

      <h1 className="text-3xl font-bold tracking-tight">{album.title}</h1>
      {album.description && <p className="mt-2 text-muted-foreground">{album.description}</p>}

      <div className="mt-8">
        <PhotoGridLightbox photos={album.photos ?? []} />
      </div>
    </div>
  )
}
