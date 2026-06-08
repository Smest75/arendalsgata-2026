'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDb } from '@/db'
import { events, venues, interests } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function login(_prev: unknown, formData: FormData) {
  const password = (formData.get('password') as string)?.trim()
  const adminPassword = process.env.ADMIN_PASSWORD?.trim()

  if (!adminPassword || password !== adminPassword) {
    return { error: 'Feil passord.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('admin-session', adminPassword!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
  redirect('/admin/login')
}

export async function updateEventStatus(id: number, status: string) {
  const db = await getDb()
  await db.update(events).set({ status }).where(eq(events.id, id))
  revalidatePath('/admin')
  revalidatePath('/program')
  revalidatePath('/')
}

export async function updateVenueStatus(id: number, status: string) {
  const db = await getDb()
  await db.update(venues).set({ status }).where(eq(venues.id, id))
  revalidatePath('/admin')
}

export async function updateInterestStatus(id: number, status: string) {
  const db = await getDb()
  await db.update(interests).set({ status }).where(eq(interests.id, id))
  revalidatePath('/admin')
}
