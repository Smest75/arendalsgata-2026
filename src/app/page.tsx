export const revalidate = 60

import Link from 'next/link'
import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EventCard from '@/components/EventCard'

const AKTORER = [
  { name: 'Mellomrommet', type: 'Galleri' },
  { name: 'Rivertz', type: 'Vinbar' },
  { name: 'Sagene bokhandel', type: 'Bokhandel' }
]

export default async function Home() {
  const db = await getDb()
  const publishedEvents = await db
    .select()
    .from(events)
    .where(eq(events.status, 'published'))
    .orderBy(events.finalDate)
    .limit(6)

  return (
    <>
      {/* Hero */}
      <section className="bg-green text-cream px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-4">
              Arendals&shy;gata
              <span className="text-rust block sm:inline sm:ml-4">2026</span>
            </h1>
            <p className="text-xl sm:text-2xl font-display font-semibold text-cream/90 mt-6 mb-4 leading-snug">
              Festivalen for deg som blir igjen i Trygge Oslo
            </p>
            <p className="text-cream/70 text-base sm:text-lg mb-2">
              10.–14. august · Sagene, Oslo
            </p>
            <p className="text-cream/80 text-base sm:text-lg max-w-2xl leading-relaxed mt-4 mb-10">
              Når politikere, medier og påvirkere samles i Arendal, lager vi som blir hjemme våre egne møteplasser i og rundt
              Arendalsgata. Fag, kultur, teknologi, samfunn, mat, drikke og gode samtaler —
              bygget nedenfra, med lokale aktører og ildsjeler.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/program"
                className="bg-cream text-green font-semibold px-6 py-3 rounded text-center hover:bg-cream/90 transition-colors"
              >
                Se program
              </Link>
              <Link
                href="/bli-med#arrangement"
                className="bg-rust text-cream font-semibold px-6 py-3 rounded text-center hover:bg-rust-light transition-colors"
              >
                Meld inn arrangement
              </Link>
              <Link
                href="/bli-med"
                className="border border-cream/40 text-cream font-semibold px-6 py-3 rounded text-center hover:border-cream/70 transition-colors"
              >
                Bli med
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hva er dette */}
      <section className="bg-cream border-b border-border px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dark mb-6 leading-tight">
              En festival i én gate.<br />For folk fra hele byen.
            </h2>
            <p className="text-dark/70 leading-relaxed mb-4">
              Arendalsgata 2026 startet som en liten spøk om mingling ved busstoppet Arendalsgata.
			  Men den traff en nerve: Hva med oss som blir igjen i byen? Kan vi lage
              noe her, med folkene, stedene og miljøene som allerede finnes i nabolaget?
            </p>
            <p className="text-dark/70 leading-relaxed">
              Det kan være en samtale i en bokhandel. En vinsmaking. En faglig frokost. En liten
              intimkonsert. En quizkveld. En utstilling. En workshop. Synliggjøre lokale virksomheter. Et foredrag. En middag. Eller noe vi ikke har tenkt på ennå.
            </p>
          </div>
          <div className="bg-white border border-border rounded-sm p-8">
            <p className="font-display font-bold text-2xl text-green mb-2 leading-snug">
              «Laget på Sagene. Åpent for alle.» 
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold text-dark text-2xl font-display">5 dager</p>
                <p className="text-dark/60">10.–14. august</p>
              </div>
              <div>
                <p className="font-bold text-dark text-2xl font-display">Sagene</p>
                <p className="text-dark/60">Oslo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aktører */}
      <section className="bg-white border-b border-border px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-dark mb-2">
            Foreløpige aktører
          </h2>
          <p className="text-dark/60 text-sm mb-8">
            Disse er i dialog om å delta på et eller annet vis.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AKTORER.map((a) => (
              <div key={a.name} className="border border-border rounded-sm p-4">
                <p className="font-display font-semibold text-dark text-lg">{a.name}</p>
                <p className="text-dark/50 text-sm mt-1">{a.type}</p>
              </div>
            ))}
          </div>
          <p className="text-dark/50 text-sm mt-6">
            Har du et sted, en idé eller lyst til å bidra?{' '}
            <Link href="/bli-med" className="text-green font-medium hover:underline">
              Meld deg på →
            </Link>
          </p>
        </div>
      </section>

      {/* Program */}
      <section className="bg-cream px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-dark">Program</h2>
              <p className="text-dark/60 text-sm mt-1">Fylles fortløpende</p>
            </div>
            <Link href="/program" className="text-sm font-medium text-green hover:underline">
              Se alle arrangementer →
            </Link>
          </div>

          {publishedEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="border border-border rounded-sm bg-white p-12 text-center">
              <p className="font-display font-bold text-xl text-dark/40 mb-2">
                Programmet er under bygging
              </p>
              <p className="text-dark/40 text-sm">
                De første arrangementene publiseres snart.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bli med CTA */}
      <section className="bg-green text-cream px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 leading-tight">
            Har du en idé? Send den inn, gjerne uferdig.
<br />Har du et lokale? Registrer det.
<br />Vil du bare følge med? Meld interesse.
          </h2>
          <p className="text-cream/80 mb-10 max-w-xl leading-relaxed">
            Du trenger ikke ha alt klart. Send inn det du har, så tar vi kontakt.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/bli-med#arrangement"
              className="bg-white text-green p-6 rounded-sm hover:bg-cream transition-colors block"
            >
              <p className="font-display font-bold text-lg mb-1">Jeg vil arrangere noe</p>
              <p className="text-green/70 text-sm">Foredrag, konsert, workshop, samtale, quiz...</p>
            </Link>
            <Link
              href="/bli-med#lokale"
              className="bg-white text-green p-6 rounded-sm hover:bg-cream transition-colors block"
            >
              <p className="font-display font-bold text-lg mb-1">Jeg har et lokale</p>
              <p className="text-green/70 text-sm">Butikk, serveringssted, galleri, bakgård...</p>
            </Link>
            <Link
              href="/bli-med#interesse"
              className="bg-white text-green p-6 rounded-sm hover:bg-cream transition-colors block"
            >
              <p className="font-display font-bold text-lg mb-1">Jeg vil bidra</p>
              <p className="text-green/70 text-sm">Frivillig, fagperson, samarbeidspartner...</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
