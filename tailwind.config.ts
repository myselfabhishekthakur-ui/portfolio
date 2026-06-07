import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        muted: "#8a8a8a",
        line: "#ededed",
        haze: "#9b9b97", // hero background gray
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      maxWidth: {
        page: "1200px",
        prose: "920px",
      },
    },
  },
  plugins: [],
};

export default config;
