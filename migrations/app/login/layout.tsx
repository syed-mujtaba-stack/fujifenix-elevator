import { AuthProvider } from '@/components/auth/AuthProvider'
import LoginPage from './page'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
