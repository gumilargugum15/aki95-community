import type { LucideIcon } from 'lucide-react'
import { Heart, Store } from 'lucide-react'

export interface PartnerProject {
  id: string
  name: string
  category: string
  description: string
  demoAccount?: {
    note: string
    username: string
    password: string
  }
  url: string
  buttonText: string
  icon: LucideIcon
}

export const PARTNER_PROJECTS: PartnerProject[] = [
  {
    id: 'pos-demo',
    name: 'POS Demo',
    category: 'Aplikasi POS & Kasir',
    description:
      'Aplikasi kasir berbasis web untuk UMKM lengkap dengan manajemen produk, stok, transaksi, laporan, QRIS, dan dashboard bisnis.',
    demoAccount: {
      note: 'Akun demo admin',
      username: 'admin@kagoempos.com',
      password: 'password',
    },
    url: 'https://pos.kagoemdev.my.id',
    buttonText: 'Kunjungi Website',
    icon: Store,
  },
  {
    id: 'undangakoe',
    name: 'UndangAkoe',
    category: 'Undangan Digital',
    description:
      'Platform pembuatan undangan digital modern dengan desain elegan, RSVP, galeri foto, countdown, lokasi acara, dan tema yang dapat disesuaikan.',
    url: 'https://undangakoe.my.id',
    buttonText: 'Kunjungi Website',
    icon: Heart,
  },
  // {
  //   id: 'kagoem-digital',
  //   name: 'Kagoem Digital',
  //   category: 'Software House',
  //   description:
  //     'Jasa pembuatan website, aplikasi mobile, sistem ERP, POS, company profile, dashboard, dan solusi digital sesuai kebutuhan bisnis.',
  //   url: 'https://kagoemdev.my.id',
  //   buttonText: 'Hubungi Kami',
  //   icon: Code2,
  // },
]
