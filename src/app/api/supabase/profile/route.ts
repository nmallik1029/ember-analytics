import { NextResponse } from 'next/server'
import { createServiceClient } from '../../../../lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email, full_name } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const supabase = createServiceClient()

    const payload = {
      id,
      email: email ?? null,
      full_name: full_name ?? null,
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase.from('profiles').upsert(payload)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
