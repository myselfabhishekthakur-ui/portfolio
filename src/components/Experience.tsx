import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-prose">
        <SectionHeading eyebrow="Where I've Worked" title="Work Experience" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line sm:left-[23px]" />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <Reveal key={job.company + i} delay={i * 0.08}>
                <div className="group relative flex gap-5 sm:gap-7">
                  {/* Node */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm font-bold text-ink/70 shadow-sm transition-all duration-300 group-hover:border-[#4285F4] group-hover:ring-4 group-hover:ring-[#4285F4]/25 group-hover:shadow-[0_0_22px_rgba(66,133,244,0.5)] sm:h-12 sm:w-12">
                    {job.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={job.logo} alt={job.company} className="h-5 w-5" />
                    ) : (
                      job.badge
                    )}
                  </div>

                  <div className="flex-1 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.18)] sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-base font-bold">
                        {job.role}
                        <span className="font-normal text-muted"> · </span>
                        {job.companyHref ? (
                          <a
                            href={job.companyHref}
                            className="font-semibold text-[#2f5fe0] hover:underline"
                          >
                            {job.company}
                          </a>
                        ) : (
                          <span className="font-semibold text-[#2f5fe0]">
                            {job.company}
                          </span>
                        )}
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                      {job.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
