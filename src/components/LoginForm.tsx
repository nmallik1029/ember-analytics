"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import getSupabaseClient from "@/lib/supabase";
import { Button } from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });
      if (error) throw error;
      setSent(true);
      setMessage("Verification code sent — check your email.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) throw error;
      router.push("/flow");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={sent ? verifyCode : sendCode} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="you@email.com"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>

      {sent ? (
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Verification code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            required
            inputMode="numeric"
            placeholder="Enter code from email"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
        </div>
      ) : null}

      <Button className="w-full" disabled={loading}>
        {loading
          ? sent
            ? "Verifying..."
            : "Sending..."
          : sent
          ? "Verify code"
          : "Send verification code"}
      </Button>

      {message ? <p className="text-sm text-slate-700">{message}</p> : null}
    </form>
  );
}
