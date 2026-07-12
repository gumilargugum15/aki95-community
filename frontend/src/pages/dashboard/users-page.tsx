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
import { usersApi } from '@/api/admin-resources'
import type { User } from '@/types'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Pengurus', value: 'pengurus' },
  { label: 'Member', value: 'member' },
]

const createSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  role: z.enum(['admin', 'pengurus', 'member']),
  phone: z.string().optional(),
  is_active: z.boolean(),
})

const updateSchema = createSchema.extend({ password: z.string().optional() })

type CreateValues = z.infer<typeof createSchema>
type UpdateValues = z.infer<typeof updateSchema>

const createFields: FieldConfig[] = [
  { name: 'name', label: 'Nama Lengkap', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'text' },
  { name: 'phone', label: 'No. HP', type: 'text' },
  { name: 'role', label: 'Role', type: 'select', options: roleOptions },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
]

const updateFields: FieldConfig[] = createFields.map((field) =>
  field.name === 'password' ? { ...field, label: 'Password (kosongkan jika tidak diubah)' } : field,
)

const defaultValues: CreateValues = { name: '', email: '', password: '', role: 'member', phone: '', is_active: true }

export function UsersPage() {
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<User | null>(null)

  const { data, isLoading } = usersApi.useList({ page })
  const createMutation = usersApi.useCreate()
  const updateMutation = usersApi.useUpdate()
  const removeMutation = usersApi.useRemove()

  const columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Nama', render: (row) => row.name },
    { key: 'email', header: 'Email', render: (row) => row.email },
    { key: 'role', header: 'Role', render: (row) => <Badge variant="outline" className="capitalize">{row.role}</Badge> },
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
          <h1 className="text-2xl font-bold tracking-tight">Pengguna</h1>
          <p className="text-muted-foreground">Kelola akun admin, pengurus, dan member.</p>
        </div>
        <ResourceFormDialog<CreateValues>
          title="Tambah Pengguna"
          fields={createFields}
          schema={createSchema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('Pengguna berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah Pengguna
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada pengguna"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('Pengguna berhasil dihapus.')
                  }}
                />
              </>
            )}
          />
          {data?.meta && <PaginationBar meta={data.meta} onPageChange={setPage} />}
        </CardContent>
      </Card>

      {editing && (
        <ResourceFormDialog<UpdateValues>
          title="Edit Pengguna"
          fields={updateFields}
          schema={updateSchema}
          defaultValues={{
            name: editing.name,
            email: editing.email,
            password: '',
            role: editing.role,
            phone: editing.phone ?? '',
            is_active: editing.is_active,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('Pengguna berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
