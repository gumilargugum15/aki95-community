import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type {
  ApiCollection,
  ApiResource,
  Baksos,
  Banner,
  Category,
  CategoryType,
  DashboardStats,
  EventItem,
  EventRegistration,
  Faq,
  GalleryAlbum,
  News,
  OrganizationMember,
  PaginatedResponse,
  Sponsor,
  Touring,
  Video,
} from '@/types'

type Params = Record<string, string | number | boolean | undefined>

export function useCategories(type: CategoryType) {
  return useQuery({
    queryKey: ['public-categories', type],
    queryFn: async () => (await api.get<ApiCollection<Category>>('/categories', { params: { type } })).data.data,
    staleTime: 5 * 60_000,
  })
}

export function useTourings(params: Params = {}) {
  return useQuery({
    queryKey: ['public-tourings', params],
    queryFn: async () => (await api.get<PaginatedResponse<Touring>>('/tourings', { params })).data,
  })
}

export function useTouring(slug: string | undefined) {
  return useQuery({
    queryKey: ['public-touring', slug],
    queryFn: async () => (await api.get<ApiResource<Touring>>(`/tourings/${slug}`)).data.data,
    enabled: !!slug,
  })
}

export function useBaksosList(params: Params = {}) {
  return useQuery({
    queryKey: ['public-baksos', params],
    queryFn: async () => (await api.get<PaginatedResponse<Baksos>>('/baksos', { params })).data,
  })
}

export function useBaksos(slug: string | undefined) {
  return useQuery({
    queryKey: ['public-baksos-detail', slug],
    queryFn: async () => (await api.get<ApiResource<Baksos>>(`/baksos/${slug}`)).data.data,
    enabled: !!slug,
  })
}

export function useGalleryAlbums(params: Params = {}) {
  return useQuery({
    queryKey: ['public-gallery-albums', params],
    queryFn: async () => (await api.get<PaginatedResponse<GalleryAlbum>>('/gallery/albums', { params })).data,
  })
}

export function useGalleryAlbum(slug: string | undefined) {
  return useQuery({
    queryKey: ['public-gallery-album', slug],
    queryFn: async () => (await api.get<ApiResource<GalleryAlbum>>(`/gallery/albums/${slug}`)).data.data,
    enabled: !!slug,
  })
}

export function useVideos(params: Params = {}) {
  return useQuery({
    queryKey: ['public-videos', params],
    queryFn: async () => (await api.get<PaginatedResponse<Video>>('/videos', { params })).data,
  })
}

export function useNewsList(params: Params = {}) {
  return useQuery({
    queryKey: ['public-news', params],
    queryFn: async () => (await api.get<PaginatedResponse<News>>('/news', { params })).data,
  })
}

export function useNewsDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ['public-news-detail', slug],
    queryFn: async () => (await api.get<ApiResource<News>>(`/news/${slug}`)).data.data,
    enabled: !!slug,
  })
}

export function useEvents(params: Params = {}) {
  return useQuery({
    queryKey: ['public-events', params],
    queryFn: async () => (await api.get<PaginatedResponse<EventItem>>('/events', { params })).data,
  })
}

export function useEvent(slug: string | undefined) {
  return useQuery({
    queryKey: ['public-event', slug],
    queryFn: async () => (await api.get<ApiResource<EventItem>>(`/events/${slug}`)).data.data,
    enabled: !!slug,
  })
}

export async function registerForEvent(slug: string, payload: Partial<EventRegistration>) {
  const { data } = await api.post<ApiResource<EventRegistration>>(`/events/${slug}/register`, payload)
  return data.data
}

export function useSponsors() {
  return useQuery({
    queryKey: ['public-sponsors'],
    queryFn: async () => (await api.get<ApiCollection<Sponsor>>('/sponsors')).data.data,
  })
}

export function useFaqs() {
  return useQuery({
    queryKey: ['public-faqs'],
    queryFn: async () => (await api.get<ApiCollection<Faq>>('/faqs')).data.data,
  })
}

export function useBanners(position?: string) {
  return useQuery({
    queryKey: ['public-banners', position],
    queryFn: async () =>
      (await api.get<ApiCollection<Banner>>('/banners', { params: { position } })).data.data,
  })
}

export function useOrganizationMembers() {
  return useQuery({
    queryKey: ['public-organization-members'],
    queryFn: async () => (await api.get<ApiCollection<OrganizationMember>>('/organization-members')).data.data,
  })
}

export function usePublicStats() {
  return useQuery({
    queryKey: ['public-stats'],
    queryFn: async () => (await api.get<ApiResource<DashboardStats>>('/stats')).data.data,
    staleTime: 5 * 60_000,
  })
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['public-settings'],
    queryFn: async () => (await api.get<{ data: Record<string, string> }>('/settings')).data.data,
    staleTime: 5 * 60_000,
  })
}

export async function submitContactMessage(payload: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const { data } = await api.post('/contact', payload)
  return data
}
