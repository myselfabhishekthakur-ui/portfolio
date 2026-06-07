"use client";

import { useState } from "react";

type Props = { name: string; icon?: string };

// Renders a devicon SVG; falls back to a lettered tile if the icon is missing.
export default function TechIcon({ name, icon }: Props) {
  const [broken, setBroken] = useState(false);

  if (!icon || broken) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded bg-ink/5 text-[11px] font-bold text-ink/60">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt={name}
      loading="lazy"
      onError={() => setBroken(true)}
      className="h-6 w-6 object-contain"
    />
  );
}
