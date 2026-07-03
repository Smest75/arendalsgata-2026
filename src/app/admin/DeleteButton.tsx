'use client'

import { useTransition } from 'react'
import { deleteEvent, deleteVenue, deleteInterest, deleteOffer } from './actions'

type Type = 'event' | 'venue' | 'interest' | 'offer'

export function DeleteButton({ id, type }: { id: number; type: Type }) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('Er du sikker på at du vil slette dette? Dette kan ikke angres.')) return
    startTransition(() => {
      if (type === 'event') deleteEvent(id)
      else if (type === 'venue') deleteVenue(id)
      else if (type === 'interest') deleteInterest(id)
      else deleteOffer(id)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs text-rust hover:underline disabled:opacity-40 whitespace-nowrap"
    >
      {isPending ? '...' : 'Slett'}
    </button>
  )
}
