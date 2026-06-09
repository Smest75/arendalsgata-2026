import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Arendalsgata 2026',
  description: 'Festivalen for deg som blir igjen i Trygge Oslo. 10.–14. august, Sagene.',
  openGraph: {
    title: 'Arendalsgata 2026',
    description: 'Festivalen for deg som blir igjen i Trygge Oslo. 10.–14. august, Sagene.',
    url: 'https://arendalsgata.no',
    siteName: 'Arendalsgata 2026',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
