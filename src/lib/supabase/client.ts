import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("Supabase URL:", supabaseUrl)
  console.log("Supabase Key:", supabaseAnonKey)

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}