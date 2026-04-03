import type { Metadata } from 'next'
import Script from 'next/script'
import { Open_Sans, Sail } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { AuthProvider } from '@/components/auth-provider'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

const sail = Sail({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sail',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.withrumo.com'),
  title: {
    default: 'RUMO — Give Your AI Direction',
    template: '%s — RUMO',
  },
  description:
    'Build the context anchors your AI agent needs to actually know you. Six anchors. One system. AI that works because it knows who you are.',
  openGraph: {
    type: 'website',
    siteName: 'RUMO',
    title: 'RUMO — Give Your AI Direction',
    description: 'Build the context anchors your AI needs to actually know you. Six anchors. One system. Your identity, voice, stories, situation, timeline, and relationships.',
    images: [
      {
        url: '/anchors-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'RUMO — Give Your AI Direction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RUMO — Give Your AI Direction',
    description: 'Build the context anchors your AI needs to actually know you. Six anchors. One system.',
    images: ['/anchors-hero.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${sail.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <Nav />
          {children}
          <Footer />
        </AuthProvider>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XS6FSPQRH5"
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XS6FSPQRH5');`}
        </Script>
        {/* HubSpot Tracking Code */}
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/148185112.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
