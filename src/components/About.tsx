import Reveal from "@/components/Reveal";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-prose">
        <p className="text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium leading-relaxed text-ink/90 [text-align:justify]">
          {about.paragraph}
        </p>
      </Reveal>
    </section>
  );
}
