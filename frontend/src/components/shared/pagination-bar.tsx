import { Button } from '@/components/ui/button'
import type { PaginationMeta } from '@/types'

interface PaginationBarProps {
  meta: PaginationMeta
  onPageChange: (page: number) => void
}

export function PaginationBar({ meta, onPageChange }: PaginationBarProps) {
  if (meta.last_page <= 1) return null

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-sm text-muted-foreground">
        Menampilkan {meta.from ?? 0}-{meta.to ?? 0} dari {meta.total} data
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  )
}
