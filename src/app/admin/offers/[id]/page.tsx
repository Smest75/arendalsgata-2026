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

const BUSINESS_TYPES = [
  { value: 'butikk', label: 'Butikk' },
  { value: 'serveringssted', label: 'Serveringssted / kafé / bar' },
  { value: 'galleri', label: 'Galleri / kultursted' },
  { value: 'service', label: 'Tjenester / service' },
  { value: 'annet', label: 'Annet' },
]

const OFFER_TYPES = [
  { value: 'aktivitet', label: 'Aktivitet' },
  { value: 'produkt', label: 'Spesielt produkt' },
  { value: 'tilbud', label: 'Tilbud / rabatt' },
  { value: 'smaksopplevelse', label: 'Smaksopplevelse' },
  { value: 'utstilling', label: 'Utstilling' },
  { value: 'annet', label: 'Annet' },
]

const DAYS = [
  { value: 'mon', label: 'Mandag 10.' },
  { value: 'tue', label: 'Tirsdag 11.' },
  { value: 'wed', label: 'Onsdag 12.' },
  { value: 'thu', label: 'Torsdag 13.' },
  { value: 'fri', label: 'Fredag 14.' },
]

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
          <h1 className="font-display font-bold text-xl mt-1">Rediger tilbud fra virksomhet</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-border rounded-sm p-4 mb-6">
          <p className="text-sm text-dark/50">
            Innsendt av {offer.contactName} · <a href={`mailto:${offer.email}`} className="text-green hover:underline">{offer.email}</a>
            {offer.phone && <span> · {offer.phone}</span>}
          </p>
          <p className="text-xs text-dark/30 mt-1">
            {new Date(offer.createdAt).toLocaleDateString('no-NO', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <form action={updateOffer} className="bg-white border border-border rounded-sm p-6 space-y-5">
          <input type="hidden" name="id" value={offer.id} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Virksomhetsnavn</label>
              <input type="text" name="businessName" defaultValue={offer.businessName} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Adresse</label>
              <input type="text" name="address" defaultValue={offer.address} required className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Type virksomhet</label>
            <select name="businessType" defaultValue={offer.businessType} className={inputCls}>
              {BUSINESS_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Beskrivelse av hva de tilbyr</label>
            <textarea name="description" rows={4} defaultValue={offer.description} required className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Type tilbud</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
              {OFFER_TYPES.map((t) => (
                <label key={t.value} className="flex items-center gap-2 text-sm text-dark/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="offerTypes"
                    value={t.value}
                    defaultChecked={offer.offerTypes.includes(t.value)}
                    className="accent-green"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Dager</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {DAYS.map((d) => (
                <label key={d.value} className="flex items-center gap-2 text-sm text-dark/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="days"
                    value={d.value}
                    defaultChecked={offer.days.includes(d.value)}
                    className="accent-green"
                  />
                  {d.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Åpningstid</label>
              <input type="text" name="openingHours" defaultValue={offer.openingHours ?? ''} className={inputCls} placeholder="F.eks. 10–18" />
            </div>
            <div>
              <label className={labelCls}>Nettside / Instagram</label>
              <input type="text" name="website" defaultValue={offer.website ?? ''} className={inputCls} placeholder="https://..." />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 border-t border-border pt-5">
            <div>
              <label className={labelCls}>Kontaktperson</label>
              <input type="text" name="contactName" defaultValue={offer.contactName} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>E-post</label>
              <input type="email" name="email" defaultValue={offer.email} required className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Telefon</label>
              <input type="text" name="phone" defaultValue={offer.phone ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kan publiseres</label>
              <select name="canPublish" defaultValue={offer.canPublish} className={inputCls}>
                <option value="yes">Ja</option>
                <option value="contact_first">Ta kontakt først</option>
                <option value="no">Ikke ennå</option>
              </select>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <label className={labelCls}>Interne notater</label>
            <textarea
              name="internalNotes"
              rows={3}
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
