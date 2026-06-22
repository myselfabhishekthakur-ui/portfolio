"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// "Hello" in a handful of languages.
const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Guten tag",
  "こんにちは",
  "안녕하세요",
  "Olá",
  "Привет",
  "مرحبا",
  "你好",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Step through the greetings — the first lingers, the rest flick by fast.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (index >= greetings.length - 1) {
      const t = setTimeout(() => setDone(true), 700);
      return () => clearTimeout(t);
    }
    const delay = index === 0 ? 650 : 160;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [index]);

  // Restore scrolling after the curtain has lifted.
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
      }, 900);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-4xl font-normal text-white/80 sm:text-5xl"
          >
            {greetings[index]}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
