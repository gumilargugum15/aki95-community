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
import { touringsApi } from '@/api/admin-resources'
import type { Touring } from '@/types'

const statusOptions = [
  { label: 'Akan Datang', value: 'upcoming' },
  { label: 'Berlangsung', value: 'ongoing' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  location: z.string().min(3, 'Lokasi wajib diisi'),
  start_date: z.string().min(1, 'Tanggal mulai wajib diisi'),
  end_date: z.string().optional(),
  route: z.string().optional(),
  description: z.string().optional(),
  participant_count: z.coerce.number().min(0).optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
  cover_image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Touring', type: 'text' },
  { name: 'cover_image', label: 'Cover Image', type: 'file', accept: 'image/*' },
  { name: 'location', label: 'Lokasi', type: 'text' },
  { name: 'start_date', label: 'Tanggal Mulai', type: 'date' },
  { name: 'end_date', label: 'Tanggal Selesai', type: 'date' },
  { name: 'route', label: 'Rute', type: 'textarea' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'participant_count', label: 'Jumlah Peserta', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions },
]

const defaultValues: FormValues = {
  title: '',
  location: '',
  start_date: '',
  end_date: '',
  route: '',
  description: '',
  participant_count: 0,
  status: 'upcoming',
}

export function TouringsPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Touring | null>(null)

  const { data, isLoading } = touringsApi.useList({ page })
  const createMutation = touringsApi.useCreate()
  const updateMutation = touringsApi.useUpdate()
  const removeMutation = touringsApi.useRemove()

  const columns: DataTableColumn<Touring>[] = [
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'location', header: 'Lokasi', render: (row) => row.location },
    { key: 'start_date', header: 'Tanggal', render: (row) => new Date(row.start_date).toLocaleDateString('id-ID') },
    { key: 'participant_count', header: 'Peserta', render: (row) => row.participant_count },
    { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Touring</h1>
          <p className="text-muted-foreground">Kelola kegiatan touring komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Touring"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Touring berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Touring
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Touring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada touring"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Touring berhasil dihapus.')
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
          title="Edit Touring"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            location: editing.location,
            start_date: editing.start_date,
            end_date: editing.end_date ?? '',
            route: editing.route ?? '',
            description: editing.description ?? '',
            participant_count: editing.participant_count,
            status: editing.status,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Touring berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
