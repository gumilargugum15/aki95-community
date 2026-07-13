import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Bike,
  HeartHandshake,
  Images,
  Video,
  Newspaper,
  CalendarDays,
  Handshake,
  HelpCircle,
  GalleryHorizontalEnd,
  UserCog,
  Settings,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth-store'
import { useHandleLogout } from '@/api/auth'

const MENU = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/anggota', label: 'Anggota', icon: Users, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/touring', label: 'Touring', icon: Bike, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/bakti-sosial', label: 'Bakti Sosial', icon: HeartHandshake, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/galeri', label: 'Galeri', icon: Images, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/video', label: 'Video', icon: Video, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/berita', label: 'Berita', icon: Newspaper, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/agenda', label: 'Agenda', icon: CalendarDays, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/sponsor', label: 'Sponsor', icon: Handshake, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/faq', label: 'FAQ', icon: HelpCircle, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/banner', label: 'Banner', icon: GalleryHorizontalEnd, roles: ['admin', 'pengurus'] },
  { to: '/dashboard/pengguna', label: 'Pengguna', icon: UserCog, roles: ['admin'] },
  { to: '/dashboard/pengaturan', label: 'Pengaturan', icon: Settings, roles: ['admin'] },
]

export function DashboardSidebar() {
  const location = useLocation()
  const role = useAuthStore((state) => state.user?.role)
  const { handleLogout, isPending } = useHandleLogout()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1.5 font-semibold tracking-tight">
          <img src="/logo.png" alt="AKI Motor 95" className="size-7 shrink-0 rounded-lg object-contain" />
          <span className="truncate group-data-[collapsible=icon]:hidden">AKI Motor 95</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU.filter((item) => !role || item.roles.includes(role)).map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                    render={
                      <Link to={item.to}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              disabled={isPending}
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut />
              <span>{isPending ? 'Logging out...' : 'Logout'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
