import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | marketplace" />
      <Toaster richColors />

      <QueryClientProvider client={queryClient}>
        <div className="bg-shape-background">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
