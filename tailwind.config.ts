import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        m2f: {
          teal:          "#308882",
          "teal-hover":  "#267a74",
          "teal-active": "#1d6b65",
          dark:          "#3c4c53",
          muted:         "#718d98",
          faint:         "#a0b3ba",
          bg:            "#e8ecee",
          border:        "#d0d9dd",
          "border-card": "#e0e5e8",
          "row-border":  "#f0f2f4",
          accent:        "#ff9270",
        },
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
} satisfies Config;
