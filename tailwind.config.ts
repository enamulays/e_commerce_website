import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: "#0c55aa",
        lightBg: "#f4f7f9",
        themeWhite: "#ffffff",
        lightYellow: "#ffd43a",
        borderColor: "#eaebed",
        skyColor: "#0989ff",
        lightText: "#55585b",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      width: {
        17: "4.25rem" /* 68px */,
        18: "4.5rem" /* 72px */,
        19: "4.75rem" /* 76px */,
        21: "5.25rem" /* 84px */,
        22: "5.5rem" /* 88px */,
        23: "5.75rem" /* 92px */,
        25: "6.25rem" /* 100px */,
        26: "6.5rem" /* 104px */,
        27: "6.75rem" /* 108px */,
        29: "7.25rem" /* 116px */,
        30: "7.5rem" /* 120px */,
      },
      height: {
        17: "4.25rem" /* 68px */,
        18: "4.5rem" /* 72px */,
        19: "4.75rem" /* 76px */,
        21: "5.25rem" /* 84px */,
        22: "5.5rem" /* 88px */,
        23: "5.75rem" /* 92px */,
        25: "6.25rem" /* 100px */,
        26: "6.5rem" /* 104px */,
        27: "6.75rem" /* 108px */,
        29: "7.25rem" /* 116px */,
        30: "7.5rem" /* 120px */,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
