import { Outlet } from 'react-router-dom'
import { PublicNavbar } from '@/components/shared/public-navbar'
import { PublicFooter } from '@/components/shared/public-footer'

export function PublicLayout() {
  return (
    <div className="site flex min-h-svh flex-col bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
