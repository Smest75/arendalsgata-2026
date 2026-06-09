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

export default function EventCard({ event, activeCategory }: { event: Event; activeCategory?: string }) {
  const desc = event.descriptionEdited ?? event.description
  const shortDesc = desc.length > 110 ? desc.slice(0, 110) + '...' : desc

  const timeStr = event.finalStartTime
    ? `kl. ${event.finalStartTime}${event.finalEndTime ? `–${event.finalEndTime}` : ''}`
    : null

  return (
    <article className="bg-white border border-border rounded-sm p-5 flex flex-col gap-3 hover:border-green transition-colors">
      <div className="flex flex-wrap gap-1.5">
        {event.categories.slice(0, 2).map((cat) => (
          <Link
            key={cat}
            href={`/program?kategori=${cat}`}
            className={`text-xs font-medium px-2 py-0.5 rounded-sm transition-colors ${
              activeCategory === cat
                ? 'bg-green text-cream'
                : 'bg-dark/8 text-dark/60 hover:bg-dark/12'
            }`}
          >
            {categoryLabel(cat)}
          </Link>
        ))}
        {event.isFree === 'true' && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-green/10 text-green ml-auto">
            Gratis
          </span>
        )}
      </div>

      <h3 className="font-display font-bold text-lg text-dark leading-snug">
        {event.title}
      </h3>

      {(event.finalVenue || timeStr) && (
        <div className="flex flex-col gap-0.5 text-sm text-dark/60">
          {event.finalVenue && <span>{event.finalVenue}</span>}
          {timeStr && <span>{timeStr}</span>}
        </div>
      )}

      <p className="text-sm text-dark/70 leading-relaxed flex-1">{shortDesc}</p>

      <Link
        href={`/program/${event.slug}`}
        className="text-sm font-semibold text-green hover:text-green-light transition-colors"
      >
        Les mer →
      </Link>
    </article>
  )
}
