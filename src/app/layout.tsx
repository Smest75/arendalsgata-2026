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
  metadataBase: new URL('https://arendalsgata.no'),
  title: {
    default: 'Arendalsgata 2026',
    template: '%s – Arendalsgata 2026',
  },
  description: 'Festivalen for deg som blir igjen i Trygge Oslo. Fag, kultur, mat og gode samtaler i Arendalsgata på Sagene, Oslo. 10.–14. august 2026.',
  keywords: ['Arendalsgata', 'festival', 'Sagene', 'Oslo', 'Arendalsuka', 'kultur', 'arrangementer'],
  authors: [{ name: 'Martin Smestad Hansen', url: 'https://arendalsgata.no' }],
  creator: 'Martin Smestad Hansen',
  openGraph: {
    title: 'Arendalsgata 2026',
    description: 'Festivalen for deg som blir igjen i Trygge Oslo. 10.–14. august, Sagene.',
    url: 'https://arendalsgata.no',
    siteName: 'Arendalsgata 2026',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arendalsgata 2026',
    description: 'Festivalen for deg som blir igjen i Trygge Oslo. 10.–14. august, Sagene.',
  },
  alternates: {
    canonical: 'https://arendalsgata.no',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const festivalSchema = {
  '@context': 'https://schema.org',
  '@type': 'Festival',
  name: 'Arendalsgata 2026',
  description: 'En åpen festivaluke på Sagene, Oslo – for folk og virksomheter som vil møtes rundt fag, kultur, teknologi, mat, drikke og gode samtaler.',
  url: 'https://arendalsgata.no',
  startDate: '2026-08-10',
  endDate: '2026-08-14',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Arendalsgata, Sagene',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Arendalsgata',
      addressLocality: 'Oslo',
      addressCountry: 'NO',
    },
  },
  organizer: {
    '@type': 'Person',
    name: 'Martin Smestad Hansen',
    email: 'hei@arendalsgata.no',
    url: 'https://arendalsgata.no',
  },
  inLanguage: 'nb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalSchema) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-green focus:text-cream focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-semibold"
        >
          Hopp til innhold
        </a>
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
