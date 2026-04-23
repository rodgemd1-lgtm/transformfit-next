import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'TransformFit — A plan that knows what week you are actually in.',
  description:
    'A fitness coaching app that reads the week you are actually having — sleep, soreness, stress, schedule — and bends the plan to fit.',
  metadataBase: new URL('https://transformfit.app'),
  openGraph: {
    title: 'TransformFit',
    description: 'For the week you are actually having.',
    type: 'website',
    siteName: 'TransformFit',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TransformFit — For the week you are actually having.',
    description: 'Sleep, soreness, stress, schedule — the plan bends to fit your week.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-orange focus:text-ink focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}