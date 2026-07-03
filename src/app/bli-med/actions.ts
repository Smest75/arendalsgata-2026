'use server'

import { getDb } from '@/db'
import { events, venues, interests, offers } from '@/db/schema'
import { generateSlug } from '@/lib/utils'
import { sendEventNotification, sendVenueNotification, sendInterestNotification, sendOfferNotification } from '@/lib/email'

export type ActionState = { success: true } | { error: string } | null

export async function submitEvent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()
  const organizer = (formData.get('organizer') as string)?.trim()
  const contactName = (formData.get('contactName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const hasVenue = (formData.get('hasVenue') as string) || 'unsure'
  const preferredTime = (formData.get('preferredTime') as string)?.trim()
  const categories = formData.getAll('categories') as string[]
  const helpNeeded = formData.getAll('helpNeeded') as string[]
  const canPublish = (formData.get('canPublish') as string) || 'contact_first'

  if (!title || !description || !organizer || !contactName || !email || !preferredTime) {
    return { error: 'Fyll ut alle påkrevde felt.' }
  }

  try {
    const db = await getDb()
    const slug = generateSlug(title)
    await db.insert(events).values({
      slug,
      title,
      description,
      organizer,
      contactName,
      email,
      phone: phone || null,
      hasVenue,
      preferredTime,
      categories,
      helpNeeded,
      canPublish,
      status: 'new',
    })

    try {
      await sendEventNotification({ title, organizer, email, preferredTime })
    } catch {}

    return { success: true }
  } catch (e) {
    console.error('submitEvent error:', e)
    return { error: 'Noe gikk galt. Prøv igjen.' }
  }
}

export async function submitVenue(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = (formData.get('name') as string)?.trim()
  const address = (formData.get('address') as string)?.trim()
  const type = (formData.get('type') as string) || 'annet'
  const description = (formData.get('description') as string)?.trim()
  const capacity = (formData.get('capacity') as string) || 'unsure'
  const availability = (formData.get('availability') as string)?.trim()
  const canOthersArrange = (formData.get('canOthersArrange') as string) || 'maybe'
  const contactName = (formData.get('contactName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()

  if (!name || !address || !description || !contactName || !email || !availability) {
    return { error: 'Fyll ut alle påkrevde felt.' }
  }

  try {
    const db = await getDb()
    await db.insert(venues).values({
      name,
      address,
      type,
      description,
      capacity,
      availability,
      canOthersArrange,
      contactName,
      email,
      phone: phone || null,
      status: 'new',
    })

    try {
      await sendVenueNotification({ name, address, contactName, email })
    } catch {}

    return { success: true }
  } catch (e) {
    console.error('submitVenue error:', e)
    return { error: 'Noe gikk galt. Prøv igjen.' }
  }
}

export async function submitOffer(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const businessName = (formData.get('businessName') as string)?.trim()
  const address = (formData.get('address') as string)?.trim()
  const businessType = (formData.get('businessType') as string) || 'annet'
  const contactName = (formData.get('contactName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const offerTypes = formData.getAll('offerTypes') as string[]
  const description = (formData.get('description') as string)?.trim()
  const days = formData.getAll('days') as string[]
  const openingHours = (formData.get('openingHours') as string)?.trim()
  const website = (formData.get('website') as string)?.trim()
  const canPublish = (formData.get('canPublish') as string) || 'contact_first'

  if (!businessName || !address || !contactName || !email || !description) {
    return { error: 'Fyll ut alle påkrevde felt.' }
  }

  try {
    const db = await getDb()
    await db.insert(offers).values({
      businessName,
      address,
      businessType,
      contactName,
      email,
      phone: phone || null,
      offerTypes,
      description,
      days,
      openingHours: openingHours || null,
      website: website || null,
      canPublish,
      status: 'new',
    })

    try {
      await sendOfferNotification({ businessName, email, offerTypes })
    } catch {}

    return { success: true }
  } catch (e) {
    console.error('submitOffer error:', e)
    return { error: 'Noe gikk galt. Prøv igjen.' }
  }
}

export async function submitInterest(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const personType = (formData.get('personType') as string) || 'privatperson'
  const interestList = formData.getAll('interests') as string[]
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email) {
    return { error: 'Navn og e-post er påkrevd.' }
  }

  try {
    const db = await getDb()
    await db.insert(interests).values({
      name,
      email,
      personType,
      interests: interestList,
      message: message || null,
      status: 'new',
    })

    try {
      await sendInterestNotification({ name, email, personType })
    } catch {}

    return { success: true }
  } catch (e) {
    console.error('submitInterest error:', e)
    return { error: 'Noe gikk galt. Prøv igjen.' }
  }
}
