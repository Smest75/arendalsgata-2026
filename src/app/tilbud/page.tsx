import { getDb } from '@/db'
import { offers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

export const revalidate = 60

export const metadata = {
  title: 'I og rundt Arendalsgata — Arendalsgata 2026',
  description: 'Lokale virksomheter som gjør noe ekstra i festivaluka 10.–14. august på Sagene.',
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  butikk: 'Butikk',
  serveringssted: 'Serveringssted / kafé / bar',
  galleri: 'Galleri / kultursted',
  service: 'Tjenester / service',
  annet: 'Annet',
}

const DAY_LABELS: Record<string, string> = {
  mon: 'Mandag 10.',
  tue: 'Tirsdag 11.',
  wed: 'Onsdag 12.',
  thu: 'Torsdag 13.',
  fri: 'Fredag 14.',
}

const OFFER_TYPE_LABELS: Record<string, string> = {
  aktivitet: 'Aktivitet',
  produkt: 'Spesielt produkt',
  tilbud: 'Tilbud / rabatt',
  smaksopplevelse: 'Smaksopplevelse',
  utstilling: 'Utstilling',
  annet: 'Annet',
}

export default async function TilbudPage() {
  const db = await getDb()
  const publishedOffers = await db
    .select()
    .from(offers)
    .where(eq(offers.status, 'publisert'))

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight leading-none mb-4">
            I og rundt<br />Arendalsgata
          </h1>
          <p className="text-cream/70 text-lg max-w-xl leading-relaxed">
            Lokale virksomheter som gjør noe ekstra i festivaluka 10.–14. august på Sagene.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {publishedOffers.length === 0 ? (
          <div className="border border-border rounded-sm bg-white p-16 text-center">
            <p className="font-display font-bold text-xl text-dark/40 mb-2">Kommer snart</p>
            <p className="text-dark/40 text-sm">Vi jobber med å få inn lokale virksomheter.</p>
            <Link href="/bli-med#tilbud" className="inline-block mt-6 text-green font-medium text-sm hover:underline">
              Er du en virksomhet som vil delta? →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {publishedOffers.map((offer) => (
              <div key={offer.id} className="bg-white border border-border rounded-sm p-6 flex flex-col">
                <div className="mb-4">
                  <p className="font-display font-bold text-dark text-xl leading-tight">{offer.businessName}</p>
                  <p className="text-dark/50 text-xs mt-0.5">{BUSINESS_TYPE_LABELS[offer.businessType] ?? offer.businessType}</p>
                  {offer.address && <p className="text-dark/40 text-xs mt-0.5">{offer.address}</p>}
                </div>

                <p className="text-dark/70 text-sm leading-relaxed flex-1">{offer.description}</p>

                {offer.offerTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {offer.offerTypes.map((t) => (
                      <span key={t} className="text-xs bg-cream border border-border rounded-sm px-2 py-0.5 text-dark/60">
                        {OFFER_TYPE_LABELS[t] ?? t}
                      </span>
                    ))}
                  </div>
                )}

                {offer.days.length > 0 && (
                  <p className="text-dark/40 text-xs mt-3">
                    {offer.days.map((d) => DAY_LABELS[d] ?? d).join(' · ')}
                    {offer.openingHours && ` · ${offer.openingHours}`}
                  </p>
                )}

                {offer.website && (
                  <a
                    href={offer.website.startsWith('http') ? offer.website : `https://${offer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green text-sm font-medium hover:underline mt-4 inline-block"
                  >
                    {offer.website.replace(/^https?:\/\//, '')} →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-dark/50 text-sm">
            Er du en lokal virksomhet som vil gjøre noe ekstra i festivaluka?{' '}
            <Link href="/bli-med#tilbud" className="text-green font-medium hover:underline">
              Meld deg på →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
