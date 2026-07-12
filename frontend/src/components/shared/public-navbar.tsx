import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bike, Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tentang-kami', label: 'Tentang' },
  { to: '/touring', label: 'Touring' },
  { to: '/bakti-sosial', label: 'Bakti Sosial' },
  { to: '/jadwal-kegiatan', label: 'Jadwal' },
  { to: '/galeri-foto', label: 'Galeri' },
  { to: '/galeri-video', label: 'Video' },
  { to: '/berita', label: 'Berita' },
  { to: '/faq', label: 'FAQ' },
  { to: '/kontak', label: 'Kontak' },
]

export function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const user = useAuthStore((state) => state.user)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
            <Bike className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight uppercase">
              AKI Motor <span className="text-primary">95</span>
            </span>
            <span className="block text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Komunitas Nasional
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground',
                  isActive &&
                    'text-primary after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:bg-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="hidden sm:inline-flex" aria-label="Cari">
            <Search className="size-4" />
          </Button>
          <ThemeToggle />
          <Button
            className="hidden sm:inline-flex font-bold uppercase"
            render={<Link to={user ? '/dashboard' : '/login'}>{user ? 'Dashboard' : 'Gabung'}</Link>}
          />
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                    isActive && 'bg-muted text-primary',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              className="mt-2 font-bold uppercase"
              render={<Link to={user ? '/dashboard' : '/login'}>{user ? 'Dashboard' : 'Gabung'}</Link>}
            />
          </div>
        </nav>
      )}
    </header>
  )
}
