export async function GET() {
  const checks: Record<string, unknown> = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
  }

  try {
    const postgres = await import('postgres')
    const { drizzle } = await import('drizzle-orm/postgres-js')
    const client = postgres.default(process.env.DATABASE_URL!, { max: 1, ssl: 'require', connect_timeout: 5 })
    const db = drizzle(client)
    await client`SELECT 1 as ok`
    checks.db = 'ok'
    await client.end()
  } catch (e: unknown) {
    checks.db = e instanceof Error ? e.message : String(e)
  }

  return Response.json(checks)
}
