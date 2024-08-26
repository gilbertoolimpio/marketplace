import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="mx-auto grid min-h-screen max-w-[1366px] grid-cols-9">
      <div className="col-span-5 flex h-full flex-col border-foreground/5 p-6 text-muted-foreground">
        <div className="">
          <img src="logo.svg" alt="Logo marketplace" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <img src="background.png" alt="Logo marketplace" />
        </div>
      </div>
      <div className="col-span-4 h-screen p-6">{<Outlet />}</div>

      {/* <div className="grid max-w-[1366px] grid-cols-9 py-6">
        <div className="col-span-5">
          <div className="">
            <img src="logo.svg" alt="Logo marketplace" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img src="background.png" alt="Logo marketplace" />
          </div>
        </div>
        </div> */}
    </div>
  )
}
