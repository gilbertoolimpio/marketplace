import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

export interface SignUpResponse {
  accessToken: string
}

export async function signUp({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: SignUpBody): Promise<SignUpResponse> {
  const response = await api.post('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })

  return response.data
}
