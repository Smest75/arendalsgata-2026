import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/70 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row gap-8 justify-between">
        <div>
          <p className="font-display font-bold text-cream tracking-widest uppercase mb-1">
            Arendalsgata 2026
          </p>
          <p>10.–14. august · Sagene, Oslo</p>
          <p className="mt-2">
            <a href="mailto:hei@arendalsgata.no" className="hover:text-cream transition-colors">
              hei@arendalsgata.no
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/program" className="hover:text-cream transition-colors">Program</Link>
          <Link href="/bli-med" className="hover:text-cream transition-colors">Bli med</Link>
          <Link href="/om" className="hover:text-cream transition-colors">Om festivalen</Link>
          <Link href="/om#praktisk" className="hover:text-cream transition-colors">Praktisk info</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/40">
        Laget på Sagene. Åpent for alle.
      </div>
    </footer>
  )
}
