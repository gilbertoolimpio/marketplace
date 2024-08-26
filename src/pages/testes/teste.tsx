import { Eye, EyeOff, KeySquare, Mail, MoveRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function Teste() {
  const [email, setEmail] = useState('')
  const [password, setSenha] = useState('')
  const [showPassword, setShowPassoword] = useState(false)

  function handleShowPassword(e: FormEvent<SVGSVGElement>) {
    e.preventDefault()

    setShowPassoword(!showPassword)
  }

  return (
    <>
      <Helmet title="Teste" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white p-20">
        <form className="flex h-[350px] w-full flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe seu e-mail e senha para entrar
            </p>
          </div>
          <div>
            <div className="group">
              <Label htmlFor="email">E-mail</Label>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail cadastrado"
                />
              </div>
            </div>

            <div className="group">
              <Label htmlFor="password">Senha</Label>
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
                  value={password}
                  hasAppendIcon
                  hasPrependIcon
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha de acesso"
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
          </div>
          <div>
            <Button className="flex w-full items-center justify-between rounded-md bg-orange-base p-5 text-white dark:bg-orange-dark">
              Acessar
              <MoveRight />
            </Button>
          </div>
        </form>
        <div className="space-y-2">
          <p className="text-muted-foreground">Ainda não tem uma conta?</p>

          <Button
            className="flex w-full items-center justify-between rounded-md border-orange-base bg-transparent p-5 text-orange-base dark:border-orange-dark dark:text-orange-dark"
            variant="outline"
          >
            Cadastrar
            <MoveRight />
          </Button>
        </div>
      </div>
    </>
  )
}
