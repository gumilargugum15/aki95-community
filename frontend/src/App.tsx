import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/public-layout'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { ProtectedRoute } from '@/components/shared/protected-route'

import { HomePage } from '@/pages/public/home-page'
import { AboutPage } from '@/pages/public/about-page'
import { HistoryPage } from '@/pages/public/history-page'
import { VisionMissionPage } from '@/pages/public/vision-mission-page'
import { OrganizationPage } from '@/pages/public/organization-page'
import { TouringListPage } from '@/pages/public/touring-list-page'
import { TouringDetailPage } from '@/pages/public/touring-detail-page'
import { BaksosListPage } from '@/pages/public/baksos-list-page'
import { BaksosDetailPage } from '@/pages/public/baksos-detail-page'
import { GalleryPhotoPage } from '@/pages/public/gallery-photo-page'
import { GalleryAlbumDetailPage } from '@/pages/public/gallery-album-detail-page'
import { GalleryVideoPage } from '@/pages/public/gallery-video-page'
import { EventsPage } from '@/pages/public/events-page'
import { EventDetailPage } from '@/pages/public/event-detail-page'
import { NewsListPage } from '@/pages/public/news-list-page'
import { NewsDetailPage } from '@/pages/public/news-detail-page'
import { FaqPage } from '@/pages/public/faq-page'
import { ContactPage } from '@/pages/public/contact-page'

import { LoginPage } from '@/pages/auth/login-page'

import { DashboardHomePage } from '@/pages/dashboard/dashboard-home-page'
import { MembersPage } from '@/pages/dashboard/members-page'
import { TouringsPage } from '@/pages/dashboard/tourings-page'
import { BaksosPage } from '@/pages/dashboard/baksos-page'
import { GalleryPage } from '@/pages/dashboard/gallery-page'
import { VideosPage } from '@/pages/dashboard/videos-page'
import { NewsPage } from '@/pages/dashboard/news-page'
import { AgendaPage } from '@/pages/dashboard/agenda-page'
import { SponsorsPage } from '@/pages/dashboard/sponsors-page'
import { FaqsPage } from '@/pages/dashboard/faqs-page'
import { BannersPage } from '@/pages/dashboard/banners-page'
import { UsersPage } from '@/pages/dashboard/users-page'
import { SettingsPage } from '@/pages/dashboard/settings-page'

import { NotFoundPage } from '@/pages/not-found-page'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tentang-kami" element={<AboutPage />} />
        <Route path="sejarah" element={<HistoryPage />} />
        <Route path="visi-misi" element={<VisionMissionPage />} />
        <Route path="struktur-organisasi" element={<OrganizationPage />} />
        <Route path="touring" element={<TouringListPage />} />
        <Route path="touring/:slug" element={<TouringDetailPage />} />
        <Route path="bakti-sosial" element={<BaksosListPage />} />
        <Route path="bakti-sosial/:slug" element={<BaksosDetailPage />} />
        <Route path="galeri-foto" element={<GalleryPhotoPage />} />
        <Route path="galeri-foto/:slug" element={<GalleryAlbumDetailPage />} />
        <Route path="galeri-video" element={<GalleryVideoPage />} />
        <Route path="jadwal-kegiatan" element={<EventsPage />} />
        <Route path="jadwal-kegiatan/:slug" element={<EventDetailPage />} />
        <Route path="berita" element={<NewsListPage />} />
        <Route path="berita/:slug" element={<NewsDetailPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="kontak" element={<ContactPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />

      <Route element={<ProtectedRoute roles={['admin', 'pengurus']} />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="anggota" element={<MembersPage />} />
          <Route path="touring" element={<TouringsPage />} />
          <Route path="bakti-sosial" element={<BaksosPage />} />
          <Route path="galeri" element={<GalleryPage />} />
          <Route path="video" element={<VideosPage />} />
          <Route path="berita" element={<NewsPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="sponsor" element={<SponsorsPage />} />
          <Route path="faq" element={<FaqsPage />} />
          <Route path="banner" element={<BannersPage />} />

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="pengguna" element={<UsersPage />} />
            <Route path="pengaturan" element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
