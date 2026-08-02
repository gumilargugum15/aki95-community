import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { PartnerProject } from '@/data/partner-projects'

interface PartnerProjectCardProps {
  project: PartnerProject
}

export function PartnerProjectCard({ project }: PartnerProjectCardProps) {
  const { name, category, description, demoAccount, url, buttonText, icon: Icon } = project

  return (
    <Card className="group h-full py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="flex h-full flex-col py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>

        <Badge variant="secondary" className="mt-3 w-fit text-[10px] tracking-wide uppercase">
          {category}
        </Badge>

        <h3 className="mt-2 text-sm font-extrabold tracking-tight uppercase">{name}</h3>
        <p className="mt-1 line-clamp-3 flex-1 text-xs text-muted-foreground">{description}</p>
        {demoAccount && (
          <p className="mt-1 text-xs text-muted-foreground">
            {demoAccount.note}: username <strong className="font-bold text-foreground">{demoAccount.username}</strong>
            , password <strong className="font-bold text-foreground">{demoAccount.password}</strong>
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full justify-center font-bold uppercase transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
          render={
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Kunjungi ${name}`}
              aria-label={`${buttonText} ${name}, membuka di tab baru`}
            >
              {buttonText}
              <ArrowRight className="size-3.5" />
            </a>
          }
        />
      </CardContent>
    </Card>
  )
}
