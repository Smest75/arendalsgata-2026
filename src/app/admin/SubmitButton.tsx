'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ label = 'Lagre endringer' }: { label?: string }) {
  const { pending } = useFormStatus()
  return (
    <div className="flex flex-col gap-1">
      <button
        type="submit"
        disabled={pending}
        className="bg-green text-cream font-semibold px-6 py-2 rounded hover:bg-green-light transition-colors disabled:opacity-60 w-fit"
      >
        {pending ? 'Lagrer...' : label}
      </button>
      {pending && (
        <p className="text-xs text-dark/40">Lagrer og oppdaterer program...</p>
      )}
    </div>
  )
}
