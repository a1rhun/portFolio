import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── 시맨틱 토큰 ──────────────────────────────────────────
        background: "#070C0D",
        foreground: "#F0F4F4",
        card: {
          DEFAULT: "#111718",
          foreground: "#F0F4F4",
        },
        popover: {
          DEFAULT: "#111718",
          foreground: "#F0F4F4",
        },
        primary: {
          DEFAULT: "#0DCADC",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1A2223",
          foreground: "#F0F4F4",
        },
        muted: {
          DEFAULT: "#1A2223",
          foreground: "#8FA2A3",
        },
        accent: {
          DEFAULT: "#0DCADC",
          foreground: "#FFFFFF",
        },
        accent2: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4343",
          foreground: "#FAFAFA",
        },
        border: "#1E2829",
        input: "#1E2829",
        ring: "#0DCADC",
        chart: {
          "1": "#0DCADC",
          "2": "#10B981",
          "3": "#40768C",
          "4": "#E8C468",
          "5": "#F4A362",
        },

        // ── 디자인 팔레트 (숫자 스케일) ───────────────────────────
        // 사용 예시: bg-blue-300, text-teal-500, border-green-200
        blue: {
          50: "#D9E1F5",
          100: "#A4B9E8",
          200: "#6A93DB",
          300: "#496FAD",
          400: "#314C79",
          500: "#1A2C49",
          600: "#081120",
        },
        teal: {
          50: "#BBEEF8",
          100: "#6ACBDB",
          200: "#53A2AF",
          300: "#3E7B85",
          400: "#29565D",
          500: "#163338",
          600: "#051316",
        },
        green: {
          50: "#C4FBE3",
          100: "#6ADBB2",
          200: "#54B18F",
          300: "#3F886E",
          400: "#2B614E",
          500: "#193D30",
          600: "#081D15",
        },
        gray: {
          50: "#E2E6E6",
          100: "#B9BEBF",
          200: "#939798",
          300: "#6F7373",
          400: "#4E5050",
          500: "#2E2F30",
          600: "#111112",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease forwards",
        fadeIn: "fadeIn 0.4s ease forwards",
        slideIn: "slideIn 0.5s ease forwards",
        slideInRight: "slideInRight 0.5s ease forwards",
        scaleIn: "scaleIn 0.3s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #0DCADC, #10B981)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
