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
import { sponsorsApi } from '@/api/admin-resources'
import type { Sponsor } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  website: z.string().optional(),
  description: z.string().optional(),
  order: z.coerce.number().min(0).optional(),
  is_active: z.boolean(),
  logo: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'name', label: 'Nama Sponsor', type: 'text' },
  { name: 'logo', label: 'Logo', type: 'file', accept: 'image/*' },
  { name: 'website', label: 'Website', type: 'text', placeholder: 'https://...' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'order', label: 'Urutan', type: 'number' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
]

const defaultValues: FormValues = { name: '', website: '', description: '', order: 0, is_active: true }

export function SponsorsPage() {
  const [editing, setEditing] = useState<Sponsor | null>(null)
  const { data, isLoading } = sponsorsApi.useList()
  const createMutation = sponsorsApi.useCreate()
  const updateMutation = sponsorsApi.useUpdate()
  const removeMutation = sponsorsApi.useRemove()

  const columns: DataTableColumn<Sponsor>[] = [
    {
      key: 'logo',
      header: '',
      className: 'w-20',
      render: (row) => (
        <div className="flex size-12 items-center justify-center overflow-hidden rounded bg-muted">
          <img src={row.logo} alt={row.name} className="max-h-full max-w-full object-contain" />
        </div>
      ),
    },
    { key: 'name', header: 'Nama', render: (row) => row.name },
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
          <h1 className="text-2xl font-bold tracking-tight">Sponsor</h1>
          <p className="text-muted-foreground">Kelola sponsor dan mitra komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Sponsor"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Sponsor berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Sponsor
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Sponsor</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada sponsor"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Sponsor berhasil dihapus.')
                  }}
                />
              </>
            )}
          />
        </CardContent>
      </Card>

      {editing && (
        <ResourceFormDialog<FormValues>
          title="Edit Sponsor"
          fields={fields}
          schema={schema}
          defaultValues={{
            name: editing.name,
            website: editing.website ?? '',
            description: editing.description ?? '',
            order: editing.order,
            is_active: editing.is_active,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Sponsor berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
