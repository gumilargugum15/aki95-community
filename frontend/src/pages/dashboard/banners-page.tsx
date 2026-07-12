import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { bannersApi } from '@/api/admin-resources'
import type { Banner } from '@/types'

const positionOptions = [
  { label: 'Hero Beranda', value: 'home_hero' },
  { label: 'Sekunder Beranda', value: 'home_secondary' },
]

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  link_url: z.string().optional(),
  position: z.enum(['home_hero', 'home_secondary']),
  order: z.coerce.number().min(0).optional(),
  is_active: z.boolean(),
  image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Banner', type: 'text' },
  { name: 'image', label: 'Gambar Banner', type: 'file', accept: 'image/*' },
  { name: 'link_url', label: 'Link Tujuan', type: 'text', placeholder: 'https://...' },
  { name: 'position', label: 'Posisi', type: 'select', options: positionOptions },
  { name: 'order', label: 'Urutan', type: 'number' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
]

const defaultValues: FormValues = { title: '', link_url: '', position: 'home_hero', order: 0, is_active: true }

export function BannersPage() {
  const [editing, setEditing] = useState<Banner | null>(null)
  const { data, isLoading } = bannersApi.useList()
  const createMutation = bannersApi.useCreate()
  const updateMutation = bannersApi.useUpdate()
  const removeMutation = bannersApi.useRemove()

  const columns: DataTableColumn<Banner>[] = [
    {
      key: 'image',
      header: '',
      className: 'w-24',
      render: (row) => (
        <div className="aspect-video w-20 overflow-hidden rounded bg-muted">
          <img src={row.image} alt={row.title} className="size-full object-cover" />
        </div>
      ),
    },
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'position', header: 'Posisi', render: (row) => row.position },
    {
      key: 'is_active',
      header: 'Status',
      render: (row) => <Badge variant={row.is_active ? 'default' : 'outline'}>{row.is_active ? 'Aktif' : 'Nonaktif'}</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banner</h1>
          <p className="text-muted-foreground">Kelola banner beranda website.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Banner"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Banner berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Banner
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada banner"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Banner berhasil dihapus.')
                  }}
                />
              </>
            )}
          />
        </CardContent>
      </Card>

      {editing && (
        <ResourceFormDialog<FormValues>
          title="Edit Banner"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            link_url: editing.link_url ?? '',
            position: editing.position,
            order: editing.order,
            is_active: editing.is_active,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Banner berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
