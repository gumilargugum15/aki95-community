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
import { faqsApi } from '@/api/admin-resources'
import type { Faq } from '@/types'

const schema = z.object({
  question: z.string().min(5, 'Pertanyaan minimal 5 karakter'),
  answer: z.string().min(5, 'Jawaban minimal 5 karakter'),
  order: z.coerce.number().min(0).optional(),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

const fields: FieldConfig[] = [
  { name: 'question', label: 'Pertanyaan', type: 'text' },
  { name: 'answer', label: 'Jawaban', type: 'textarea' },
  { name: 'order', label: 'Urutan', type: 'number' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
]

const defaultValues: FormValues = { question: '', answer: '', order: 0, is_active: true }

export function FaqsPage() {
  const [editing, setEditing] = useState<Faq | null>(null)
  const { data, isLoading } = faqsApi.useList()
  const createMutation = faqsApi.useCreate()
  const updateMutation = faqsApi.useUpdate()
  const removeMutation = faqsApi.useRemove()

  const columns: DataTableColumn<Faq>[] = [
    { key: 'question', header: 'Pertanyaan', render: (row) => row.question },
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
          <h1 className="text-2xl font-bold tracking-tight">FAQ</h1>
          <p className="text-muted-foreground">Kelola pertanyaan yang sering diajukan.</p>
        </div>
        <ResourceFormDialog<FormValues>
          title="Tambah FAQ"
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values)
            toast.success('FAQ berhasil ditambahkan.')
          }}
          trigger={
            <Button>
              <Plus className="size-4" /> Tambah FAQ
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            rows={data?.data ?? []}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="Belum ada FAQ"
            actions={(row) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>
                  Edit
                </Button>
                <ConfirmDialog
                  onConfirm={async () => {
                    await removeMutation.mutateAsync(row.id)
                    toast.success('FAQ berhasil dihapus.')
                  }}
                />
              </>
            )}
          />
        </CardContent>
      </Card>

      {editing && (
        <ResourceFormDialog<FormValues>
          title="Edit FAQ"
          fields={fields}
          schema={schema}
          defaultValues={{
            question: editing.question,
            answer: editing.answer,
            order: editing.order,
            is_active: editing.is_active,
          }}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ id: editing.id, payload: values })
            toast.success('FAQ berhasil diperbarui.')
          }}
          trigger={<span />}
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
        />
      )}
    </div>
  )
}
