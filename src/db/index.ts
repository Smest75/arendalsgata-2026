let _db: unknown = null

export async function getDb() {
  if (_db) return _db as Awaited<ReturnType<typeof createDb>>

  const result = await createDb()
  _db = result
  return result
}

async function createDb() {
  const { default: postgres } = await import('postgres')
  const { drizzle } = await import('drizzle-orm/postgres-js')
  const schema = await import('./schema')

  const client = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ssl: 'require',
    idle_timeout: 20,
    connect_timeout: 10,
  })

  return drizzle(client, { schema })
}
