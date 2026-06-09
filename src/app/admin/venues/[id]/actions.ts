'use server'

import { getDb } from '@/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateVenue(formData: FormData) {
  const id = Number(formData.get('id'))
  if (!id) return

  const db = await getDb()
  await db.update(venues).set({
    name: (formData.get('name') as string)?.trim() || undefined,
    address: (formData.get('address') as string)?.trim() || undefined,
    type: (formData.get('type') as string) || undefined,
    description: (formData.get('description') as string)?.trim() || undefined,
    capacity: (formData.get('capacity') as string) || undefined,
    availability: (formData.get('availability') as string)?.trim() || undefined,
    canOthersArrange: (formData.get('canOthersArrange') as string) || undefined,
    contactName: (formData.get('contactName') as string)?.trim() || undefined,
    email: (formData.get('email') as string)?.trim() || undefined,
    phone: (formData.get('phone') as string)?.trim() || null,
    internalNotes: (formData.get('internalNotes') as string)?.trim() || null,
  }).where(eq(venues.id, id))

  revalidatePath('/admin')
  redirect('/admin')
}
