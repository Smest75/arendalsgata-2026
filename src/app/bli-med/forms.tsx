'use client'

import { useActionState } from 'react'
import { submitEvent, submitVenue, submitInterest, submitOffer, type ActionState } from './actions'

const inputCls = 'w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm'
const labelCls = 'block text-sm font-medium text-dark/70 mb-1'
const checkCls = 'flex items-center gap-2 text-sm text-dark/80'
const radioCls = 'flex items-center gap-2 text-sm text-dark/80'

function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="bg-green/10 border border-green/30 text-green rounded-sm p-4 text-sm font-medium">
      {message}
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-rust/10 border border-rust/30 text-rust rounded-sm p-4 text-sm">
      {message}
    </div>
  )
}

export function EventForm() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(submitEvent, null)

  if (state && 'success' in state) {
    return <SuccessMessage message="Takk! Vi tar kontakt snart." />
  }

  return (
    <form action={action} className="space-y-5">
      {state && 'error' in state && <ErrorMessage message={state.error} />}

      <div>
        <label className={labelCls}>Hva heter arrangementet? *</label>
        <input name="title" required className={inputCls} placeholder="F.eks. KI-frokost, vinsmaking, bokbad, nabolagsquiz" />
      </div>

      <div>
        <label className={labelCls}>Kort beskrivelse *</label>
        <textarea name="description" required rows={4} className={inputCls} placeholder="2–5 setninger holder. Du trenger ikke skrive perfekt." />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Hvem arrangerer? *</label>
          <input name="organizer" required className={inputCls} placeholder="Person, virksomhet eller org." />
        </div>
        <div>
          <label className={labelCls}>Kontaktperson *</label>
          <input name="contactName" required className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>E-post *</label>
          <input name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Telefon</label>
          <input name="phone" type="tel" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Har du sted/lokale?</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[['yes', 'Ja'], ['no', 'Nei'], ['unsure', 'Usikker']].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="hasVenue" value={v} defaultChecked={v === 'unsure'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Ønsket dag/tidspunkt *</label>
        <input name="preferredTime" required className={inputCls} placeholder="F.eks. tirsdag kveld, onsdag morgen, fleksibelt" />
      </div>

      <div>
        <label className={labelCls}>Hva slags arrangement?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {[
            ['fag', 'Fag / foredrag / samtale'],
            ['kultur', 'Kultur'],
            ['mat', 'Mat og drikke'],
            ['musikk', 'Musikk'],
            ['litteratur', 'Litteratur'],
            ['tech', 'Tech / KI'],
            ['baerekraft', 'Bærekraft'],
            ['barn', 'Barn / familie'],
            ['sosialt', 'Sosialt'],
            ['annet', 'Annet'],
          ].map(([v, l]) => (
            <label key={v} className={checkCls}>
              <input type="checkbox" name="categories" value={v} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Trenger du hjelp til noe?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {[
            ['venue', 'Finne lokale'],
            ['partner', 'Finne samarbeidspartner'],
            ['text', 'Lage tekst'],
            ['registration', 'Påmelding'],
            ['marketing', 'Markedsføring'],
            ['none', 'Nei, vi har kontroll'],
          ].map(([v, l]) => (
            <label key={v} className={checkCls}>
              <input type="checkbox" name="helpNeeded" value={v} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Kan vi publisere dette når det er avklart?</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[['yes', 'Ja'], ['contact_first', 'Ta kontakt først'], ['not_yet', 'Ikke ennå']].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="canPublish" value={v} defaultChecked={v === 'contact_first'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-rust text-cream font-semibold px-6 py-3 rounded hover:bg-rust-light transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {isPending ? 'Sender...' : 'Send inn arrangement'}
      </button>
    </form>
  )
}

export function VenueForm() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(submitVenue, null)

  if (state && 'success' in state) {
    return <SuccessMessage message="Takk! Vi registrerer stedet og tar kontakt." />
  }

  return (
    <form action={action} className="space-y-5">
      {state && 'error' in state && <ErrorMessage message={state.error} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Navn på sted/lokale *</label>
          <input name="name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Adresse *</label>
          <input name="address" required className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Hva slags sted?</label>
        <select name="type" className={inputCls}>
          {[
            ['butikk', 'Butikk'],
            ['serveringssted', 'Serveringssted'],
            ['galleri', 'Galleri'],
            ['moterom', 'Møterom'],
            ['scene', 'Scene'],
            ['bakgard', 'Bakgård'],
            ['kontor', 'Kontor'],
            ['annet', 'Annet'],
          ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Kort beskrivelse *</label>
        <textarea name="description" required rows={3} className={inputCls} placeholder="Hva passer lokalet til? 2–4 setninger holder." />
      </div>

      <div>
        <label className={labelCls}>Omtrent kapasitet</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[['1-10', '1–10'], ['10-25', '10–25'], ['25-50', '25–50'], ['50+', '50+'], ['unsure', 'Usikker']].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="capacity" value={v} defaultChecked={v === 'unsure'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Når kan lokalet være aktuelt? *</label>
        <input name="availability" required className={inputCls} placeholder="F.eks. ettermiddag/kveld, fleksibelt, bare mandag" />
      </div>

      <div>
        <label className={labelCls}>Kan andre arrangere noe hos dere?</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[['yes', 'Ja'], ['maybe', 'Kanskje'], ['self', 'Nei, vi arrangerer selv']].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="canOthersArrange" value={v} defaultChecked={v === 'maybe'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Kontaktperson *</label>
          <input name="contactName" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>E-post *</label>
          <input name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Telefon</label>
          <input name="phone" type="tel" className={inputCls} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-rust text-cream font-semibold px-6 py-3 rounded hover:bg-rust-light transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {isPending ? 'Sender...' : 'Registrer lokale'}
      </button>
    </form>
  )
}

export function OfferForm() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(submitOffer, null)

  if (state && 'success' in state) {
    return <SuccessMessage message="Takk! Vi tar kontakt og legger dere ut på nettsiden." />
  }

  return (
    <form action={action} className="space-y-5">
      {state && 'error' in state && <ErrorMessage message={state.error} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Virksomhetsnavn *</label>
          <input name="businessName" required className={inputCls} placeholder="F.eks. Sagene bokhandel" />
        </div>
        <div>
          <label className={labelCls}>Adresse *</label>
          <input name="address" required className={inputCls} placeholder="F.eks. Arendalsgata 10" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Type virksomhet</label>
        <select name="businessType" className={inputCls}>
          {[
            ['butikk', 'Butikk'],
            ['serveringssted', 'Serveringssted / kafé / bar'],
            ['galleri', 'Galleri / kultursted'],
            ['service', 'Tjenester / service'],
            ['annet', 'Annet'],
          ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Hva vil dere tilby i festivalperioden? *</label>
        <textarea
          name="description"
          required
          rows={4}
          className={inputCls}
          placeholder="Beskriv aktiviteten, produktet eller tilbudet. 2–5 setninger holder."
        />
      </div>

      <div>
        <label className={labelCls}>Type tilbud</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {[
            ['aktivitet', 'Aktivitet / opplevelse'],
            ['produkt', 'Spesielt produkt'],
            ['tilbud', 'Tilbud / rabatt'],
            ['smaksopplevelse', 'Smaksopplevelse / meny'],
            ['utstilling', 'Utstilling'],
            ['annet', 'Annet'],
          ].map(([v, l]) => (
            <label key={v} className={checkCls}>
              <input type="checkbox" name="offerTypes" value={v} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Hvilke dager passer? <span className="text-dark/40">(10.–14. august)</span></label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[
            ['mon', 'Mandag 10.'],
            ['tue', 'Tirsdag 11.'],
            ['wed', 'Onsdag 12.'],
            ['thu', 'Torsdag 13.'],
            ['fri', 'Fredag 14.'],
          ].map(([v, l]) => (
            <label key={v} className={checkCls}>
              <input type="checkbox" name="days" value={v} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Åpningstid i perioden <span className="text-dark/40">(valgfritt)</span></label>
        <input
          name="openingHours"
          className={inputCls}
          placeholder="F.eks. 10–18 hverdager, eller stengt lørdag"
        />
      </div>

      <div>
        <label className={labelCls}>Nettside eller Instagram <span className="text-dark/40">(valgfritt)</span></label>
        <input name="website" className={inputCls} placeholder="https://... eller @brukernavn" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Kontaktperson *</label>
          <input name="contactName" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>E-post *</label>
          <input name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Telefon</label>
          <input name="phone" type="tel" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Kan vi publisere dette?</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[['yes', 'Ja'], ['contact_first', 'Ta kontakt først'], ['not_yet', 'Ikke ennå']].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="canPublish" value={v} defaultChecked={v === 'contact_first'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-rust text-cream font-semibold px-6 py-3 rounded hover:bg-rust-light transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {isPending ? 'Sender...' : 'Send inn tilbud'}
      </button>
    </form>
  )
}

export function InterestForm() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(submitInterest, null)

  if (state && 'success' in state) {
    return <SuccessMessage message="Takk! Vi holder deg oppdatert." />
  }

  return (
    <form action={action} className="space-y-5">
      {state && 'error' in state && <ErrorMessage message={state.error} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Navn *</label>
          <input name="name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>E-post *</label>
          <input name="email" type="email" required className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Hvem er du?</label>
        <div className="flex flex-wrap gap-4 mt-1">
          {[
            ['privatperson', 'Privatperson'],
            ['virksomhet', 'Lokal virksomhet'],
            ['organisasjon', 'Organisasjon'],
            ['fagperson', 'Fagperson'],
            ['frivillig', 'Frivillig / ildsjel'],
            ['annet', 'Annet'],
          ].map(([v, l]) => (
            <label key={v} className={radioCls}>
              <input type="radio" name="personType" value={v} defaultChecked={v === 'privatperson'} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Hva er du interessert i?</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {[
            ['arrange', 'Arrangere noe'],
            ['volunteer', 'Bidra frivillig'],
            ['collaborate', 'Samarbeide med andre'],
            ['food', 'Levere mat / drikke'],
            ['updates', 'Få oppdateringer'],
            ['unknown', 'Vet ikke ennå'],
          ].map(([v, l]) => (
            <label key={v} className={checkCls}>
              <input type="checkbox" name="interests" value={v} /> {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Kort melding <span className="text-dark/40">(valgfritt)</span></label>
        <textarea name="message" rows={3} className={inputCls} placeholder="Skriv gjerne én setning. Eller la stå tomt." />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-green text-cream font-semibold px-6 py-3 rounded hover:bg-green-light transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {isPending ? 'Sender...' : 'Meld interesse'}
      </button>
    </form>
  )
}
