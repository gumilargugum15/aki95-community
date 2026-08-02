import { motion } from 'framer-motion'
import { PartnerProjectCard } from '@/components/shared/partner-project-card'
import { PARTNER_PROJECTS } from '@/data/partner-projects'

export function PartnerProjectsSection() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Project & Layanan Kami',
    itemListElement: PARTNER_PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name,
      description: project.description,
      url: project.url,
    })),
  }

  return (
    <section id="project-layanan-kami" className="border-t border-border bg-muted/40 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Kolaborasi &amp; Ekosistem</p>
          <h2 className="mt-1.5 text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            Project &amp; Layanan Kami
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Kami juga mengembangkan berbagai solusi digital untuk komunitas, UMKM, dan bisnis.
          </p>
        </motion.div>

        <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <PartnerProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
