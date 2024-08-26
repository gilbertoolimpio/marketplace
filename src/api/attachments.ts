import { api } from '@/lib/axios'

export interface AttachmentsResponse {
  id: string
  url: string
}

export async function attachments(file: File): Promise<AttachmentsResponse> {
  const formData = new FormData()
  formData.append('files', file)

  const response = await api.post('/attachments', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response?.data?.attachments[0]
}
