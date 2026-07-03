'use client'

import { useTransition } from 'react'
import { updateEventStatus, updateVenueStatus, updateInterestStatus, updateOfferStatus } from './actions'

const STATUS_OPTIONS = [
  { value: 'new', label: 'Ny', color: 'bg-blue-100 text-blue-700' },
  { value: 'in_review', label: 'Under vurdering', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'approved', label: 'Godkjent', color: 'bg-green/20 text-green' },
  { value: 'published', label: 'Publisert', color: 'bg-green text-cream' },
  { value: 'cancelled', label: 'Avlyst', color: 'bg-rust/10 text-rust' },
]

const SIMPLE_STATUS = [
  { value: 'new', label: 'Ny', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Kontaktet', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'done', label: 'Ferdig', color: 'bg-green/20 text-green' },
]

type Type = 'event' | 'venue' | 'interest' | 'offer'

export function StatusSelect({ id, currentStatus, type }: { id: number; currentStatus: string; type: Type }) {
  const [isPending, startTransition] = useTransition()
  const options = type === 'event' ? STATUS_OPTIONS : SIMPLE_STATUS

  const current = options.find((o) => o.value === currentStatus) ?? options[0]

  return (
    <div className="relative">
      <select
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={(e) => {
          const status = e.target.value
          startTransition(() => {
            if (type === 'event') updateEventStatus(id, status)
            else if (type === 'venue') updateVenueStatus(id, status)
            else if (type === 'interest') updateInterestStatus(id, status)
            else updateOfferStatus(id, status)
          })
        }}
        className={`text-xs font-semibold px-2 py-1 rounded-sm border-0 cursor-pointer disabled:opacity-60 ${current.color}`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {isPending && <span className="text-xs text-dark/40 ml-1">...</span>}
    </div>
  )
}
