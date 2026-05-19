import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f1ea] via-[#f6f7fb] to-[#e9f1f4] px-6 py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Back to home
        </Link>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Sign in
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">
                Access your portfolio vault.
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Sign in to manage multiple model portfolios and continue where you left off.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </div>
              <Button className="w-full">Sign in</Button>
            </div>
          </Card>
          <Card className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              No account yet?
            </p>
            <p className="text-sm text-slate-600">
              Create an account to store multiple model portfolios, track changes, and export educational reports.
            </p>
            <Link href="/signup">
              <Button intent="secondary" className="w-full">
                Create account
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
