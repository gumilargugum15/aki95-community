import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, HeartHandshake, ShieldCheck, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { ActivityCard } from '@/components/shared/activity-card'
import {
  useBanners,
  useBaksosList,
  usePublicStats,
  useSiteSettings,
  useSponsors,
  useTourings,
} from '@/api/public'

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description: 'Edukasi & workshop safety riding rutin bersertifikat.',
    highlighted: false,
  },
  {
    icon: HeartHandshake,
    title: 'Sosial Aktif',
    description: 'Kegiatan bakti sosial rutin di berbagai regional.',
    highlighted: true,
  },
  {
    icon: Users,
    title: 'Persaudaraan',
    description: 'Regional aktif di berbagai kota, kopdar rutin bulanan.',
    highlighted: false,
  },
]

const PROGRAM_TAGS = ['Santunan', 'Donor Darah', 'Bantuan Bencana', 'Penghijauan']

export function HomePage() {
  const { data: banners } = useBanners('home_hero')
  const { data: settings } = useSiteSettings()
  const { data: stats } = usePublicStats()
  const { data: tourings, isLoading: loadingTourings } = useTourings({ status: 'upcoming' })
  const { data: baksosList } = useBaksosList()
  const { data: sponsors } = useSponsors()

  const hero = banners?.[0]
  const featuredBaksos = baksosList?.data[0]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          {hero?.image && <img src={hero.image} alt={hero.title} className="size-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Est. 2019 &middot; Komunitas Motor Nasional
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-tight text-white uppercase sm:text-6xl lg:text-7xl"
          >
            Komunitas <span className="text-primary">Aki</span> Motor 95
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-neutral-300"
          >
            {settings?.about ??
              'Solid dalam Persaudaraan, Aman dalam Berkendara. Bergabunglah bersama ratusan rider Honda tahun 95 di seluruh Indonesia.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="font-bold uppercase" render={<Link to="/kontak">Gabung Komunitas <ArrowRight className="size-4" /></Link>} />
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent font-bold text-white uppercase hover:bg-white/10 hover:text-white"
              render={<Link to="/jadwal-kegiatan">Lihat Kegiatan</Link>}
            />
          </motion.div>
        </div>

        {stats && (
          <div className="relative grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
            {[
              { label: 'Anggota Aktif', value: `${stats.total_anggota}+` },
              { label: 'Kota Regional', value: stats.total_regional },
              { label: 'Total Touring', value: `${stats.total_touring}+` },
              { label: 'Bakti Sosial', value: stats.total_baksos },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`border-white/10 px-6 py-6 text-center sm:border-l ${i === 0 ? 'sm:border-l-0' : ''}`}
              >
                <p className="text-3xl font-extrabold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium tracking-widest text-neutral-400 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Nilai Komunitas</p>
        <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
          Lebih dari sekadar berkendara.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {VALUE_PROPS.map((item) => (
            <Card
              key={item.title}
              className={item.highlighted ? 'border-primary bg-primary/5' : undefined}
            >
              <CardContent className="py-6">
                <item.icon className="size-7 text-primary" />
                <h3 className="mt-4 text-lg font-extrabold tracking-tight uppercase">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest touring */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Latest Touring</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">Ride Terbaru</h2>
            </div>
            <Button variant="ghost" className="font-bold uppercase" render={<Link to="/touring">Semua Touring <ArrowRight className="size-4" /></Link>} />
          </div>

          {loadingTourings ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tourings?.data.slice(0, 3).map((touring, i) => (
                <ActivityCard
                  key={touring.id}
                  to={`/touring/${touring.slug}`}
                  title={touring.title}
                  coverImage={touring.cover_image}
                  location={touring.location}
                  date={touring.start_date}
                  status={touring.status}
                  participantCount={touring.participant_count}
                  highlighted={i === 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Baksos highlight */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            {featuredBaksos?.cover_image && (
              <img src={featuredBaksos.cover_image} alt={featuredBaksos.title} className="size-full object-cover" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Bakti Sosial</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Ride with Purpose
            </h2>
            <p className="mt-4 text-muted-foreground">
              Setiap kilometer yang kami tempuh membawa manfaat. Santunan, donor darah, bantuan bencana,
              penanaman pohon &mdash; komitmen sosial adalah bahan bakar komunitas.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {PROGRAM_TAGS.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium"
                >
                  <Zap className="size-4 text-primary" />
                  {tag}
                </div>
              ))}
            </div>

            <Button className="mt-8 font-bold uppercase" render={<Link to="/bakti-sosial">Lihat Program <ArrowRight className="size-4" /></Link>} />
          </div>
        </div>
      </section>

      {/* Sponsors */}
      {sponsors && sponsors.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              Didukung oleh Partner Terbaik
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.website ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  {sponsor.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-primary/15 via-background to-background py-24 text-center">
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">Siap Gabung Konvoi?</h2>
          <p className="mt-4 text-muted-foreground">
            Daftarkan dirimu, ikuti kopdar regional, dan jadilah bagian dari keluarga AKI 95.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="font-bold uppercase" render={<Link to="/kontak">Gabung Sekarang</Link>} />
            <Button size="lg" variant="outline" className="font-bold uppercase" render={<Link to="/faq">FAQ Pendaftaran</Link>} />
          </div>
        </div>
      </section>
    </div>
  )
}
