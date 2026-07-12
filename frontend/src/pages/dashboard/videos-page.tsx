import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { PaginationBar } from '@/components/shared/pagination-bar'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { videosApi } from '@/api/admin-resources'
import type { Video } from '@/types'

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  youtube_url: z.url('URL YouTube tidak valid'),
  description: z.string().optional(),
  thumbnail: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Video', type: 'text' },
  { name: 'youtube_url', label: 'URL YouTube', type: 'text', placeholder: 'https://youtube.com/watch?v=...' },
  { name: 'thumbnail', label: 'Thumbnail (opsional)', type: 'file', accept: 'image/*' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
]

const defaultValues: FormValues = { title: '', youtube_url: '', description: '' }

export function VideosPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Video | null>(null)

  const { data, isLoading } = videosApi.useList({ page })
  const createMutation = videosApi.useCreate()
  const updateMutation = videosApi.useUpdate()
  const removeMutation = videosApi.useRemove()

  const columns: DataTableColumn<Video>[] = [
    {
      key: 'thumbnail',
      header: '',
      className: 'w-20',
      render: (row) => (
        <div className="aspect-video w-16 overflow-hidden rounded bg-muted">
          {row.thumbnail && <img src={row.thumbnail} alt={row.title} className="size-full object-cover" />}
        </div>
      ),
    },
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'category', header: 'Kategori', render: (row) => row.category?.name ?? '-' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Video</h1>
          <p className="text-muted-foreground">Kelola video embed YouTube komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Video"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Video berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Video
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada video"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Video berhasil dihapus.')
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
          title="Edit Video"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            youtube_url: editing.youtube_url,
            description: editing.description ?? '',
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Video berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
