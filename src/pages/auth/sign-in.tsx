import { MoveRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <>
      <Helmet title="login" />
      <div className="full-screen-card-container flex flex-col justify-between rounded-3xl bg-white p-20">
        <div className="h-[350px]">
          <form className="flex min-h-full flex-col justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Acesse sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Informe seu e-mail e senha para entrar
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative w-full">
                <Label className="text-muted-foreground" htmlFor="email2">
                  E-mail
                </Label>
                <Input
                  id="email2"
                  className="pl-9"
                  placeholder="Type something..."
                />
                <MoveRight className="absolute left-0 top-7 m-2.5 h-4 w-4 text-muted-foreground" />
              </div>

              <div>
                <Label className="text-muted-foreground" htmlFor="email">
                  E-mail
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                />
              </div>

              <div>
                <Label className="text-muted-foreground" htmlFor="password">
                  Senha
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha de acesso"
                />
              </div>
            </div>
            <div>
              <Button className="flex w-full items-center justify-between">
                Acessar
                <MoveRight />
              </Button>
            </div>
          </form>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">Ainda não tem uma conta?</p>

          <Button
            className="flex w-full items-center justify-between border-primary text-primary"
            variant="outline"
          >
            Cadastrar
            <MoveRight />
          </Button>
        </div>
      </div>
      {/* <div className="flex h-screen w-[563px] flex-col justify-between rounded-3xl bg-white p-6 px-20 py-16">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe seu e-mail e senha para entrar
            </p>
          </div>
          <form className="mt-16 space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground" htmlFor="email">
                E-mail
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="Seu e-mail cadastrado"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground" htmlFor="password">
                Senha
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Sua senha de acesso"
              />
            </div>

            <Button className="flex w-full items-center justify-between">
              Acessar
              <MoveRight />
            </Button>
          </form>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">Ainda não tem uma conta?</p>

          <Button
            className="flex w-full items-center justify-between border-primary text-primary"
            variant="outline"
          >
            Cadastrar
            <MoveRight />
          </Button>
        </div>
      </div> */}
    </>
  )
}
