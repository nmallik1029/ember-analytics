"use client"
import { useState } from 'react'
import getSupabaseClient from '@/lib/supabase'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const [sent, setSent] = useState(false)
  const [code, setCode] = useState('')

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setSent(true)
      setMessage('Verification code sent — check your email.')
    } catch (err: any) {
      setMessage(err?.message ?? String(err))
    } finally {
      setLoading(false)
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      })
      if (error) throw error

      // Insert profile server-side
      const userId = data?.user?.id ?? data?.session?.user?.id
      if (userId) {
        await fetch('/api/supabase/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, email, full_name: name })
        })
      }

      setMessage('Email verified — you are signed in.')
      setName('')
      setEmail('')
      setPassword('')
      setCode('')
      setSent(false)
    } catch (err: any) {
      setMessage(err?.message ?? String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => (sent ? verifyCode(e) : sendCode(e))} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your name"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@email.com"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>

      {!sent ? (
        <>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
          </div>

          <button
            onClick={sendCode}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send verification code'}
          </button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Verification code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="Enter code from email"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
          </div>

          <button
            onClick={verifyCode}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify code'}
          </button>
        </>
      )}

      {message && <p className="text-sm text-slate-700">{message}</p>}
    </form>
  )
}
