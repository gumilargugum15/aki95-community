import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useNewsList } from '@/api/public'

export function NewsListPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useNewsList(search ? { search } : {})

  return (
    <div>
      <PageHero title="Berita" description="Informasi dan kabar terbaru seputar Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari berita..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.data.length ? (
          <EmptyState title="Belum ada berita" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((item) => (
              <Link key={item.id} to={`/berita/${item.slug}`}>
                <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {item.featured_image && (
                      <img src={item.featured_image} alt={item.title} className="size-full object-cover" />
                    )}
                  </div>
                  <CardContent className="space-y-2 py-4">
                    {item.category && (
                      <p className="text-xs font-medium uppercase tracking-wide text-primary">
                        {item.category.name}
                      </p>
                    )}
                    <h3 className="line-clamp-2 font-semibold leading-snug">{item.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
