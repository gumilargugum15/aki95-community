import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, type DataTableColumn } from '@/components/shared/data-table'
import { PaginationBar } from '@/components/shared/pagination-bar'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ResourceFormDialog, type FieldConfig } from '@/components/shared/resource-form-dialog'
import { membersApi } from '@/api/admin-resources'
import type { Member } from '@/types'

const schema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().optional(),
  phone: z.string().optional(),
  regional: z.string().min(2, 'Regional wajib diisi'),
  motor_type: z.string().min(2, 'Tipe motor wajib diisi'),
  motor_year: z.string().optional(),
  join_year: z.coerce.number().min(1990),
  is_active: z.boolean(),
  address: z.string().optional(),
  bio: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'name', label: 'Nama Lengkap', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'No. HP', type: 'text' },
  { name: 'regional', label: 'Regional', type: 'text' },
  { name: 'motor_type', label: 'Tipe Motor', type: 'text' },
  { name: 'motor_year', label: 'Tahun Motor', type: 'text' },
  { name: 'join_year', label: 'Tahun Bergabung', type: 'number' },
  { name: 'is_active', label: 'Status Aktif', type: 'checkbox' },
  { name: 'address', label: 'Alamat', type: 'textarea' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
]

const defaultValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  regional: '',
  motor_type: '',
  motor_year: '',
  join_year: new Date().getFullYear(),
  is_active: true,
  address: '',
  bio: '',
}

export function MembersPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Member | null>(null)

  const { data, isLoading } = membersApi.useList({ page, search: search || undefined })
  const createMutation = membersApi.useCreate()
  const updateMutation = membersApi.useUpdate()
  const removeMutation = membersApi.useRemove()

  const columns: DataTableColumn<Member>[] = [
    { key: 'member_number', header: 'No. Anggota', render: (row) => row.member_number },
    { key: 'name', header: 'Nama', render: (row) => row.name },
    { key: 'regional', header: 'Regional', render: (row) => row.regional },
    { key: 'motor_type', header: 'Motor', render: (row) => row.motor_type },
    { key: 'join_year', header: 'Bergabung', render: (row) => row.join_year },
    {
      key: 'is_active',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.is_active ? 'default' : 'outline'}>{row.is_active ? 'Aktif' : 'Nonaktif'}</Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Anggota</h1>
          <p className="text-muted-foreground">Kelola data anggota Komunitas AKI Motor 95.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah Anggota"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Anggota berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Anggota
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daftar Anggota</span>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Cari anggota..."
                className="pl-8"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada anggota"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Anggota berhasil dihapus.')
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
          title="Edit Anggota"
          fields={fields}
          schema={schema}
          defaultValues={{
            name: editing.name,
            email: editing.email ?? '',
            phone: editing.phone ?? '',
            regional: editing.regional,
            motor_type: editing.motor_type,
            motor_year: editing.motor_year ?? '',
            join_year: editing.join_year,
            is_active: editing.is_active,
            address: editing.address ?? '',
            bio: editing.bio ?? '',
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Anggota berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
