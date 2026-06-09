import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateEvent } from './actions'
import { SubmitButton } from '../../SubmitButton'
import { ALL_CATEGORIES, categoryLabel } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const inputCls = 'w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm'
const labelCls = 'block text-sm font-medium text-dark/60 mb-1'

const FESTIVAL_DAYS = [
  { value: '2026-08-10', label: 'Mandag 10. august' },
  { value: '2026-08-11', label: 'Tirsdag 11. august' },
  { value: '2026-08-12', label: 'Onsdag 12. august' },
  { value: '2026-08-13', label: 'Torsdag 13. august' },
  { value: '2026-08-14', label: 'Fredag 14. august' },
]

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  const [event] = await db.select().from(events).where(eq(events.id, Number(id))).limit(1)
  if (!event) notFound()

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="text-cream/50 text-sm hover:text-cream transition-colors">
            ← Admin
          </Link>
          <h1 className="font-display font-bold text-xl mt-1">Rediger arrangement</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-border rounded-sm p-6 mb-6">
          <p className="text-sm text-dark/50 mb-3">Sendt inn av {event.organizer} · {event.email}</p>
          <div className="bg-cream rounded-sm p-4">
            <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-1">Opprinnelig beskrivelse</p>
            <p className="text-sm text-dark/70 whitespace-pre-wrap">{event.description}</p>
          </div>
          {event.preferredTime && (
            <p className="text-sm text-dark/50 mt-3">Ønsket tidspunkt: {event.preferredTime}</p>
          )}
        </div>

        <form action={updateEvent} className="bg-white border border-border rounded-sm p-6 space-y-5">
          <input type="hidden" name="id" value={event.id} />

          <div>
            <label className={labelCls}>Tittel</label>
            <input type="text" name="title" defaultValue={event.title} required className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>
              Redigert beskrivelse <span className="text-dark/30">(erstatter opprinnelig ved publisering)</span>
            </label>
            <textarea
              name="descriptionEdited"
              rows={5}
              defaultValue={event.descriptionEdited ?? ''}
              className={inputCls}
              placeholder="La stå tomt for å bruke opprinnelig beskrivelse"
            />
          </div>

          <div>
            <label className={labelCls}>Kategorier</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
              {ALL_CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm text-dark/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat}
                    defaultChecked={event.categories.includes(cat)}
                    className="accent-green"
                  />
                  {categoryLabel(cat)}
                </label>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Dag</label>
              <select name="finalDate" defaultValue={event.finalDate ?? ''} className={inputCls}>
                <option value="">Ikke satt</option>
                {FESTIVAL_DAYS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Starttid</label>
              <input type="time" name="finalStartTime" defaultValue={event.finalStartTime ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sluttid</label>
              <input type="time" name="finalEndTime" defaultValue={event.finalEndTime ?? ''} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Sted / lokale</label>
            <input
              type="text"
              name="finalVenue"
              defaultValue={event.finalVenue ?? ''}
              className={inputCls}
              placeholder="F.eks. Sagene bokhandel, Arendalsgata 12"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Pris</label>
              <select name="isFree" defaultValue={event.isFree ?? ''} className={inputCls}>
                <option value="">Ikke satt</option>
                <option value="true">Gratis</option>
                <option value="false">Betalt</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Påmeldingslenke</label>
              <input
                type="url"
                name="registrationUrl"
                defaultValue={event.registrationUrl ?? ''}
                className={inputCls}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Interne notater</label>
            <textarea
              name="internalNotes"
              rows={3}
              defaultValue={event.internalNotes ?? ''}
              className={inputCls}
              placeholder="Vises ikke offentlig"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <SubmitButton />
            <Link href="/admin" className="text-dark/50 text-sm hover:text-dark transition-colors">
              Avbryt
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
