import { NextResponse } from 'next/server'
import { createServiceClient } from '../../../../lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body
    if (!email || !password) {
      return NextResponse.json({ error: 'email and password are required12' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Use the Admin API to create a user directly.
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Do not return sensitive tokens. Return the created user's public fields.
    return NextResponse.json({ user: data.user })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
