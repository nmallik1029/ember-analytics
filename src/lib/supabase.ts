import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !anonKey) {
  // Warn early but avoid throwing during module evaluation so dev server can still run.
  console.warn(
    'Supabase env vars are not fully set: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

let _supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    if (!url || !anonKey) {
      throw new Error(
        'Supabase client not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
      )
    }
    _supabase = createClient(url, anonKey)
  }
  return _supabase
}

export function createServiceClient(): SupabaseClient {
  if (!serviceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY for service client')
  if (!url) throw new Error('Missing SUPABASE_URL for service client')
  return createClient(url, serviceKey)
}

export default getSupabaseClient
