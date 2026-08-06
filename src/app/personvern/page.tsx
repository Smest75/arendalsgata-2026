export const metadata = {
  title: 'Personvern',
  description: 'Hvordan Arendalsgata 2026 behandler personopplysninger fra påmeldinger og skjemaer.',
  alternates: { canonical: 'https://arendalsgata.no/personvern' },
}

export default function PersonvernPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-green text-cream px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Personvern</h1>
          <p className="text-cream/70">Hvordan vi behandler opplysningene dine</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Behandlingsansvarlig</h2>
          <p className="text-dark/70 leading-relaxed">
            Arendalsgata 2026 v/ Martin Smestad Hansen er behandlingsansvarlig for personopplysningene
            som samles inn via denne nettsiden. Kontakt oss på{' '}
            <a href="mailto:hei@arendalsgata.no" className="text-green font-medium hover:underline">
              hei@arendalsgata.no
            </a>{' '}
            ved spørsmål om personvern.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Hvilke opplysninger vi samler inn</h2>
          <p className="text-dark/70 leading-relaxed mb-3">
            Når du sender inn et skjema for arrangement, lokale, virksomhetstilbud eller generell
            interesse, lagrer vi navnet ditt, e-postadressen din, eventuelt telefonnummer, og øvrig
            informasjon du selv skriver inn (beskrivelse, adresse og lignende).
          </p>
          <p className="text-dark/70 leading-relaxed">
            Vi bruker ingen analyse- eller sporingsverktøy på nettsiden.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Hvorfor vi lagrer opplysningene</h2>
          <p className="text-dark/70 leading-relaxed mb-3">Vi bruker opplysningene til å:</p>
          <ul className="list-disc list-outside pl-5 text-dark/70 leading-relaxed space-y-1">
            <li>Planlegge, gjennomføre og administrere årets festival, inkludert å vurdere og følge opp innsendte arrangementer, lokaler og tilbud</li>
            <li>Ta kontakt med deg i etterkant for evaluering av festivalen</li>
            <li>Eventuelt ta kontakt igjen dersom Arendalsgata arrangeres på nytt i fremtidige år</li>
          </ul>
          <p className="text-dark/70 leading-relaxed mt-3">
            Grunnlaget for behandlingen er samtykket du gir ved å sende inn skjemaet.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Hvem som ser opplysningene</h2>
          <p className="text-dark/70 leading-relaxed">
            Navnet på arrangøren av et publisert arrangement vises offentlig på nettsiden og kan bli
            hentet opp av søkemotorer som Google. E-postadresse og telefonnummer vises aldri offentlig
            – de er kun tilgjengelige for oss som administrerer festivalen.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Hvor opplysningene lagres</h2>
          <p className="text-dark/70 leading-relaxed mb-3">
            Opplysningene lagres i en database (Neon, driftet i Frankfurt/EU). Nettsiden er driftet av
            Vercel, og e-postvarsler sendes via Resend. Disse leverandørene behandler opplysninger på
            våre vegne og har egne avtaler for hvordan de håndterer data.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Hvor lenge vi lagrer opplysningene</h2>
          <p className="text-dark/70 leading-relaxed">
            Vi lagrer opplysningene så lenge det er relevant for formålene over, og sletter eller
            anonymiserer dem senest når vi ikke lenger har et grunnlag for å beholde dem. Du kan når
            som helst be om at opplysningene dine slettes tidligere, se under.
          </p>
        </section>

        <section className="bg-white border border-border rounded-sm p-8">
          <h2 className="font-display font-bold text-xl text-dark mb-3">Dine rettigheter</h2>
          <p className="text-dark/70 leading-relaxed mb-3">
            Du har rett til innsyn i, retting av og sletting av opplysningene vi har lagret om deg. Ta
            kontakt på{' '}
            <a href="mailto:hei@arendalsgata.no" className="text-green font-medium hover:underline">
              hei@arendalsgata.no
            </a>{' '}
            for å be om dette, eller om du har andre spørsmål om hvordan vi behandler
            personopplysninger.
          </p>
          <p className="text-dark/70 leading-relaxed">
            Du kan også klage til{' '}
            <a
              href="https://www.datatilsynet.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green font-medium hover:underline"
            >
              Datatilsynet
            </a>{' '}
            dersom du mener vi behandler opplysningene dine i strid med personvernregelverket.
          </p>
        </section>

        <p className="text-dark/40 text-sm text-center">Sist oppdatert 6. august 2026.</p>
      </div>
    </div>
  )
}
