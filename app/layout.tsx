import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { AuthProvider } from '@/components/auth-provider'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RUMO — Give Your AI Direction',
  description:
    'Build the context anchors your AI agent needs to actually know you. Six anchors. One system. AI that works because it knows who you are.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-body">
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
