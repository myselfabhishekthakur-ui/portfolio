"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/content";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven "zoom-through" intro → homepage reveal (within the pinned region).
  const nameScale = useTransform(scrollYProgress, [0, 0.4], [1, 9]);
  const nameOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.18]);
  const darkOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0.85, 0.18]);
  const contentOpacity = useTransform(scrollYProgress, [0.42, 0.54], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.42, 0.54], [24, 0]);

  const firstName = profile.name.split(" ")[0];

  return (
    <section id="home" ref={ref} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
        {/* Full-bleed portrait background */}
        {profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            src={profile.photo}
            alt={profile.name}
            style={{ scale: photoScale }}
            className="absolute inset-0 z-0 h-full w-full object-cover object-[50%_28%]"
          />
        ) : (
          <div className="absolute inset-0 z-0 flex items-center justify-center text-[20vw] font-bold text-white/20">
            {profile.initials}
          </div>
        )}

        {/* Scrolling name marquee (sits under the dark overlay so it's faint during intro) */}
        <div className="pointer-events-none absolute bottom-[16%] left-0 z-10 w-full select-none overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="px-6 text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase tracking-tight text-white"
                  >
                    {profile.marquee} <span className="text-white/60">-</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll-driven dark overlay (intro = dark, revealed = light) */}
        <motion.div
          style={{ opacity: darkOpacity }}
          className="absolute inset-0 z-20 bg-black"
        />
        {/* Static legibility gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Giant first-name intro */}
        <motion.div
          style={{ opacity: nameOpacity, scale: nameScale }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
        >
          <span className="text-center text-[clamp(3rem,15vw,15rem)] font-extrabold uppercase leading-none tracking-tight text-white">
            {firstName}
          </span>
        </motion.div>

        {/* Homepage content (fades in as the intro lifts) */}
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="z-40">
          {/* Right-aligned tagline */}
          <div className="pointer-events-none absolute right-6 top-1/2 hidden max-w-xs -translate-y-1/2 text-right sm:block md:right-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {profile.eyebrow}
            </p>
            {profile.headline.map((line) => (
              <p
                key={line}
                className="text-2xl font-semibold leading-tight text-white md:text-3xl"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Résumé pill */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-8 right-6 inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink md:right-12"
          >
            RÉSUMÉ
            <span aria-hidden>→</span>
          </a>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block text-lg"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
