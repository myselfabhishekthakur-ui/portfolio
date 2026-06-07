import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, dark }: Props) {
  return (
    <Reveal className="mb-16">
      <p className={`eyebrow ${dark ? "text-white/40" : ""}`}>{eyebrow}</p>
      <h2
        className={`display-title mx-auto mt-4 max-w-[12ch] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
