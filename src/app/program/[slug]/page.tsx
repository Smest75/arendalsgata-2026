import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categoryLabel, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const db = await getDb()
  const [event] = await db.select().from(events).where(eq(events.slug, slug)).limit(1)
  if (!event || event.status !== 'published') return {}

  const desc = (event.descriptionEdited ?? event.description).slice(0, 155)
  const title = event.title

  return {
    title,
    description: desc,
    alternates: { canonical: `https://arendalsgata.no/program/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://arendalsgata.no/program/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description: desc,
    },
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const db = await getDb()
  const [event] = await db.select().from(events).where(eq(events.slug, slug)).limit(1)

  if (!event || event.status !== 'published') notFound()

  const desc = event.descriptionEdited ?? event.description

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: desc,
    url: `https://arendalsgata.no/program/${event.slug}`,
    ...(event.finalDate && { startDate: event.finalStartTime ? `${event.finalDate}T${event.finalStartTime}:00` : event.finalDate }),
    ...(event.finalDate && event.finalEndTime && { endDate: `${event.finalDate}T${event.finalEndTime}:00` }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    ...(event.isFree === 'true' && { isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'NOK' } }),
    ...(event.finalVenue && {
      location: {
        '@type': 'Place',
        name: event.finalVenue,
        address: { '@type': 'PostalAddress', addressLocality: 'Oslo', addressCountry: 'NO' },
      },
    }),
    organizer: { '@type': 'Person', name: event.organizer },
    superEvent: { '@type': 'Festival', name: 'Arendalsgata 2026', url: 'https://arendalsgata.no' },
    inLanguage: 'nb',
  }

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/program" className="text-cream/60 text-sm hover:text-cream transition-colors mb-4 block">
            ← Tilbake til program
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.finalDate && (
              <span className="text-xs font-semibold uppercase tracking-wider text-green bg-cream px-2 py-1 rounded-sm">
                {formatDate(event.finalDate)}
              </span>
            )}
            {event.categories.map((cat) => (
              <span key={cat} className="text-xs font-medium text-cream/90 bg-white/15 px-2 py-1 rounded-sm">
                {categoryLabel(cat)}
              </span>
            ))}
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight">
            {event.title}
          </h1>
          {(event.finalVenue || event.finalStartTime) && (
            <p className="text-cream/80 mt-4 text-lg">
              {[event.finalVenue, event.finalStartTime && `kl. ${event.finalStartTime}${event.finalEndTime ? `–${event.finalEndTime}` : ''}`]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-border rounded-sm p-8">
          <p className="text-dark/80 leading-relaxed text-lg whitespace-pre-wrap">{desc}</p>

          <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-dark/50 uppercase text-xs tracking-wider mb-1">Arrangør</p>
              <p className="text-dark">{event.organizer}</p>
            </div>
            {event.finalVenue && (
              <div>
                <p className="font-semibold text-dark/50 uppercase text-xs tracking-wider mb-1">Sted</p>
                <p className="text-dark">{event.finalVenue}</p>
              </div>
            )}
            {event.finalStartTime && (
              <div>
                <p className="font-semibold text-dark/50 uppercase text-xs tracking-wider mb-1">Tid</p>
                <p className="text-dark">
                  kl. {event.finalStartTime}{event.finalEndTime ? `–${event.finalEndTime}` : ''}
                </p>
              </div>
            )}
            {event.isFree && (
              <div>
                <p className="font-semibold text-dark/50 uppercase text-xs tracking-wider mb-1">Pris</p>
                <p className="text-dark">{event.isFree === 'true' ? 'Gratis' : 'Betalt'}</p>
              </div>
            )}
          </div>

          {event.registrationUrl && (
            <div className="mt-6">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rust text-cream font-semibold px-6 py-3 rounded inline-block hover:bg-rust-light transition-colors"
              >
                Meld deg på →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
