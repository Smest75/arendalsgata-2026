import { Resend } from 'resend'

const FROM = 'Arendalsgata 2026 <noreply@contact.arendalsgata.no>'
const TO = 'hei@arendalsgata.no'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? '')
}

export async function sendEventNotification(data: {
  title: string
  organizer: string
  email: string
  preferredTime: string
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `Nytt arrangement: ${data.title}`,
    html: `
      <h2>Nytt arrangement sendt inn</h2>
      <p><strong>Tittel:</strong> ${data.title}</p>
      <p><strong>Arrangør:</strong> ${data.organizer}</p>
      <p><strong>E-post:</strong> ${data.email}</p>
      <p><strong>Ønsket tidspunkt:</strong> ${data.preferredTime}</p>
      <p><a href="https://arendalsgata.no/admin">Se i admin →</a></p>
    `,
  })
}

export async function sendVenueNotification(data: {
  name: string
  address: string
  contactName: string
  email: string
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `Nytt lokale: ${data.name}`,
    html: `
      <h2>Nytt lokale registrert</h2>
      <p><strong>Sted:</strong> ${data.name}</p>
      <p><strong>Adresse:</strong> ${data.address}</p>
      <p><strong>Kontakt:</strong> ${data.contactName} — ${data.email}</p>
      <p><a href="https://arendalsgata.no/admin">Se i admin →</a></p>
    `,
  })
}

export async function sendInterestNotification(data: {
  name: string
  email: string
  personType: string
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `Ny interessemelding fra ${data.name}`,
    html: `
      <h2>Ny interessemelding</h2>
      <p><strong>Navn:</strong> ${data.name}</p>
      <p><strong>E-post:</strong> ${data.email}</p>
      <p><strong>Type:</strong> ${data.personType}</p>
      <p><a href="https://arendalsgata.no/admin">Se i admin →</a></p>
    `,
  })
}
