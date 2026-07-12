import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Images, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { PaginationBar } from '@/components/shared/pagination-bar'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { ManageAlbumPhotosSheet } from '@/components/dashboard/manage-album-photos-sheet'
import { galleryAlbumsApi } from '@/api/admin-resources'
import type { GalleryAlbum } from '@/types'

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  description: z.string().optional(),
  cover_image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Album', type: 'text' },
  { name: 'cover_image', label: 'Cover Album', type: 'file', accept: 'image/*' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
]

const defaultValues: FormValues = { title: '', description: '' }

export function GalleryPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<GalleryAlbum | null>(null)
  const [managingPhotos, setManagingPhotos] = useState<GalleryAlbum | null>(null)

  const { data, isLoading } = galleryAlbumsApi.useList({ page })
  const createMutation = galleryAlbumsApi.useCreate()
  const updateMutation = galleryAlbumsApi.useUpdate()
  const removeMutation = galleryAlbumsApi.useRemove()

  const columns: DataTableColumn<GalleryAlbum>[] = [
    { key: 'title', header: 'Judul Album', render: (row) => row.title },
    { key: 'photos', header: 'Jumlah Foto', render: (row) => row.photos?.length ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Galeri</h1>
          <p className="text-muted-foreground">Kelola album dan foto galeri komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Album"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Album berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Album
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Album</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada album"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setManagingPhotos(row)}>
                  <Images className="size-4" /> Foto
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Album berhasil dihapus.')
                  }}
                />
              </>
            )}
          />
          {data?.meta && <PaginationBar meta={data.meta} onPageChange={setPage} />}
        </CardContent>
      </Card>

      {editing && (
        <ResourceFormDialog<FormValues>
          title="Edit Album"
          fields={fields}
          schema={schema}
          defaultValues={{ title: editing.title, description: editing.description ?? '' }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Album berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}

      <ManageAlbumPhotosSheet album={managingPhotos} onClose={() => setManagingPhotos(null)} />
    </div>
  )
}
