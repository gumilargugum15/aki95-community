import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useOrganizationMembers } from '@/api/public'

export function OrganizationPage() {
  const { data: members, isLoading } = useOrganizationMembers()

  return (
    <div>
      <PageHero title="Struktur Organisasi" description="Susunan pengurus Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : !members?.length ? (
          <EmptyState title="Struktur organisasi belum tersedia" />
        ) : (
          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center">
                <Avatar className="size-24">
                  <AvatarImage src={member.photo ?? undefined} alt={member.name} />
                  <AvatarFallback className="text-lg">{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="mt-3 font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.position}</p>
                {member.period && <p className="text-xs text-muted-foreground">{member.period}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
