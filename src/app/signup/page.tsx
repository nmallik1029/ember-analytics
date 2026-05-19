import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import SignupForm from '@/components/SignupForm'

export default function SignupPage() {
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
                Create account
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">
                Start your portfolio vault.
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Build multiple model portfolios and save your progress with one account.
              </p>
            </div>
            <div className="space-y-4">
              <SignupForm />
            </div>
          </Card>
          <Card className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Already have access?
            </p>
            <p className="text-sm text-slate-600">
              Sign in to continue building and comparing your model portfolios.
            </p>
            <Link href="/login">
              <Button intent="secondary" className="w-full">
                Sign in
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
