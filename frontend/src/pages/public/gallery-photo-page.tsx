import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Images } from 'lucide-react'
import { useCategories, useGalleryAlbums } from '@/api/public'

export function GalleryPhotoPage() {
  const [categoryId, setCategoryId] = useState<string>('all')
  const { data: categories = [] } = useCategories('gallery')
  const { data, isLoading } = useGalleryAlbums(categoryId === 'all' ? {} : { category_id: categoryId })

  return (
    <div>
      <PageHero title="Galeri Foto" description="Dokumentasi kegiatan Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categories.length > 0 && (
          <div className="mb-6 flex justify-end">
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? 'all')}>
              <SelectTrigger className="w-48">
                <SelectValue>
                  {categoryId === 'all' ? 'Semua Kategori' : categories.find((c) => String(c.id) === categoryId)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.data.length ? (
          <EmptyState icon={Images} title="Belum ada album foto" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.data.map((album) => (
              <Link key={album.id} to={`/galeri-foto/${album.slug}`} className="group">
                <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
                  <div className="aspect-square w-full overflow-hidden bg-muted">
                    {(album.cover_image ?? album.photos?.[0]?.photo_url) && (
                      <img
                        src={album.cover_image ?? album.photos?.[0]?.photo_url}
                        alt={album.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <CardContent className="py-3">
                    <h3 className="line-clamp-1 font-medium">{album.title}</h3>
                    <p className="text-xs text-muted-foreground">{album.photos?.length ?? 0} foto</p>
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
