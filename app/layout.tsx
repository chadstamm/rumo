import type { Metadata } from 'next'
import { Source_Serif_4, DM_Sans } from 'next/font/google'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RUMO — Find Your Direction with AI',
  description:
    'AI is powerful but generic. You need direction first. Build your personal AI foundation with Rumo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${dmSans.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
