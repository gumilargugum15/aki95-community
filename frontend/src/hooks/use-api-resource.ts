import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { ApiResource, PaginatedResponse } from '@/types'

type Params = Record<string, string | number | boolean | undefined>

/**
 * Builds a set of reusable TanStack Query hooks (list/detail/create/update/delete)
 * for a REST resource, so each admin module doesn't hand-roll the same wiring.
 */
export function createApiResource<TItem, TPayload = Partial<TItem>>(
  key: string,
  endpoint: string,
) {
  function useList(params: Params = {}) {
    return useQuery({
      queryKey: [key, 'list', params],
      queryFn: async () => {
        const { data } = await api.get<PaginatedResponse<TItem>>(endpoint, { params })
        return data
      },
      placeholderData: keepPreviousData,
    })
  }

  function useDetail(id: number | string | undefined) {
    return useQuery({
      queryKey: [key, 'detail', id],
      queryFn: async () => {
        const { data } = await api.get<ApiResource<TItem>>(`${endpoint}/${id}`)
        return data.data
      },
      enabled: id !== undefined && id !== null,
    })
  }

  function toFormPayload(payload: TPayload, method?: 'PUT') {
    const hasFile = Object.values(payload as Record<string, unknown>).some(
      (value) => value instanceof File || value instanceof FileList,
    )

    if (!hasFile) return payload

    const form = new FormData()
    Object.entries(payload as Record<string, unknown>).forEach(([field, value]) => {
      if (value === undefined || value === null) return

      if (value instanceof FileList) {
        Array.from(value).forEach((file) => form.append(`${field}[]`, file))
      } else if (value instanceof File) {
        form.append(field, value)
      } else if (Array.isArray(value)) {
        value.forEach((item) => form.append(`${field}[]`, String(item)))
      } else if (typeof value === 'boolean') {
        form.append(field, value ? '1' : '0')
      } else {
        form.append(field, String(value))
      }
    })

    if (method) form.append('_method', method)

    return form
  }

  function useCreate() {
    const client = useQueryClient()

    return useMutation({
      mutationFn: async (payload: TPayload) => {
        const body = toFormPayload(payload)
        const { data } = await api.post<ApiResource<TItem>>(endpoint, body)
        return data.data
      },
      onSuccess: () => client.invalidateQueries({ queryKey: [key, 'list'] }),
    })
  }

  function useUpdate() {
    const client = useQueryClient()

    return useMutation({
      mutationFn: async ({ id, payload }: { id: number | string; payload: TPayload }) => {
        const body = toFormPayload(payload, 'PUT')
        const isForm = body instanceof FormData
        const { data } = await api[isForm ? 'post' : 'put']<ApiResource<TItem>>(
          `${endpoint}/${id}`,
          body,
        )
        return data.data
      },
      onSuccess: (_data, variables) => {
        client.invalidateQueries({ queryKey: [key, 'list'] })
        client.invalidateQueries({ queryKey: [key, 'detail', variables.id] })
      },
    })
  }

  function useRemove() {
    const client = useQueryClient()

    return useMutation({
      mutationFn: async (id: number | string) => {
        await api.delete(`${endpoint}/${id}`)
      },
      onSuccess: () => client.invalidateQueries({ queryKey: [key, 'list'] }),
    })
  }

  return { useList, useDetail, useCreate, useUpdate, useRemove }
}
