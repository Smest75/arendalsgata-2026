'use server'

import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateEvent(formData: FormData) {
  const id = Number(formData.get('id'))
  if (!id) return

  const db = await getDb()
  const title = (formData.get('title') as string)?.trim()
  const categories = formData.getAll('categories') as string[]

  await db.update(events).set({
    ...(title ? { title } : {}),
    categories,
    descriptionEdited: (formData.get('descriptionEdited') as string)?.trim() || null,
    finalDate: (formData.get('finalDate') as string)?.trim() || null,
    finalStartTime: (formData.get('finalStartTime') as string)?.trim() || null,
    finalEndTime: (formData.get('finalEndTime') as string)?.trim() || null,
    finalVenue: (formData.get('finalVenue') as string)?.trim() || null,
    isFree: (formData.get('isFree') as string) || null,
    registrationUrl: (formData.get('registrationUrl') as string)?.trim() || null,
    internalNotes: (formData.get('internalNotes') as string)?.trim() || null,
  }).where(eq(events.id, id))

  revalidatePath('/admin')
  revalidatePath('/program')
  revalidatePath('/')
  redirect('/admin')
}
