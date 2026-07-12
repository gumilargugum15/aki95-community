import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { api } from '@/lib/axios'

interface SettingsForm {
  site_name: string
  about: string
  history: string
  vision: string
  mission: string
  address: string
  phone: string
  whatsapp: string
  email: string
  google_maps_embed: string
  instagram: string
  facebook: string
  youtube: string
}

export function SettingsPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => (await api.get<{ data: Record<string, string> }>('/admin/settings', { params: { group: 'site' } })).data.data,
  })

  const { register, handleSubmit, reset } = useForm<SettingsForm>()

  useEffect(() => {
    if (data) reset(data as unknown as SettingsForm)
  }, [data, reset])

  const mutation = useMutation({
    mutationFn: async (values: SettingsForm) => {
      await api.put('/admin/settings', { values, group: 'site' })
    },
    onSuccess: () => {
      toast.success('Pengaturan berhasil disimpan.')
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
      queryClient.invalidateQueries({ queryKey: ['public-settings'] })
    },
    onError: () => toast.error('Gagal menyimpan pengaturan.'),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola konten dan informasi umum website.</p>
      </div>

      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Konten Halaman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Situs</Label>
              <Input {...register('site_name')} />
            </div>
            <div className="space-y-2">
              <Label>Tentang Kami</Label>
              <Textarea rows={4} {...register('about')} />
            </div>
            <div className="space-y-2">
              <Label>Sejarah Komunitas</Label>
              <Textarea rows={4} {...register('history')} />
            </div>
            <div className="space-y-2">
              <Label>Visi</Label>
              <Textarea rows={3} {...register('vision')} />
            </div>
            <div className="space-y-2">
              <Label>Misi</Label>
              <Textarea rows={3} {...register('mission')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontak & Sosial Media</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Alamat</Label>
              <Textarea rows={2} {...register('address')} />
            </div>
            <div className="space-y-2">
              <Label>Telepon</Label>
              <Input {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp (format: 628xxxx)</Label>
              <Input {...register('whatsapp')} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Input {...register('google_maps_embed')} />
            </div>
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input {...register('instagram')} />
            </div>
            <div className="space-y-2">
              <Label>Facebook</Label>
              <Input {...register('facebook')} />
            </div>
            <div className="space-y-2">
              <Label>YouTube</Label>
              <Input {...register('youtube')} />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </form>
    </div>
  )
}
