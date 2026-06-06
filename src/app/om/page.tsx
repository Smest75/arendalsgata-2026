import Link from 'next/link'

export const metadata = {
  title: 'Om festivalen — Arendalsgata 2026',
}

export default function OmPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Om festivalen</h1>
          <p className="text-cream/70">Arendalsgata 2026 · Sagene, Oslo</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-2xl text-dark mb-4">Hva er Arendalsgata 2026?</h2>
          <div className="space-y-4 text-dark/80 leading-relaxed">
            <p>
              Arendalsgata 2026 er en åpen festivaluke på Sagene — for folk fra hele Oslo som vil
              møtes rundt fag, kultur, mat, teknologi, samfunn, bærekraft, litteratur, musikk og
              gode samtaler.
            </p>
            <p>
              Festivalen skjer i og rundt Arendalsgata, hos lokale butikker, serveringssteder,
              lokaler og aktører. Noen arrangementer er små og uformelle. Andre kan være mer
              faglige, kuraterte eller åpne for et større publikum.
            </p>
            <p>
              Ideen er enkel: Mens store deler av samfunns-Norge drar til Arendal, lager vi vår
              egen møteplass her. Landsbyen i byen.
            </p>
          </div>
        </section>

        <section id="praktisk" className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-2xl text-dark mb-6">Praktisk info</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-dark mb-2">Når?</h3>
              <p className="text-dark/70">
                10.–14. august 2026, parallelt med Arendalsuka.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-2">Hvor?</h3>
              <p className="text-dark/70">
                I og rundt Arendalsgata på Sagene, Oslo. Ulike arrangører, ulike lokaler — se
                hvert enkelt arrangement for nøyaktig adresse.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3">Kom deg hit</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="border border-border rounded-sm p-4">
                  <p className="font-semibold text-dark mb-1">🚌 Buss</p>
                  <p className="text-dark/60 text-sm">
                    Busstoppet Arendalsgata. Ruter 54 fra Nydalen / Storo.
                  </p>
                </div>
                <div className="border border-border rounded-sm p-4">
                  <p className="font-semibold text-dark mb-1">🚲 Sykkel</p>
                  <p className="text-dark/60 text-sm">
                    Enkel sykkelavstand fra sentrum. Bysykkel tilgjengelig i nabolaget.
                  </p>
                </div>
                <div className="border border-border rounded-sm p-4">
                  <p className="font-semibold text-dark mb-1">🚶 Gange</p>
                  <p className="text-dark/60 text-sm">
                    Apostlenes hester fungerer fint fra mange deler av Oslo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-2xl text-dark mb-4">Hvem står bak?</h2>
          <p className="text-dark/70 leading-relaxed mb-4">
            Arendalsgata 2026 er initiert av Martin Smestad Hansen, som bor et steinkast fra
            Arendalsgata. Festivalen bygges i samarbeid med lokale aktører, ildsjeler og
            arrangører.
          </p>
          <p className="text-dark/70">
            Kontakt:{' '}
            <a href="mailto:hei@arendalsgata.no" className="text-green font-medium hover:underline">
              hei@arendalsgata.no
            </a>
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/bli-med"
            className="bg-rust text-cream font-semibold px-8 py-4 rounded inline-block hover:bg-rust-light transition-colors text-lg"
          >
            Bli med →
          </Link>
        </div>
      </div>
    </div>
  )
}
