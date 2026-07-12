import { useState } from 'react'
import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { YoutubeEmbed } from '@/components/shared/youtube-embed'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VideoOff } from 'lucide-react'
import { useCategories, useVideos } from '@/api/public'

export function GalleryVideoPage() {
  const [categoryId, setCategoryId] = useState<string>('all')
  const { data: categories = [] } = useCategories('video')
  const { data, isLoading } = useVideos(categoryId === 'all' ? {} : { category_id: categoryId })

  return (
    <div>
      <PageHero title="Galeri Video" description="Dokumentasi video kegiatan Komunitas AKI Motor 95" />
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
          <EmptyState icon={VideoOff} title="Belum ada video" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((video) => (
              <div key={video.id} className="space-y-2">
                <YoutubeEmbed url={video.youtube_url} title={video.title} />
                <h3 className="line-clamp-2 font-medium">{video.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
