import { NextResponse } from 'next/server'
import { createServiceClient } from '../../../../lib/supabase'

/**
 * GET /api/supabase/records
 * Example server-side endpoint that uses the service role key.
 * Replace `your_table` with a real table name from your Supabase project.
 */
export async function GET() {
  try {
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      .limit(100)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
