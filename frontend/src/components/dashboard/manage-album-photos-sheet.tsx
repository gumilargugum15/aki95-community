import { useRef } from 'react'
import { toast } from 'sonner'
import { Trash2, Upload } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { api } from '@/lib/axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ApiResource, GalleryAlbum } from '@/types'

interface ManageAlbumPhotosSheetProps {
  album: GalleryAlbum | null
  onClose: () => void
}

export function ManageAlbumPhotosSheet({ album, onClose }: ManageAlbumPhotosSheetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-gallery-albums', 'detail', album?.id],
    queryFn: async () =>
      (await api.get<ApiResource<GalleryAlbum>>(`/admin/gallery/albums/${album!.id}`)).data.data,
    enabled: !!album,
  })

  async function handleUpload(files: FileList | null) {
    if (!files?.length || !album) return

    const form = new FormData()
    Array.from(files).forEach((file) => form.append('photos[]', file))

    try {
      await api.post(`/admin/gallery/albums/${album.id}/photos`, form)
      toast.success('Foto berhasil diunggah.')
      queryClient.invalidateQueries({ queryKey: ['admin-gallery-albums'] })
    } catch {
      toast.error('Gagal mengunggah foto.')
    }
  }

  async function handleDelete(photoId: number) {
    if (!album) return

    try {
      await api.delete(`/admin/gallery/albums/${album.id}/photos/${photoId}`)
      toast.success('Foto berhasil dihapus.')
      queryClient.invalidateQueries({ queryKey: ['admin-gallery-albums'] })
    } catch {
      toast.error('Gagal menghapus foto.')
    }
  }

  return (
    <Sheet open={!!album} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Kelola Foto - {album?.title}</SheetTitle>
          <SheetDescription>Unggah dan kelola foto dalam album ini.</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleUpload(e.target.files)}
          />
          <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4" /> Unggah Foto
          </Button>

          {isLoading ? (
            <LoadingSpinner />
          ) : !data?.photos?.length ? (
            <EmptyState title="Belum ada foto" />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
                  <img src={photo.photo_url} alt={photo.caption ?? ''} className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDelete(photo.id)}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
