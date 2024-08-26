import { useMutation } from '@tanstack/react-query'
import {
  Eye,
  EyeOff,
  ImageUp,
  KeySquare,
  Mail,
  MoveRight,
  Phone,
  User,
} from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { attachments } from '@/api/attachments'
import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { normalizePhoneNumber } from '@/lib/mask'
import { cn } from '@/lib/utils'

const signUpForm = z.object({
  name: z.string(),
  phone: z.string(),
  avatarId: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
})
type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const [showPassword, setShowPassoword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>('')
  const [avatar, setAvatar] = useState<File>()
  const [avatarId, setAvatarId] = useState<string>()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const { mutateAsync: registerSeller } = useMutation({
    mutationFn: signUp,
  })

  const { mutateAsync: attachmentsInsert } = useMutation({
    mutationFn: attachments,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      if (avatar) {
        const responseAvatar = await attachmentsInsert(avatar)
        setAvatarId(responseAvatar.id)
      }

      await registerSeller({
        name: data.name,
        phone: data.phone.replace(/[\D]/g, ''),
        avatarId: avatarId || '',
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  function handleShowPassword(e: FormEvent<SVGSVGElement>) {
    e.preventDefault()

    setShowPassoword(!showPassword)
  }

  function handleShowPasswordConfirmation(e: FormEvent<SVGSVGElement>) {
    e.preventDefault()

    setShowPasswordConfirmation(!showPasswordConfirmation)
  }

  function handleUploadAvatar(event: FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
      setPreviewAvatar(null)
    } else {
      const urlAvatar = URL.createObjectURL(event.currentTarget.files[0])
      setPreviewAvatar(urlAvatar)
      setAvatar(event.currentTarget.files[0])
    }
  }

  const name = watch('name')
  const phone = watch('phone')
  const email = watch('email')
  const password = watch('password')
  const passwordConfirmation = watch('passwordConfirmation')

  useEffect(() => {
    setValue('phone', normalizePhoneNumber(phone))
  }, [phone, setValue])

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white p-10">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mb-20 flex h-full w-full flex-col justify-between"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe os seus dados pessoais e de acesso
            </p>
          </div>
          <section className="flex flex-col justify-between">
            <h1 className="font-semibold">Perfil</h1>
            <div className="group">
              <Label
                className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-lg bg-shape-shape"
                htmlFor="picture"
              >
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    className="h-[120px] w-[120px] cursor-pointer items-center justify-center object-cover"
                    alt="foto de perfil"
                  />
                ) : (
                  <ImageUp className="h-6 w-6 text-orange-base dark:text-orange-dark" />
                )}
              </Label>

              <div className="relative mb-6">
                <span className="sr-only">Escolha uma foto de perfil</span>
                <Input
                  className="hidden"
                  id="picture"
                  type="file"
                  onChange={handleUploadAvatar}
                />
              </div>
            </div>

            <div className="group">
              <Label
                className="group-has-[#name:focus]:text-orange-base dark:text-orange-dark"
                htmlFor="name"
              >
                Nome
              </Label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-0.5">
                  <User
                    className={cn(
                      'h-4 w-4 text-gray-200 group-has-[#name:focus]:text-orange-base dark:text-orange-dark',
                      name.length && 'text-orange-base',
                    )}
                  />
                </div>
                <Input
                  id="name"
                  type="text"
                  hasPrependIcon
                  placeholder="Seu nome completo"
                  {...register('name')}
                />
              </div>
            </div>

            <div className="group">
              <Label
                className="group-has-[#phone:focus]:text-orange-base dark:text-orange-dark"
                htmlFor="phone"
              >
                Telefone
              </Label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-0.5">
                  <Phone
                    className={cn(
                      'h-4 w-4 text-gray-200 group-has-[#phone:focus]:text-orange-base dark:text-orange-dark',
                      phone.length && 'text-orange-base',
                    )}
                  />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  hasPrependIcon
                  placeholder="(00) 00000-0000"
                  {...register('phone')}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center">
            <h1 className="font-semibold">Acesso</h1>
            <div className="group">
              <Label
                className="group-has-[#email:focus]:text-orange-base dark:text-orange-dark"
                htmlFor="email"
              >
                E-mail
              </Label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-0.5">
                  <Mail
                    className={cn(
                      'h-4 w-4 text-gray-200 group-has-[#email:focus]:text-primary dark:text-gray-100',
                      email.length && 'text-primary',
                    )}
                  />
                </div>
                <Input
                  id="email"
                  type="email"
                  hasPrependIcon
                  autoComplete="username"
                  placeholder="Seu e-mail cadastrado"
                  {...register('email')}
                />
              </div>
            </div>

            <div className="group">
              <Label
                className="group-has-[#password:focus]:text-orange-base dark:text-orange-dark"
                htmlFor="password"
              >
                Senha
              </Label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-1">
                  <KeySquare
                    className={cn(
                      'h-4 w-4 text-gray-200 group-has-[#password:focus]:text-primary dark:text-gray-100',
                      password.length && 'text-primary',
                    )}
                  />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  hasAppendIcon
                  hasPrependIcon
                  autoComplete="current-password"
                  placeholder="Sua senha de acesso"
                  {...register('password')}
                />

                <div className="pointer-events-none absolute inset-y-0 start-0 flex w-full items-center justify-end pe-1">
                  {!showPassword ? (
                    <Eye
                      className="pointer-events-auto h-4 w-4 cursor-pointer text-gray-300 dark:text-gray-100"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <EyeOff
                      className="pointer-events-auto h-4 w-4 cursor-pointer text-gray-300 dark:text-gray-100"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="group">
              <Label
                className="group-has-[#passwordConfirmation:focus]:text-orange-base dark:text-orange-dark"
                htmlFor="passwordConfirmation"
              >
                Confirmar a senha
              </Label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-1">
                  <KeySquare
                    className={cn(
                      'h-4 w-4 text-gray-200 group-has-[#passwordConfirmation:focus]:text-primary dark:text-gray-100',
                      passwordConfirmation.length && 'text-primary',
                    )}
                  />
                </div>
                <Input
                  id="passwordConfirmation"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  hasAppendIcon
                  hasPrependIcon
                  autoComplete="current-password"
                  placeholder="Confirme a senha"
                  {...register('passwordConfirmation')}
                />

                <div className="pointer-events-none absolute inset-y-0 start-0 flex w-full items-center justify-end pe-1">
                  {!showPasswordConfirmation ? (
                    <Eye
                      className="pointer-events-auto h-4 w-4 cursor-pointer text-gray-300 dark:text-gray-100"
                      onClick={handleShowPasswordConfirmation}
                    />
                  ) : (
                    <EyeOff
                      className="pointer-events-auto h-4 w-4 cursor-pointer text-gray-300 dark:text-gray-100"
                      onClick={handleShowPasswordConfirmation}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          <div>
            <Button
              disabled={isSubmitting}
              className="flex w-full items-center justify-between rounded-md bg-orange-base p-5 text-white dark:bg-orange-dark"
            >
              Cadastrar
              <MoveRight />
            </Button>
          </div>
        </form>
        <div className="space-y-2">
          <p className="text-muted-foreground">Já tem uma conta?</p>

          <Button
            className="flex w-full items-center justify-between rounded-md border-orange-base bg-transparent p-5 text-orange-base dark:border-orange-dark dark:text-orange-dark"
            variant="outline"
            asChild
          >
            <Link to="/sign-in">
              Acessar
              <MoveRight />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
