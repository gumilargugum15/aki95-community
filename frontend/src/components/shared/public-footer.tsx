import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/shared/social-icons'
import { useSiteSettings, submitContactMessage } from '@/api/public'

const NAV_LINKS = [
  { to: '/tentang-kami', label: 'Tentang Kami' },
  { to: '/touring', label: 'Touring' },
  { to: '/bakti-sosial', label: 'Bakti Sosial' },
  { to: '/jadwal-kegiatan', label: 'Jadwal' },
  { to: '/berita', label: 'Berita' },
]

export function PublicFooter() {
  const { data: settings } = useSiteSettings()
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setSending(true)
    try {
      await submitContactMessage({
        name: 'Newsletter Subscriber',
        email,
        subject: 'Newsletter Subscription',
        message: `${email} ingin berlangganan update kegiatan & touring.`,
      })
      toast.success('Berhasil berlangganan newsletter.')
      setEmail('')
    } catch {
      toast.error('Gagal mendaftar newsletter, coba lagi.')
    } finally {
      setSending(false)
    }
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AKI Motor 95" className="size-9 shrink-0 rounded-full object-contain" />
            <span className="leading-tight">
              <span className="block text-sm font-extrabold tracking-tight uppercase">
                {settings?.site_name ?? 'AKI Motor 95'}
              </span>
              <span className="block text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Komunitas Nasional
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {settings?.about ?? 'Solid dalam Persaudaraan, Aman dalam Berkendara.'}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">Navigasi</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">Kontak</h3>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            {settings?.address && <p>Sekretariat: {settings.address}</p>}
            {settings?.email && <p>Email: {settings.email}</p>}
            {settings?.phone && <p>WA: {settings.phone}</p>}
          </div>
          <div className="mt-4 flex gap-2">
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="size-4" />
              </a>
            )}
            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <FacebookIcon className="size-4" />
              </a>
            )}
            {settings?.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <YoutubeIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">Newsletter</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Update kegiatan &amp; touring langsung ke email kamu.
          </p>
          <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
            <Input
              type="email"
              required
              placeholder="Email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={sending} aria-label="Kirim">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {settings?.site_name ?? 'Komunitas AKI Motor 95'}. Seluruh hak cipta
        dilindungi.
      </div>
    </footer>
  )
}
