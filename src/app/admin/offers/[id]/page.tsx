import { getDb } from '@/db'
import { offers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateOffer } from './actions'
import { SubmitButton } from '../../SubmitButton'

export const dynamic = 'force-dynamic'

const inputCls = 'w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm'
const labelCls = 'block text-sm font-medium text-dark/60 mb-1'

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

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  const [offer] = await db.select().from(offers).where(eq(offers.id, Number(id))).limit(1)
  if (!offer) notFound()

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="text-cream/50 text-sm hover:text-cream transition-colors">
            ← Admin
          </Link>
          <h1 className="font-display font-bold text-xl mt-1">Tilbud fra virksomhet</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white border border-border rounded-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-dark/40 uppercase tracking-wider">Innsendt informasjon</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className={labelCls}>Virksomhet</p>
              <p className="text-sm font-medium text-dark">{offer.businessName}</p>
              <p className="text-xs text-dark/50 mt-0.5">{offer.address}</p>
            </div>
            <div>
              <p className={labelCls}>Type</p>
              <p className="text-sm text-dark">{BUSINESS_TYPE_LABELS[offer.businessType] ?? offer.businessType}</p>
            </div>
          </div>

          <div>
            <p className={labelCls}>Hva de vil tilby</p>
            <p className="text-sm text-dark/80 whitespace-pre-wrap">{offer.description}</p>
          </div>

          {offer.offerTypes.length > 0 && (
            <div>
              <p className={labelCls}>Type tilbud</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {offer.offerTypes.map((t) => (
                  <span key={t} className="text-xs bg-cream border border-border rounded-sm px-2 py-0.5 text-dark/70">{t}</span>
                ))}
              </div>
            </div>
          )}

          {offer.days.length > 0 && (
            <div>
              <p className={labelCls}>Dager</p>
              <p className="text-sm text-dark/70">
                {offer.days.map((d) => DAY_LABELS[d] ?? d).join(', ')}
              </p>
            </div>
          )}

          {offer.openingHours && (
            <div>
              <p className={labelCls}>Åpningstid</p>
              <p className="text-sm text-dark/70">{offer.openingHours}</p>
            </div>
          )}

          {offer.website && (
            <div>
              <p className={labelCls}>Nettside / Instagram</p>
              <p className="text-sm text-dark/70">{offer.website}</p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className={labelCls}>Kontakt</p>
              <p className="text-sm text-dark/70">{offer.contactName}</p>
              <a href={`mailto:${offer.email}`} className="text-sm text-green hover:underline">{offer.email}</a>
              {offer.phone && <p className="text-xs text-dark/50 mt-0.5">{offer.phone}</p>}
            </div>
            <div>
              <p className={labelCls}>Kan publiseres</p>
              <p className="text-sm text-dark/70">
                {offer.canPublish === 'yes' ? 'Ja' : offer.canPublish === 'contact_first' ? 'Ta kontakt først' : 'Ikke ennå'}
              </p>
            </div>
          </div>

          <p className="text-xs text-dark/30">
            Innsendt {new Date(offer.createdAt).toLocaleDateString('no-NO', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

        <form action={updateOffer} className="bg-white border border-border rounded-sm p-6 space-y-5">
          <input type="hidden" name="id" value={offer.id} />

          <div>
            <label className={labelCls}>Interne notater</label>
            <textarea
              name="internalNotes"
              rows={4}
              defaultValue={offer.internalNotes ?? ''}
              className={inputCls}
              placeholder="Vises ikke offentlig"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <SubmitButton />
            <Link href="/admin" className="text-dark/50 text-sm hover:text-dark transition-colors">Avbryt</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
