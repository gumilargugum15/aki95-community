import { useEffect, useState } from 'react'
import { useForm, type DefaultValues, type FieldValues, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodType } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'time' | 'select' | 'checkbox' | 'file'

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  options?: { label: string; value: string }[]
  placeholder?: string
  accept?: string
}

interface ResourceFormDialogProps<T extends FieldValues> {
  title: string
  description?: string
  fields: FieldConfig[]
  schema: ZodType<T, any>
  defaultValues: DefaultValues<T>
  onSubmit: (values: T) => Promise<unknown>
  trigger: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ResourceFormDialog<T extends FieldValues>({
  title,
  description,
  fields,
  schema,
  defaultValues,
  onSubmit,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ResourceFormDialogProps<T>) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const form = useForm<T>({
    resolver: zodResolver(schema) as unknown as Resolver<T>,
    defaultValues,
  })

  useEffect(() => {
    if (open) form.reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function handleSubmit(values: T) {
    await onSubmit(values)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as never}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === 'textarea' ? (
                        <Textarea
                          placeholder={field.placeholder}
                          {...formField}
                          value={formField.value ?? ''}
                        />
                      ) : field.type === 'select' ? (
                        <Select
                          value={formField.value ?? ''}
                          onValueChange={(value) => formField.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>
                              {field.options?.find((option) => option.value === formField.value)?.label ??
                                field.placeholder}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'checkbox' ? (
                        <Switch checked={!!formField.value} onCheckedChange={formField.onChange} />
                      ) : field.type === 'file' ? (
                        <Input
                          type="file"
                          accept={field.accept}
                          onChange={(e) => formField.onChange(e.target.files?.[0])}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...formField}
                          value={formField.value ?? ''}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
