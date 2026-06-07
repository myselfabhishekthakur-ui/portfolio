import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechIcon from "@/components/TechIcon";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-page">
        <SectionHeading eyebrow="What I Work With" title="Skills & Technologies" />

        <Reveal>
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.25)] sm:p-10">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
              {skills.map((group) => (
                <div key={group.category} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#7c8cf8]">
                      {group.index}
                    </span>
                    <h3 className="text-sm font-semibold">{group.category}</h3>
                    <span className="ml-2 h-px flex-1 bg-line" />
                  </div>

                  <div className="space-y-2.5">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2.5 transition-colors hover:border-ink/20 hover:bg-[#fafafa]"
                      >
                        <TechIcon name={item.name} icon={item.icon} />
                        <span className="text-sm text-ink/80">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
