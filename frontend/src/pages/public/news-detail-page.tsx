import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Eye } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNewsDetail } from '@/api/public'

export function NewsDetailPage() {
  const { slug } = useParams()
  const { data: news, isLoading } = useNewsDetail(slug)

  if (isLoading) return <LoadingSpinner className="py-32" />
  if (!news) return null

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2"
        render={
          <Link to="/berita">
            <ArrowLeft className="size-4" /> Kembali
          </Link>
        }
      />

      {news.category && <Badge className="mb-3">{news.category.name}</Badge>}
      <h1 className="text-3xl font-bold tracking-tight">{news.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {news.author && <span>Oleh {news.author.name}</span>}
        {news.published_at && (
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(news.published_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Eye className="size-3.5" /> {news.views} views
        </span>
      </div>

      {news.featured_image && (
        <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img src={news.featured_image} alt={news.title} className="size-full object-cover" />
        </div>
      )}

      <div className="mt-8 whitespace-pre-line leading-relaxed text-foreground/90">{news.content}</div>

      {news.tags && news.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {news.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              #{tag.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  )
}
