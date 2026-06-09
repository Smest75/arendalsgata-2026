import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EventCard from '@/components/EventCard'
import Link from 'next/link'
import { categoryLabel, formatDateFull, ALL_CATEGORIES } from '@/lib/utils'

export const revalidate = 60

export const metadata = {
  title: 'Program — Arendalsgata 2026',
}

type Props = { searchParams: Promise<{ kategori?: string }> }

export default async function ProgramPage({ searchParams }: Props) {
  const { kategori } = await searchParams
  const db = await getDb()

  const allPublished = await db
    .select()
    .from(events)
    .where(eq(events.status, 'published'))
    .orderBy(events.finalDate, events.finalStartTime)

  const filtered = kategori
    ? allPublished.filter((e) => e.categories.includes(kategori))
    : allPublished

  // Group by date
  const dateMap = new Map<string, typeof filtered>()
  for (const event of filtered) {
    const key = event.finalDate ?? '__nodate__'
    if (!dateMap.has(key)) dateMap.set(key, [])
    dateMap.get(key)!.push(event)
  }

  const sortedDates = [...dateMap.keys()].sort((a, b) => {
    if (a === '__nodate__') return 1
    if (b === '__nodate__') return -1
    return a.localeCompare(b)
  })

  const activeCategories = [...new Set(allPublished.flatMap((e) => e.categories))]

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Program</h1>
          <p className="text-cream/70">10.–14. august 2026 · Sagene, Oslo</p>
        </div>
      </div>

      {/* Kategorifilter */}
      {activeCategories.length > 0 && (
        <div className="bg-white border-b border-border px-4 sm:px-6 py-3">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center">
            <span className="text-xs text-dark/40 font-medium mr-1">Filtrer:</span>
            <Link
              href="/program"
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                !kategori
                  ? 'bg-green text-cream border-green'
                  : 'border-border text-dark/60 hover:border-green/40'
              }`}
            >
              Alle
            </Link>
            {activeCategories.map((cat) => (
              <Link
                key={cat}
                href={`/program?kategori=${cat}`}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  kategori === cat
                    ? 'bg-green text-cream border-green'
                    : 'border-border text-dark/60 hover:border-green/40'
                }`}
              >
                {categoryLabel(cat)}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length > 0 ? (
          <div className="space-y-10">
            {sortedDates.map((dateKey) => {
              const dayEvents = dateMap.get(dateKey)!
              const label = dateKey === '__nodate__' ? 'Dato ikke satt' : formatDateFull(dateKey)
              return (
                <section key={dateKey}>
                  <h2 className="font-display font-bold text-xl text-dark border-b border-border pb-3 mb-5">
                    {label}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayEvents.map((event) => (
                      <EventCard key={event.id} event={event} activeCategory={kategori} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <div className="border border-border rounded-sm bg-white p-16 text-center max-w-lg mx-auto mt-8">
            <p className="font-display font-bold text-2xl text-dark/40 mb-3">
              {kategori ? `Ingen arrangementer i kategorien "${categoryLabel(kategori)}"` : 'Programmet fylles fortløpende'}
            </p>
            {kategori ? (
              <Link href="/program" className="text-green text-sm font-medium hover:underline">
                Vis alle arrangementer
              </Link>
            ) : (
              <Link
                href="/bli-med#arrangement"
                className="bg-rust text-cream font-semibold px-6 py-3 rounded inline-block hover:bg-rust-light transition-colors"
              >
                Meld inn arrangement
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
