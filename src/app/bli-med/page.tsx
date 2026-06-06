import { EventForm, VenueForm, InterestForm } from './forms'

export const metadata = {
  title: 'Bli med — Arendalsgata 2026',
}

function Section({ id, title, sub, children }: {
  id: string
  title: string
  sub: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="bg-white border border-border rounded-sm overflow-hidden">
      <div className="bg-green text-cream px-6 py-5">
        <h2 className="font-display font-bold text-2xl">{title}</h2>
        <p className="text-cream/70 text-sm mt-1">{sub}</p>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  )
}

export default function BliMedPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Bli med</h1>
          <p className="text-cream/80 text-lg leading-relaxed max-w-xl">
            Har du en idé, et lokale, en butikk, en faglig samtale, en konsert, en smaking, en
            quiz eller noe helt annet? Du trenger ikke ha alt klart. Send inn det du har, så tar
            vi kontakt.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <Section
          id="arrangement"
          title="Meld inn arrangement"
          sub="For konkrete ideer og arrangementer"
        >
          <EventForm />
        </Section>

        <Section
          id="lokale"
          title="Registrer sted eller lokale"
          sub="For butikker, serveringssteder, gallerier, bakgårder og møterom"
        >
          <VenueForm />
        </Section>

        <Section
          id="interesse"
          title="Meld interesse"
          sub="For deg som vil bidra, holdes oppdatert eller ikke vet helt ennå"
        >
          <InterestForm />
        </Section>
      </div>
    </div>
  )
}
