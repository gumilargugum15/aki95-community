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
import { baksosApi } from '@/api/admin-resources'
import type { Baksos } from '@/types'

const statusOptions = [
  { label: 'Akan Datang', value: 'upcoming' },
  { label: 'Berlangsung', value: 'ongoing' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  location: z.string().min(3, 'Lokasi wajib diisi'),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  description: z.string().optional(),
  donation_target: z.coerce.number().min(0).optional(),
  donation_collected: z.coerce.number().min(0).optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
  cover_image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Kegiatan', type: 'text' },
  { name: 'cover_image', label: 'Dokumentasi (Cover)', type: 'file', accept: 'image/*' },
  { name: 'location', label: 'Lokasi', type: 'text' },
  { name: 'date', label: 'Tanggal', type: 'date' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'donation_target', label: 'Target Donasi (Rp)', type: 'number' },
  { name: 'donation_collected', label: 'Donasi Terkumpul (Rp)', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions },
]

const defaultValues: FormValues = {
  title: '',
  location: '',
  date: '',
  description: '',
  donation_target: 0,
  donation_collected: 0,
  status: 'upcoming',
}

export function BaksosPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Baksos | null>(null)

  const { data, isLoading } = baksosApi.useList({ page })
  const createMutation = baksosApi.useCreate()
  const updateMutation = baksosApi.useUpdate()
  const removeMutation = baksosApi.useRemove()

  const columns: DataTableColumn<Baksos>[] = [
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'location', header: 'Lokasi', render: (row) => row.location },
    { key: 'date', header: 'Tanggal', render: (row) => new Date(row.date).toLocaleDateString('id-ID') },
    { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bakti Sosial</h1>
          <p className="text-muted-foreground">Kelola kegiatan bakti sosial komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Bakti Sosial"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Kegiatan berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Kegiatan
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kegiatan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada kegiatan bakti sosial"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Kegiatan berhasil dihapus.')
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
          title="Edit Bakti Sosial"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            location: editing.location,
            date: editing.date,
            description: editing.description ?? '',
            donation_target: editing.donation_target ? Number(editing.donation_target) : 0,
            donation_collected: editing.donation_collected ? Number(editing.donation_collected) : 0,
            status: editing.status,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Kegiatan berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
