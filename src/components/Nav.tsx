'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-green text-cream border-b border-green-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-2 hover:opacity-80 transition-opacity">
          <span className="font-display font-bold text-lg tracking-widest uppercase">
            Arendalsgata
          </span>
          <span className="font-display font-bold text-cream/60 text-sm tracking-widest">
            2026
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <Link href="/program" className="hover:text-rust transition-colors">Program</Link>
          <Link href="/bli-med" className="hover:text-rust transition-colors">Bli med</Link>
          <Link href="/om" className="hover:text-rust transition-colors">Om festivalen</Link>
          <Link
            href="/bli-med#arrangement"
            className="bg-rust text-cream px-4 py-1.5 rounded hover:bg-rust-light transition-colors text-sm font-semibold"
          >
            Meld inn arrangement
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Meny"
        >
          <span className={`block w-6 h-0.5 bg-cream transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-green-light px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/program" onClick={() => setOpen(false)}>Program</Link>
          <Link href="/bli-med" onClick={() => setOpen(false)}>Bli med</Link>
          <Link href="/om" onClick={() => setOpen(false)}>Om festivalen</Link>
          <Link
            href="/bli-med#arrangement"
            onClick={() => setOpen(false)}
            className="bg-rust text-cream px-4 py-2 rounded text-center font-semibold"
          >
            Meld inn arrangement
          </Link>
        </div>
      )}
    </nav>
  )
}
