"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-6">
      <header
        className={`mx-auto flex max-w-page items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "bg-white/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <a href="#home" className="leading-none">
          <span
            className={`block text-sm font-bold tracking-[0.25em] transition-colors ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            {profile.wordmark.top}
          </span>
          <span
            className={`block text-[9px] font-medium tracking-[0.4em] transition-colors ${
              scrolled ? "text-muted" : "text-white/60"
            }`}
          >
            {profile.wordmark.bottom}
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                scrolled
                  ? "text-ink/70 hover:text-ink"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white md:hidden"
        >
          <div className="space-y-1">
            <span className="block h-[2px] w-4 bg-white" />
            <span className="block h-[2px] w-4 bg-white" />
          </div>
        </button>
      </header>

      {open && (
        <nav className="mx-auto mt-2 max-w-page rounded-3xl bg-white p-4 shadow-lg md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-ink/70 hover:bg-line hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
