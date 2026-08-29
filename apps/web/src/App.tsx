import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { ThemeProvider } from '@/components/common/ThemeProvider'
import { AuthProvider } from '@/features/auth'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sprintiq-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" closeButton />
      </AuthProvider>
    </ThemeProvider>
  )
}