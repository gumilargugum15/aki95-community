import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { GalleryPhoto } from '@/types'

export function PhotoGridLightbox({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState(-1)

  if (!photos.length) return null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setIndex(i)}
            className="group aspect-square overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={photo.photo_url}
              alt={photo.caption ?? ''}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map((photo) => ({ src: photo.photo_url, description: photo.caption ?? undefined }))}
      />
    </>
  )
}
