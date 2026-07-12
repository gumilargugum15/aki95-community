import { useParams, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, CalendarDays, MapPin, Users } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useEvent, registerForEvent } from '@/api/public'

const schema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  phone: z.string().min(8, 'Nomor HP tidak valid'),
  email: z.email('Email tidak valid').optional().or(z.literal('')),
  motor_type: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function EventDetailPage() {
  const { slug } = useParams()
  const { data: event, isLoading } = useEvent(slug)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', motor_type: '' },
  })

  const register = useMutation({
    mutationFn: (values: FormValues) => registerForEvent(slug!, values),
    onSuccess: () => {
      toast.success('Pendaftaran berhasil! Sampai jumpa di acara.')
      form.reset()
    },
    onError: () => toast.error('Pendaftaran gagal. Silakan coba lagi.'),
  })

  if (isLoading) return <LoadingSpinner className="py-32" />
  if (!event) return null

  const isFull = event.quota !== null && (event.registrations_count ?? 0) >= event.quota

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2"
        render={
          <Link to="/jadwal-kegiatan">
            <ArrowLeft className="size-4" /> Kembali
          </Link>
        }
      />

      {event.cover_image && (
        <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img src={event.cover_image} alt={event.title} className="size-full object-cover" />
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4" />
          {new Date(event.start_date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
          {event.start_time && ` · ${event.start_time}`}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4" /> {event.location}
        </span>
        {event.quota && (
          <span className="flex items-center gap-1.5">
            <Users className="size-4" /> {event.registrations_count ?? 0}/{event.quota} peserta
          </span>
        )}
      </div>

      {event.description && <p className="mt-6 whitespace-pre-line text-muted-foreground">{event.description}</p>}

      {event.registration_required && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Formulir Pendaftaran</CardTitle>
          </CardHeader>
          <CardContent>
            {isFull ? (
              <p className="text-sm text-muted-foreground">Kuota peserta sudah penuh.</p>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) => register.mutate(values))}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. HP / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (opsional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="nama@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motor_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe Motor (opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Honda Astrea Grand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={register.isPending} className="w-full">
                    {register.isPending ? 'Mengirim...' : 'Daftar Sekarang'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
