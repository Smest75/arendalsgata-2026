import Link from 'next/link'
import { categoryLabel, formatDate } from '@/lib/utils'

type Event = {
  slug: string
  title: string
  finalDate: string | null
  finalStartTime: string | null
  finalEndTime: string | null
  finalVenue: string | null
  categories: string[]
  descriptionEdited: string | null
  description: string
  isFree: string | null
  registrationUrl: string | null
}

export default function EventCard({ event }: { event: Event }) {
  const desc = event.descriptionEdited ?? event.description
  const shortDesc = desc.length > 120 ? desc.slice(0, 120) + '...' : desc

  return (
    <article className="bg-white border border-border rounded-sm p-5 flex flex-col gap-3 hover:border-green transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {event.finalDate && (
            <span className="text-xs font-semibold uppercase tracking-wider text-green bg-green/10 px-2 py-1 rounded-sm">
              {formatDate(event.finalDate)}
            </span>
          )}
          {event.categories.slice(0, 2).map((cat) => (
            <span key={cat} className="text-xs font-medium text-rust bg-rust/10 px-2 py-1 rounded-sm">
              {categoryLabel(cat)}
            </span>
          ))}
        </div>
        {event.isFree === 'true' && (
          <span className="text-xs text-green/70 font-medium shrink-0">Gratis</span>
        )}
      </div>

      <h3 className="font-display font-bold text-xl text-dark leading-snug">
        {event.title}
      </h3>

      {(event.finalVenue || event.finalStartTime) && (
        <p className="text-sm text-dark/60">
          {[event.finalVenue, event.finalStartTime && `kl. ${event.finalStartTime}`]
            .filter(Boolean)
            .join(' · ')}
        </p>
      )}

      <p className="text-sm text-dark/70 leading-relaxed">{shortDesc}</p>

      <Link
        href={`/program/${event.slug}`}
        className="text-sm font-semibold text-green hover:text-green-light transition-colors mt-auto"
      >
        Les mer →
      </Link>
    </article>
  )
}
