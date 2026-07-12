import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { PaginationBar } from '@/components/shared/pagination-bar'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { EmptyState } from '@/components/shared/empty-state'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { eventsApi } from '@/api/admin-resources'
import { api } from '@/lib/axios'
import type { EventItem, PaginatedResponse, EventRegistration } from '@/types'

const statusOptions = [
  { label: 'Akan Datang', value: 'upcoming' },
  { label: 'Berlangsung', value: 'ongoing' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

const schema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  location: z.string().min(3, 'Lokasi wajib diisi'),
  start_date: z.string().min(1, 'Tanggal wajib diisi'),
  start_time: z.string().optional(),
  description: z.string().optional(),
  quota: z.coerce.number().min(1).optional(),
  registration_required: z.boolean(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
  cover_image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'title', label: 'Judul Agenda', type: 'text' },
  { name: 'cover_image', label: 'Cover Image', type: 'file', accept: 'image/*' },
  { name: 'location', label: 'Lokasi', type: 'text' },
  { name: 'start_date', label: 'Tanggal', type: 'date' },
  { name: 'start_time', label: 'Jam', type: 'time' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'quota', label: 'Kuota Peserta', type: 'number' },
  { name: 'registration_required', label: 'Butuh Pendaftaran', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions },
]

const defaultValues: FormValues = {
  title: '',
  location: '',
  start_date: '',
  start_time: '',
  description: '',
  quota: undefined,
  registration_required: false,
  status: 'upcoming',
}

function RegistrationsSheet({ event, onClose }: { event: EventItem | null; onClose: () => void }) {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-event-registrations', event?.id],
    queryFn: async () =>
      (await api.get<PaginatedResponse<EventRegistration>>(`/admin/events/${event!.id}/registrations`)).data,
    enabled: !!event,
  })

  return (
    <Sheet open={!!event} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Peserta - {event?.title}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4 pb-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : !data?.data.length ? (
            <EmptyState title="Belum ada peserta terdaftar" />
          ) : (
            data.data.map((registration) => (
              <div key={registration.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{registration.name}</p>
                <p className="text-sm text-muted-foreground">{registration.phone}</p>
                {registration.motor_type && (
                  <p className="text-sm text-muted-foreground">{registration.motor_type}</p>
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function AgendaPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [viewingRegistrations, setViewingRegistrations] = useState<EventItem | null>(null)

  const { data, isLoading } = eventsApi.useList({ page })
  const createMutation = eventsApi.useCreate()
  const updateMutation = eventsApi.useUpdate()
  const removeMutation = eventsApi.useRemove()

  const columns: DataTableColumn<EventItem>[] = [
    { key: 'title', header: 'Judul', render: (row) => row.title },
    { key: 'location', header: 'Lokasi', render: (row) => row.location },
    { key: 'start_date', header: 'Tanggal', render: (row) => new Date(row.start_date).toLocaleDateString('id-ID') },
    {
      key: 'registration_required',
      header: 'Pendaftaran',
      render: (row) => (row.registration_required ? <Badge>{row.registrations_count ?? 0} peserta</Badge> : '-'),
    },
    { key: 'status', header: 'Status', render: (row) => <Badge variant="outline">{row.status}</Badge> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">Kelola jadwal kegiatan komunitas.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Agenda"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Agenda berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Agenda
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Agenda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada agenda"
            actions={(row) => (
              <>
                {row.registration_required && (
                  <Button variant="ghost" size="sm" onClick={() => setViewingRegistrations(row)}>
                    <Users className="size-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Agenda berhasil dihapus.')
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
          title="Edit Agenda"
          fields={fields}
          schema={schema}
          defaultValues={{
            title: editing.title,
            location: editing.location,
            start_date: editing.start_date,
            start_time: editing.start_time ?? '',
            description: editing.description ?? '',
            quota: editing.quota ?? undefined,
            registration_required: editing.registration_required,
            status: editing.status,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Agenda berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}

      <RegistrationsSheet event={viewingRegistrations} onClose={() => setViewingRegistrations(null)} />
    </div>
  )
}
