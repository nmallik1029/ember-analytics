"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "How it works"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "FAQ"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [flowIndex, setFlowIndex] = useState(0);

  const flowSlides = [
    { src: "landing/workflow/iter1.png", caption: "Create your account." },
    { src: "landing/workflow/iter2.png", caption: "Refine your strategy choices." },
    { src: "landing/workflow/iter3.png", caption: "Compare portfolio scenarios." },
    { src: "landing/workflow/iter4.png", caption: "Review allocation details." },
    { src: "landing/workflow/iter5.png", caption: "Finalize and share the flow." },
  ];

  const goToPrevious = () => {
    setFlowIndex((current) =>
      (current - 1 + flowSlides.length) % flowSlides.length
    );
  };

  const goToNext = () => {
    setFlowIndex((current) => (current + 1) % flowSlides.length);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-6">
          <div className="w-full max-w-lg rounded-[32px] border border-white/70 bg-white/95 p-8 shadow-[0_40px_80px_-50px_rgba(15,23,42,0.6)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Account required
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-slate-500"
              >
                Close
              </button>
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              Sign in to build and save portfolios.
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              You will need an account to create, store, and compare multiple
              model portfolios. This keeps your work organized and private.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/login">
                <Button>Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button intent="secondary">Create account</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <header
        className={`fixed left-0 top-0 z-40 w-full border-b transition ${
          isScrolled
            ? "border-slate-900/10 bg-slate-900/5 shadow-sm backdrop-blur-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex w-full items-center justify-between px-8 py-6 sm:px-12">
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-800">
            EMBER
          </div>
          <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-slate-500">
            <Link href="#features">Features</Link>
            <Link href="#benefits">Benefits</Link>
            <Link href="/signup">Sign up</Link>
          </nav>
        </div>
      </header>

      <main className="flex w-full flex-col pt-[76px]">
          <section className="relative isolate -mt-[76px] flex min-h-screen items-start justify-start overflow-hidden px-4 pb-12 pt-[96px] sm:px-6">          
            <img
            src="landing/landing.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[center_100%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-b from-transparent to-white" />
          <div className="pointer-events-none absolute right-[8%] top-[18%] z-0 hidden h-40 w-56 sm:block">
            <span className="wind-stroke wind-stroke-1" />
            <span className="wind-stroke wind-stroke-2" />
            <span className="wind-stroke wind-stroke-3" />
          </div>
          <div className="relative z-10 w-full max-w-6xl">
            <div className="px-4 pt-6 text-left sm:px-6 sm:pt-10">
          <h1 className="reveal text-4xl font-semibold text-slate-900 sm:text-6xl" data-reveal>
            Welcome to EMBER.
          </h1>
          <p className="reveal reveal-delay-1 mt-4 max-w-xl text-base text-slate-600" data-reveal>
            The fastest way to create and track stock portfolios.
          </p>
          <div className="reveal reveal-delay-2 mt-8 flex justify-start" data-reveal>
            <Button onClick={() => setIsModalOpen(true)}>Get started</Button>
          </div>
            </div>
          </div>
          <a
            href="#features"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400"
          >
            <span className="animate-bounce text-2xl">⌵</span>
          </a>
        </section>

        <div className="mx-auto flex w-full max-w-screen-8xl flex-col gap-28 px-6 pb-20 pt-24">
        <section
          id="features"
          className="grid gap-10 lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-12"
        >
          <div className="reveal space-y-4" data-reveal>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Step through the workflow.
            </h2>
            <p className="max-w-lg text-base text-slate-600">
              Click through each frame to see how the experience unfolds.
            </p>
          </div>
          <div className="reveal reveal-delay-1 flex w-full items-center justify-center gap-4" data-reveal>
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous flow image"
              disabled={flowIndex === 0}
            >
              &lt;
            </button>
            <figure className="w-full max-w-6xl">
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_90px_-60px_rgba(15,23,42,0.55)]">
                <img
                  key={flowSlides[flowIndex].src}
                  src={flowSlides[flowIndex].src}
                  alt={`Flow step ${flowIndex + 1}`}
                  className="flow-slide-image block h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 text-base text-slate-500">
                {flowSlides[flowIndex].caption}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next flow image"
              disabled={flowIndex === flowSlides.length - 1}
            >
              &gt;
            </button>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="h-72 w-full max-w-xl rounded-[32px] border border-slate-200 bg-slate-100" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Build an engineered portfolio, just for you.
            </h2>
            <p className="max-w-lg text-base text-slate-600">
              Tailor every decision with structured guardrails and a clear path
              to execution.
            </p>
          </div>
        </section>

        <section id="benefits" className="reveal py-6 text-center" data-reveal>
          <h2 className="text-2xl font-semibold text-slate-900">
            Start building today.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
            Join investors creating smarter portfolios.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="reveal mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {group.title}
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                {group.links.map((link) => (
                  <p key={link}>{link}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
