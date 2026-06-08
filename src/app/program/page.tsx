import { db } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EventCard from '@/components/EventCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Program — Arendalsgata 2026',
}

export default async function ProgramPage() {
  const publishedEvents = await db
    .select()
    .from(events)
    .where(eq(events.status, 'published'))
    .orderBy(events.finalDate)

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Program</h1>
          <p className="text-cream/70">10.–14. august 2026 · Sagene, Oslo</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {publishedEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="border border-border rounded-sm bg-white p-16 text-center max-w-lg mx-auto mt-8">
            <p className="font-display font-bold text-2xl text-dark/40 mb-3">
              Programmet fylles fortløpende
            </p>
            <p className="text-dark/40 text-sm leading-relaxed mb-8">
              De første arrangementene publiseres snart. Har du en idé?
            </p>
            <Link
              href="/bli-med#arrangement"
              className="bg-rust text-cream font-semibold px-6 py-3 rounded inline-block hover:bg-rust-light transition-colors"
            >
              Meld inn arrangement
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
