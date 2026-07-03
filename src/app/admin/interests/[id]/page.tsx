import { getDb } from '@/db'
import { interests } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateInterest } from './actions'
import { SubmitButton } from '../../SubmitButton'

export const dynamic = 'force-dynamic'

const inputCls = 'w-full border border-border rounded-sm px-3 py-2 text-dark bg-cream focus:outline-none focus:border-green text-sm'
const labelCls = 'block text-sm font-medium text-dark/60 mb-1'

const PERSON_TYPE_LABELS: Record<string, string> = {
  private: 'Privatperson',
  organization: 'Organisasjon / lag / forening',
  business: 'Bedrift',
  other: 'Annet',
}

export default async function EditInterestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  const [interest] = await db.select().from(interests).where(eq(interests.id, Number(id))).limit(1)
  if (!interest) notFound()

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-dark text-cream px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="text-cream/50 text-sm hover:text-cream transition-colors">
            ← Admin
          </Link>
          <h1 className="font-display font-bold text-xl mt-1">Interessemelding</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white border border-border rounded-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-dark/40 uppercase tracking-wider">Innsendt informasjon</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className={labelCls}>Navn</p>
              <p className="text-sm text-dark">{interest.name}</p>
            </div>
            <div>
              <p className={labelCls}>E-post</p>
              <a href={`mailto:${interest.email}`} className="text-sm text-green hover:underline">{interest.email}</a>
            </div>
          </div>

          <div>
            <p className={labelCls}>Type</p>
            <p className="text-sm text-dark">{PERSON_TYPE_LABELS[interest.personType] ?? interest.personType}</p>
          </div>

          {interest.interests.length > 0 && (
            <div>
              <p className={labelCls}>Interessert i</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {interest.interests.map((tag) => (
                  <span key={tag} className="text-xs bg-cream border border-border rounded-sm px-2 py-0.5 text-dark/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {interest.message && (
            <div>
              <p className={labelCls}>Melding</p>
              <p className="text-sm text-dark/70 whitespace-pre-wrap">{interest.message}</p>
            </div>
          )}

          <p className="text-xs text-dark/30">
            Innsendt {new Date(interest.createdAt).toLocaleDateString('no-NO', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

        <form action={updateInterest} className="bg-white border border-border rounded-sm p-6 space-y-5">
          <input type="hidden" name="id" value={interest.id} />

          <div>
            <label className={labelCls}>Interne notater</label>
            <textarea
              name="internalNotes"
              rows={4}
              defaultValue={interest.internalNotes ?? ''}
              className={inputCls}
              placeholder="Vises ikke offentlig"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <SubmitButton />
            <Link href="/admin" className="text-dark/50 text-sm hover:text-dark transition-colors">Avbryt</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
