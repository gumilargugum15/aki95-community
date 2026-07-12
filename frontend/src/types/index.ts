export type Role = 'admin' | 'pengurus' | 'member'

export interface User {
  id: number
  name: string
  email: string
  role: Role
  phone: string | null
  avatar: string | null
  is_active: boolean
  created_at: string
}

export interface Member {
  id: number
  user_id: number | null
  member_number: string
  name: string
  email: string | null
  phone: string | null
  regional: string
  motor_type: string
  motor_year: string | null
  join_year: number
  is_active: boolean
  address: string | null
  photo: string | null
  bio: string | null
  created_at: string
}

export type CategoryType = 'gallery' | 'video' | 'news'

export interface Category {
  id: number
  type: CategoryType
  name: string
  slug: string
  description: string | null
}

export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface Touring {
  id: number
  title: string
  slug: string
  cover_image: string | null
  location: string
  start_date: string
  end_date: string | null
  route: string | null
  description: string | null
  participant_count: number
  status: ActivityStatus
  creator?: User
  gallery_albums?: GalleryAlbum[]
  videos?: Video[]
  created_at: string
}

export interface Baksos {
  id: number
  title: string
  slug: string
  cover_image: string | null
  location: string
  date: string
  description: string | null
  donation_target: string | null
  donation_collected: string | null
  status: ActivityStatus
  creator?: User
  gallery_albums?: GalleryAlbum[]
  videos?: Video[]
  created_at: string
}

export interface GalleryPhoto {
  id: number
  album_id: number
  photo_url: string
  caption: string | null
  order: number
}

export interface GalleryAlbum {
  id: number
  category?: Category
  touring_id: number | null
  baksos_id: number | null
  title: string
  slug: string
  cover_image: string | null
  description: string | null
  photos?: GalleryPhoto[]
  created_at: string
}

export interface Video {
  id: number
  category?: Category
  touring_id: number | null
  baksos_id: number | null
  title: string
  youtube_url: string
  thumbnail: string | null
  description: string | null
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export type NewsStatus = 'draft' | 'published'

export interface News {
  id: number
  category?: Category
  author?: User
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  status: NewsStatus
  published_at: string | null
  views: number
  tags?: Tag[]
  created_at: string
}

export interface EventItem {
  id: number
  title: string
  slug: string
  cover_image: string | null
  description: string | null
  location: string
  start_date: string
  start_time: string | null
  end_date: string | null
  end_time: string | null
  quota: number | null
  registration_required: boolean
  status: ActivityStatus
  registrations_count?: number
  created_at: string
}

export type EventRegistrationStatus = 'registered' | 'confirmed' | 'cancelled'

export interface EventRegistration {
  id: number
  event_id: number
  member_id: number | null
  name: string
  phone: string
  email: string | null
  motor_type: string | null
  status: EventRegistrationStatus
  created_at: string
}

export interface Sponsor {
  id: number
  name: string
  logo: string
  website: string | null
  description: string | null
  order: number
  is_active: boolean
}

export interface Faq {
  id: number
  question: string
  answer: string
  order: number
  is_active: boolean
}

export type BannerPosition = 'home_hero' | 'home_secondary'

export interface Banner {
  id: number
  title: string
  image: string
  link_url: string | null
  position: BannerPosition
  order: number
  is_active: boolean
  start_date: string | null
  end_date: string | null
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface OrganizationMember {
  id: number
  name: string
  position: string
  photo: string | null
  period: string | null
  order: number
}

export interface DashboardStats {
  total_anggota: number
  total_touring: number
  total_baksos: number
  total_event: number
  total_berita: number
  total_foto: number
  total_video: number
  total_regional: number
}

export interface PaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface PaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  path: string
  per_page: number
  to: number | null
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface ApiCollection<T> {
  data: T[]
}

export interface ApiResource<T> {
  data: T
}
