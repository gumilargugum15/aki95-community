import { createApiResource } from '@/hooks/use-api-resource'
import type {
  Banner,
  Baksos,
  Category,
  ContactMessage,
  EventItem,
  EventRegistration,
  Faq,
  GalleryAlbum,
  GalleryPhoto,
  Member,
  News,
  OrganizationMember,
  Sponsor,
  Touring,
  User,
  Video,
} from '@/types'

/** Payload variant of a resource where image/file fields accept a `File` for upload instead of the stored URL string. */
type WithFileFields<T, K extends keyof T> = Omit<Partial<T>, K> & { [P in K]?: File }

export const membersApi = createApiResource<Member, WithFileFields<Member, 'photo'>>(
  'admin-members',
  '/admin/members',
)
export const touringsApi = createApiResource<Touring, WithFileFields<Touring, 'cover_image'>>(
  'admin-tourings',
  '/admin/tourings',
)
export interface BaksosPayload
  extends Omit<WithFileFields<Baksos, 'cover_image'>, 'donation_target' | 'donation_collected'> {
  donation_target?: number
  donation_collected?: number
}

export const baksosApi = createApiResource<Baksos, BaksosPayload>('admin-baksos', '/admin/baksos')
export const galleryAlbumsApi = createApiResource<GalleryAlbum, WithFileFields<GalleryAlbum, 'cover_image'>>(
  'admin-gallery-albums',
  '/admin/gallery/albums',
)
export const videosApi = createApiResource<Video, WithFileFields<Video, 'thumbnail'>>(
  'admin-videos',
  '/admin/videos',
)
export const categoriesApi = createApiResource<Category>('admin-categories', '/admin/categories')

export interface NewsPayload extends Omit<WithFileFields<News, 'featured_image'>, 'tags' | 'category'> {
  tags?: string[]
  category_id?: number
}

export const newsApi = createApiResource<News, NewsPayload>('admin-news', '/admin/news')
export const eventsApi = createApiResource<EventItem, WithFileFields<EventItem, 'cover_image'>>(
  'admin-events',
  '/admin/events',
)
export const sponsorsApi = createApiResource<Sponsor, WithFileFields<Sponsor, 'logo'>>(
  'admin-sponsors',
  '/admin/sponsors',
)
export const faqsApi = createApiResource<Faq>('admin-faqs', '/admin/faqs')
export const bannersApi = createApiResource<Banner, WithFileFields<Banner, 'image'>>(
  'admin-banners',
  '/admin/banners',
)
export const contactMessagesApi = createApiResource<ContactMessage>('admin-contact-messages', '/admin/contact-messages')
export const organizationMembersApi = createApiResource<OrganizationMember, WithFileFields<OrganizationMember, 'photo'>>(
  'admin-organization-members',
  '/admin/organization-members',
)
export const usersApi = createApiResource<User, WithFileFields<User, 'avatar'>>('admin-users', '/admin/users')

export type { EventRegistration, GalleryPhoto }
