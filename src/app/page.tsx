import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pro Client Vault — Client history for beauty professionals",
  description:
    "Track every service, keep clear notes, and walk into every appointment knowing exactly where you left off.",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-indigo-600">Pro Client Vault</span>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            The client history app built for beauty professionals
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500">
            Track every service, keep clear notes, and walk into every appointment
            knowing exactly where you left off.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg">Create your free account</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">Sign in</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Preview ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            See how it works
          </p>
          <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
            <p className="text-sm text-gray-400">App preview coming soon</p>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Simple client profiles. Clear service history. Everything in one place.
          </p>
        </div>
      </section>

      {/* ── Problem / Solution ───────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                The problem
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                You finish a service, jot something down, and hope you remember it next time.
                Notes get scattered. Booking apps don&apos;t tell the full story. And your
                memory can only hold so much.
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
                The solution
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Pro Client Vault gives you one simple place to track your clients — what you
                did, when you did it, and anything worth remembering. No clutter. No
                overthinking. Just clear, organized client records when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Built around how you actually work
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-base font-semibold text-gray-900">
                Know your clients without guessing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Pull up their full history in seconds — services, notes, and patterns —
                so every appointment feels intentional.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-base font-semibold text-gray-900">
                Everything in one place
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                No more switching between apps, notebooks, or memory. Each client has one
                clear, organized profile.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-base font-semibold text-gray-900">
                Built for how you actually work
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                No complicated setup. No extra features. Add a client, log a service, and
                keep it moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            How it works
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Add your clients", body: "Create a profile for each client with their contact info and any notes worth keeping." },
              { step: "2", title: "Log each service",  body: "After every appointment, record what you did, the date, and any notes from the session." },
              { step: "3", title: "Review before they return", body: "Open their profile and see everything you've done — in order — so you walk in prepared." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {step}
                </div>
                <p className="mt-4 text-base font-semibold text-gray-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Start tracking your clients today
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Free to try. No credit card required.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg">Create your free account</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Used by estheticians, nail techs, waxers, lash techs, and other beauty professionals.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Pro Client Vault. All rights reserved.
      </footer>

    </main>
  );
}
