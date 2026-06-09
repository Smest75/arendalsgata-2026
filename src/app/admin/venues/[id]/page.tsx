import { getDb } from '@/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateVenue } from './actions'
import { SubmitButton } from '../../SubmitButton'

export const dynamic = 'force-dynamic'

const inputCls = 'w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm'
const labelCls = 'block text-sm font-medium text-dark/60 mb-1'

export default async function EditVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  const [venue] = await db.select().from(venues).where(eq(venues.id, Number(id))).limit(1)
  if (!venue) notFound()

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="text-cream/50 text-sm hover:text-cream transition-colors">
            ← Admin
          </Link>
          <h1 className="font-display font-bold text-xl mt-1">Rediger sted / lokale</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form action={updateVenue} className="bg-white border border-border rounded-sm p-6 space-y-5">
          <input type="hidden" name="id" value={venue.id} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Navn på sted</label>
              <input type="text" name="name" defaultValue={venue.name} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Adresse</label>
              <input type="text" name="address" defaultValue={venue.address} required className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Type sted</label>
            <select name="type" defaultValue={venue.type} className={inputCls}>
              {[
                ['butikk', 'Butikk'],
                ['serveringssted', 'Serveringssted'],
                ['galleri', 'Galleri'],
                ['moterom', 'Møterom'],
                ['scene', 'Scene'],
                ['bakgard', 'Bakgård'],
                ['kontor', 'Kontor'],
                ['annet', 'Annet'],
              ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Beskrivelse</label>
            <textarea name="description" rows={4} defaultValue={venue.description} className={inputCls} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Kapasitet</label>
              <select name="capacity" defaultValue={venue.capacity} className={inputCls}>
                {[['1-10', '1–10'], ['10-25', '10–25'], ['25-50', '25–50'], ['50+', '50+'], ['unsure', 'Usikker']].map(
                  ([v, l]) => <option key={v} value={v}>{l}</option>
                )}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tilgjengelighet</label>
              <input type="text" name="availability" defaultValue={venue.availability} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Kan andre arrangere hos dere?</label>
            <select name="canOthersArrange" defaultValue={venue.canOthersArrange} className={inputCls}>
              <option value="yes">Ja</option>
              <option value="maybe">Kanskje</option>
              <option value="self">Nei, vi arrangerer selv</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Kontaktperson</label>
              <input type="text" name="contactName" defaultValue={venue.contactName} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>E-post</label>
              <input type="email" name="email" defaultValue={venue.email} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Telefon</label>
              <input type="tel" name="phone" defaultValue={venue.phone ?? ''} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Interne notater</label>
            <textarea name="internalNotes" rows={3} defaultValue={venue.internalNotes ?? ''} className={inputCls} placeholder="Vises ikke offentlig" />
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
