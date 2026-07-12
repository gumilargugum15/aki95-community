import { getYoutubeEmbedUrl } from '@/lib/youtube'

export function YoutubeEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = getYoutubeEmbedUrl(url)

  if (!embedUrl) return null

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </div>
  )
}
