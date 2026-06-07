import type { Project } from "@/data/content";

function TechTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink/70"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="pb-12 pt-4">
      {/* Action buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:border-ink"
          >
            GitHub Repo
          </a>
        )}
      </div>

      {/* Screenshots */}
      {project.images.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {project.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="w-full rounded-xl border border-line"
            />
          ))}
        </div>
      )}

      {/* Stat cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {project.stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-line p-5">
            <div className="text-2xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">Project Overview</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{project.overview}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">The Problem</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{project.problem}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">Key Features</h4>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f.title} className="rounded-xl border border-line p-4">
                  <h5 className="text-sm font-semibold">{f.title}</h5>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">Engineering Challenges</h4>
            <div className="mt-4 space-y-4">
              {project.challenges.map((c, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-line">
                  <p className="bg-[#fdf6f3] px-4 py-3 text-sm">
                    <span className="font-semibold">Challenge:</span> {c.challenge}
                  </p>
                  <p className="bg-[#f4faf5] px-4 py-3 text-sm">
                    <span className="font-semibold">Solution:</span> {c.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-[#fafafa] p-5">
            <h4 className="text-sm font-bold uppercase tracking-wide">Project Details</h4>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-dashed border-line pb-3">
                <dt className="text-muted">Role:</dt>
                <dd className="font-semibold">{project.role}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Timeline:</dt>
                <dd className="font-semibold">{project.timeline}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-[#fafafa] p-5">
            <h4 className="text-sm font-bold uppercase tracking-wide">Architecture &amp; Tech Stack</h4>
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Frontend</p>
                <TechTags items={project.tech.frontend} />
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Backend</p>
                <TechTags items={project.tech.backend} />
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Database</p>
                <TechTags items={project.tech.database} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-[#fafafa] p-5">
            <h4 className="text-sm font-bold uppercase tracking-wide">Key Learnings</h4>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70">
              {project.learnings.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-[#fafafa] p-5">
            <h4 className="text-sm font-bold uppercase tracking-wide">Future Roadmap</h4>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70">
              {project.roadmap.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
