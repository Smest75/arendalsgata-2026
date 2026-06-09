import { MetadataRoute } from 'next'
import { getDb } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb()
  const publishedEvents = await db
    .select({ slug: events.slug, createdAt: events.createdAt })
    .from(events)
    .where(eq(events.status, 'published'))

  const eventUrls: MetadataRoute.Sitemap = publishedEvents.map((e) => ({
    url: `https://arendalsgata.no/program/${e.slug}`,
    lastModified: e.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: 'https://arendalsgata.no', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://arendalsgata.no/program', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://arendalsgata.no/bli-med', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://arendalsgata.no/om', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...eventUrls,
  ]
}
