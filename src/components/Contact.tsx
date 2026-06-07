import Reveal from "@/components/Reveal";
import { profile, socials, footerLinks } from "@/data/content";

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="w-full px-6 py-24 sm:px-12 sm:py-28 lg:px-14">
        {/* Headline */}
        <Reveal>
          <h2 className="font-serif leading-[0.85]">
            <span className="block text-5xl font-medium text-white/55 sm:text-6xl md:text-7xl">
              Let&apos;s work
            </span>
            <span className="block text-7xl font-semibold sm:text-8xl md:text-[9rem]">
              together
            </span>
          </h2>
        </Reveal>

        {/* Contact details */}
        <div className="mt-40 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 sm:grid-cols-3 sm:gap-8">
          <div className="text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 block text-xl transition-colors hover:text-white/70"
            >
              {profile.email}
            </a>
          </div>

          <div className="text-left sm:text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Phone
            </p>
            <p className="mt-5 text-xl">{profile.phone}</p>
          </div>

          <div className="text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
              Socials
            </p>
            <div className="mt-5 space-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[15px] text-white/85 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 grid grid-cols-1 items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:grid-cols-3">
          <span className="text-left">Version: Next.js &apos;26 Edition</span>
          <span className="text-left sm:text-center">Location: {profile.location}</span>
          <div className="flex gap-5 sm:justify-end">
            {footerLinks.map((l) => (
              <a key={l.label} href={l.href} className="underline hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
