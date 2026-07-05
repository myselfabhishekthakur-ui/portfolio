"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/content";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const featured = projects.filter((p) => !p.isPersonal);
  const personal = projects.filter((p) => p.isPersonal);

  return (
    <section id="projects" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-page">
        {/* Featured Projects */}
        <SectionHeading eyebrow="What I've Built" title="Featured Projects" />

        <div className="mx-auto max-w-prose border-t border-line mb-20">
          {featured.map((project) => {
            const i = projects.findIndex((p) => p.name === project.name);
            const open = openIndex === i;
            return (
              <div key={project.name} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="group flex w-full items-center justify-between gap-4 py-7 text-left"
                >
                  <h3 className="text-3xl font-bold tracking-tight transition-colors group-hover:text-ink/60 sm:text-4xl">
                    {project.name}
                  </h3>
                  <div className="flex shrink-0 items-center gap-5">
                    <span className="hidden text-xs font-medium text-muted sm:block">
                      {project.category}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-2xl font-light text-ink/60"
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ProjectDetail project={project} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Personal Projects */}
        {personal.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="My Side Projects" title="Personal Projects" />
            <div className="mx-auto max-w-prose border-t border-line">
              {personal.map((project) => {
                const i = projects.findIndex((p) => p.name === project.name);
                const open = openIndex === i;
                return (
                  <div key={project.name} className="border-b border-line">
                    <button
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      className="group flex w-full items-center justify-between gap-4 py-7 text-left"
                    >
                      <h3 className="text-3xl font-bold tracking-tight transition-colors group-hover:text-ink/60 sm:text-4xl">
                        {project.name}
                      </h3>
                      <div className="flex shrink-0 items-center gap-5">
                        <span className="hidden text-xs font-medium text-muted sm:block">
                          {project.category}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-2xl font-light text-ink/60"
                        >
                          +
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ProjectDetail project={project} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
