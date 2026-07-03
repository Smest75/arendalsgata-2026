'use server'

import { getDb } from '@/db'
import { offers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateOffer(formData: FormData) {
  const id = Number(formData.get('id'))
  const internalNotes = (formData.get('internalNotes') as string) || null

  const db = await getDb()
  await db.update(offers).set({ internalNotes }).where(eq(offers.id, id))
  revalidatePath('/admin')
  redirect('/admin')
}
