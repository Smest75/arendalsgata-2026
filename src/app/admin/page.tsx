export const dynamic = 'force-dynamic'

import { getDb } from '@/db'
import { events, venues, interests, offers } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { StatusSelect } from './StatusSelect'
import { logout } from './actions'
import { DeleteButton } from './DeleteButton'
import Link from 'next/link'

export const metadata = { title: 'Admin – Arendalsgata 2026' }

function Table({ cols, children }: { cols: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {cols.map((c) => (
              <th key={c} className="text-left text-xs font-semibold text-dark/40 uppercase tracking-wider pb-2 pr-4 whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">{children}</tbody>
      </table>
    </div>
  )
}

export default async function AdminPage() {
  const db = await getDb()
  const [allEvents, allVenues, allInterests, allOffers] = await Promise.all([
    db.select().from(events).orderBy(desc(events.createdAt)),
    db.select().from(venues).orderBy(desc(venues.createdAt)),
    db.select().from(interests).orderBy(desc(interests.createdAt)),
    db.select().from(offers).orderBy(desc(offers.createdAt)),
  ])

  const newCount = allEvents.filter((e) => e.status === 'new').length

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl">Admin</h1>
            <p className="text-cream/50 text-sm mt-0.5">Arendalsgata 2026</p>
          </div>
          <div className="flex items-center gap-4">
            {newCount > 0 && (
              <span className="bg-rust text-cream text-xs font-bold px-2 py-1 rounded-full">
                {newCount} nye
              </span>
            )}
            <form action={logout}>
              <button className="text-cream/50 text-sm hover:text-cream transition-colors">
                Logg ut
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Events */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-bold text-xl text-dark">Arrangementer</h2>
            <span className="text-sm text-dark/40">{allEvents.length} totalt</span>
          </div>
          <div className="bg-white border border-border rounded-sm p-6">
            {allEvents.length === 0 ? (
              <p className="text-dark/40 text-sm">Ingen arrangementer ennå.</p>
            ) : (
              <Table cols={['Tittel', 'Arrangør', 'Dato', 'Sted', 'Innsendt', 'Status', '', '']}>
                {allEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-2 pr-4 font-medium text-dark max-w-[180px]">
                      <span className="block truncate" title={e.title}>{e.title}</span>
                      <a href={`mailto:${e.email}`} className="text-xs text-dark/40 hover:text-green">{e.organizer}</a>
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs whitespace-nowrap">
                      {e.finalDate ?? <span className="text-dark/30 italic">ikke satt</span>}
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs max-w-[140px]">
                      <span className="block truncate">{e.finalVenue ?? <span className="text-dark/30 italic">ikke satt</span>}</span>
                    </td>
                    <td className="py-2 pr-4 text-dark/40 text-xs whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleDateString('no-NO')}
                    </td>
                    <td className="py-2 pr-3">
                      <StatusSelect id={e.id} currentStatus={e.status} type="event" />
                    </td>
                    <td className="py-2 pr-3">
                      <Link href={`/admin/events/${e.id}`} className="text-xs text-green hover:underline whitespace-nowrap">
                        Rediger →
                      </Link>
                    </td>
                    <td className="py-2">
                      <DeleteButton id={e.id} type="event" />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </section>

        {/* Venues */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-bold text-xl text-dark">Steder og lokaler</h2>
            <span className="text-sm text-dark/40">{allVenues.length} totalt</span>
          </div>
          <div className="bg-white border border-border rounded-sm p-6">
            {allVenues.length === 0 ? (
              <p className="text-dark/40 text-sm">Ingen lokaler registrert ennå.</p>
            ) : (
              <Table cols={['Navn', 'Adresse', 'Type', 'Kapasitet', 'Kontakt', 'Status', '', '']}>
                {allVenues.map((v) => (
                  <tr key={v.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-2 pr-4 font-medium text-dark">{v.name}</td>
                    <td className="py-2 pr-4 text-dark/70 text-xs">{v.address}</td>
                    <td className="py-2 pr-4 text-dark/60 text-xs">{v.type}</td>
                    <td className="py-2 pr-4 text-dark/60 text-xs">{v.capacity}</td>
                    <td className="py-2 pr-4">
                      <p className="text-xs text-dark/70">{v.contactName}</p>
                      <a href={`mailto:${v.email}`} className="text-xs text-green hover:underline">{v.email}</a>
                    </td>
                    <td className="py-2 pr-3">
                      <StatusSelect id={v.id} currentStatus={v.status} type="venue" />
                    </td>
                    <td className="py-2 pr-3">
                      <Link href={`/admin/venues/${v.id}`} className="text-xs text-green hover:underline whitespace-nowrap">
                        Rediger →
                      </Link>
                    </td>
                    <td className="py-2">
                      <DeleteButton id={v.id} type="venue" />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </section>

        {/* Offers */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-bold text-xl text-dark">Tilbud fra virksomheter</h2>
            <span className="text-sm text-dark/40">{allOffers.length} totalt</span>
          </div>
          <div className="bg-white border border-border rounded-sm p-6">
            {allOffers.length === 0 ? (
              <p className="text-dark/40 text-sm">Ingen tilbud registrert ennå.</p>
            ) : (
              <Table cols={['Virksomhet', 'Type', 'Tilbud', 'Dager', 'Kontakt', 'Status', '', '']}>
                {allOffers.map((o) => (
                  <tr key={o.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-2 pr-4 font-medium text-dark">
                      <span className="block">{o.businessName}</span>
                      <span className="text-xs text-dark/40">{o.address}</span>
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs">{o.businessType}</td>
                    <td className="py-2 pr-4 text-dark/60 text-xs max-w-[200px]">
                      <span className="block truncate" title={o.description}>{o.description}</span>
                      {o.offerTypes.length > 0 && (
                        <span className="text-dark/40">{o.offerTypes.join(', ')}</span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs whitespace-nowrap">
                      {o.days.length > 0 ? o.days.join(', ') : '–'}
                    </td>
                    <td className="py-2 pr-4">
                      <p className="text-xs text-dark/70">{o.contactName}</p>
                      <a href={`mailto:${o.email}`} className="text-xs text-green hover:underline">{o.email}</a>
                    </td>
                    <td className="py-2 pr-3">
                      <StatusSelect id={o.id} currentStatus={o.status} type="offer" />
                    </td>
                    <td className="py-2 pr-3">
                      <Link href={`/admin/offers/${o.id}`} className="text-xs text-green hover:underline whitespace-nowrap">
                        Rediger →
                      </Link>
                    </td>
                    <td className="py-2">
                      <DeleteButton id={o.id} type="offer" />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </section>

        {/* Interests */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-bold text-xl text-dark">Interessemeldinger</h2>
            <span className="text-sm text-dark/40">{allInterests.length} totalt</span>
          </div>
          <div className="bg-white border border-border rounded-sm p-6">
            {allInterests.length === 0 ? (
              <p className="text-dark/40 text-sm">Ingen interessemeldinger ennå.</p>
            ) : (
              <Table cols={['Navn', 'E-post', 'Type', 'Interessert i', 'Melding', 'Status', '', '']}>
                {allInterests.map((i) => (
                  <tr key={i.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-2 pr-4 font-medium text-dark">{i.name}</td>
                    <td className="py-2 pr-4">
                      <a href={`mailto:${i.email}`} className="text-xs text-green hover:underline">{i.email}</a>
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs">{i.personType}</td>
                    <td className="py-2 pr-4 text-dark/60 text-xs">
                      {i.interests.join(', ') || '–'}
                    </td>
                    <td className="py-2 pr-4 text-dark/60 text-xs max-w-[180px]">
                      <span className="block truncate" title={i.message ?? ''}>{i.message ?? '–'}</span>
                    </td>
                    <td className="py-2 pr-3">
                      <StatusSelect id={i.id} currentStatus={i.status} type="interest" />
                    </td>
                    <td className="py-2 pr-3">
                      <Link href={`/admin/interests/${i.id}`} className="text-xs text-green hover:underline whitespace-nowrap">
                        Rediger →
                      </Link>
                    </td>
                    <td className="py-2">
                      <DeleteButton id={i.id} type="interest" />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
