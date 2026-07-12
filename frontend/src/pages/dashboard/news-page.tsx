import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { PaginationBar } from '@/components/shared/pagination-bar'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { newsApi } from '@/api/admin-resources'
import type { News } from '@/types'

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'Konten minimal 10 karakter'),
  status: z.enum(['draft', 'published']),
  tags: z.string().optional(),
  featured_image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Berita', type: 'text' },
  { name: 'featured_image', label: 'Featured Image', type: 'file', accept: 'image/*' },
  { name: 'excerpt', label: 'Ringkasan', type: 'textarea' },
  { name: 'content', label: 'Konten', type: 'textarea' },
  { name: 'tags', label: 'Tag (pisahkan dengan koma)', type: 'text', placeholder: 'kopdar, touring, akbar' },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions },
]

const defaultValues: FormValues = { title: '', excerpt: '', content: '', status: 'draft', tags: '' }

function toPayload(values: FormValues) {
  return {
    ...values,
    tags: values.tags
      ? values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
  }
}

export function NewsPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<News | null>(null)

  const { data, isLoading } = newsApi.useList({ page })
  const createMutation = newsApi.useCreate()
  const updateMutation = newsApi.useUpdate()
  const removeMutation = newsApi.useRemove()

  const columns: DataTableColumn<News>[] = [
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'category', header: 'Kategori', render: (row) => row.category?.name ?? '-' },
    { key: 'views', header: 'Views', render: (row) => row.views },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge variant={row.status === 'published' ? 'default' : 'outline'}>{row.status}</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Berita</h1>
          <p className="text-muted-foreground">Kelola berita dan artikel komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Berita"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(toPayload(values))
            toast.success('Berita berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Berita
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada berita"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Berita berhasil dihapus.')
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
          title="Edit Berita"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            excerpt: editing.excerpt ?? '',
            content: editing.content,
            status: editing.status,
            tags: editing.tags?.map((tag) => tag.name).join(', ') ?? '',
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: toPayload(values) })
            toast.success('Berita berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
