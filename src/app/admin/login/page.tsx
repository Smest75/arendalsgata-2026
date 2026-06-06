'use client'

import { useActionState } from 'react'
import { login } from '../actions'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null)

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white border border-border rounded-sm p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl text-dark mb-6">Admin</h1>

        <form action={action} className="space-y-4">
          {state && 'error' in state && (
            <p className="text-rust text-sm bg-rust/10 border border-rust/30 rounded-sm px-3 py-2">
              {state.error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-dark/70 mb-1">Passord</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green text-cream font-semibold py-2 rounded hover:bg-green-light transition-colors disabled:opacity-60"
          >
            {isPending ? 'Logger inn...' : 'Logg inn'}
          </button>
        </form>
      </div>
    </div>
  )
}
