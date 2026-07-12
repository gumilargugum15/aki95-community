import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '@/components/shared/page-hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { submitContactMessage, useSiteSettings } from '@/api/public'

const schema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.email('Email tidak valid'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
})

type FormValues = z.infer<typeof schema>

export function ContactPage() {
  const { data: settings } = useSiteSettings()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  })

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      toast.success('Pesan berhasil dikirim. Kami akan segera merespons.')
      form.reset()
    },
    onError: () => toast.error('Gagal mengirim pesan. Silakan coba lagi.'),
  })

  return (
    <div>
      <PageHero title="Kontak" description="Hubungi Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 py-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="text-sm">{settings?.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-primary" />
                  <p className="text-sm">{settings?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-primary" />
                  <p className="text-sm">{settings?.phone}</p>
                </div>
                {settings?.whatsapp && (
                  <Button
                    className="w-full"
                    render={
                      <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-4" /> Chat via WhatsApp
                      </a>
                    }
                  />
                )}
              </CardContent>
            </Card>

            {settings?.google_maps_embed && (
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
                <iframe
                  src={settings.google_maps_embed}
                  title="Lokasi Sekretariat"
                  className="size-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <Card>
            <CardContent className="py-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama anda" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="nama@email.com" {...field} />
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
                        <FormLabel>No. HP (opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjek</FormLabel>
                        <FormControl>
                          <Input placeholder="Tentang apa pesan ini?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesan</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder="Tulis pesan anda..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={mutation.isPending} className="w-full">
                    {mutation.isPending ? 'Mengirim...' : 'Kirim Pesan'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
