import { PageHero } from '@/components/shared/page-hero'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { EmptyState } from '@/components/shared/empty-state'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useFaqs } from '@/api/public'

export function FaqPage() {
  const { data: faqs, isLoading } = useFaqs()

  return (
    <div>
      <PageHero title="FAQ" description="Pertanyaan yang sering diajukan seputar Komunitas AKI Motor 95" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : !faqs?.length ? (
          <EmptyState title="Belum ada FAQ" />
        ) : (
          <Accordion className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={String(faq.id)}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  )
}
