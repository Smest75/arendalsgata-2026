'use server'

import { getDb } from '@/db'
import { offers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateOffer(formData: FormData) {
  const id = Number(formData.get('id'))
  if (!id) return

  const db = await getDb()

  await db.update(offers).set({
    businessName: (formData.get('businessName') as string)?.trim(),
    address: (formData.get('address') as string)?.trim(),
    businessType: formData.get('businessType') as string,
    description: (formData.get('description') as string)?.trim(),
    offerTypes: formData.getAll('offerTypes') as string[],
    days: formData.getAll('days') as string[],
    openingHours: (formData.get('openingHours') as string)?.trim() || null,
    website: (formData.get('website') as string)?.trim() || null,
    contactName: (formData.get('contactName') as string)?.trim(),
    email: (formData.get('email') as string)?.trim(),
    phone: (formData.get('phone') as string)?.trim() || null,
    canPublish: formData.get('canPublish') as string,
    internalNotes: (formData.get('internalNotes') as string)?.trim() || null,
  }).where(eq(offers.id, id))

  revalidatePath('/admin')
  revalidatePath('/tilbud')
  revalidatePath('/')
  redirect('/admin')
}
