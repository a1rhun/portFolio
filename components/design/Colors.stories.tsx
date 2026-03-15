import type { Meta } from "@storybook/react";
import type React from "react";

const meta: Meta = {
  title: "Design/Colors",
  parameters: { layout: "fullscreen" },
};

export default meta;

// ── Data ──────────────────────────────────────────────────────────────────────

const semanticTokens = [
  {
    label: "background",
    variable: "--background",
    hex: "#070C0D",
    tailwindBg: "bg-background",
    description: "페이지 배경",
  },
  {
    label: "foreground",
    variable: "--foreground",
    hex: "#F0F4F4",
    tailwindBg: "bg-foreground",
    description: "기본 텍스트",
  },
  {
    label: "card",
    variable: "--card",
    hex: "#111718",
    tailwindBg: "bg-card",
    description: "카드 배경",
  },
  {
    label: "muted",
    variable: "--muted",
    hex: "hsl(185 15% 12%)",
    tailwindBg: "bg-muted",
    description: "흐린 배경",
  },
  {
    label: "muted-foreground",
    variable: "--muted-foreground",
    hex: "hsl(185 10% 60%)",
    tailwindBg: "bg-muted-foreground",
    description: "흐린 텍스트",
  },
  {
    label: "border",
    variable: "--border",
    hex: "hsl(185 15% 14%)",
    tailwindBg: "bg-border",
    description: "테두리",
  },
  {
    label: "accent",
    variable: "--accent",
    hex: "#0DCADC",
    tailwindBg: "bg-accent",
    description: "Primary — 티얼",
  },
  {
    label: "accent2",
    variable: "--accent2",
    hex: "#10B981",
    tailwindBg: "bg-accent2",
    description: "Secondary — 에메랄드",
  },
] as const;

const paletteScales = [
  {
    name: "Blue",
    colors: [
      { n: 50, hex: "#D9E1F5" },
      { n: 100, hex: "#A4B9E8" },
      { n: 200, hex: "#6A93DB" },
      { n: 300, hex: "#496FAD" },
      { n: 400, hex: "#314C79" },
      { n: 500, hex: "#1A2C49" },
      { n: 600, hex: "#081120" },
    ],
  },
  {
    name: "Teal",
    colors: [
      { n: 50, hex: "#BBEEF8" },
      { n: 100, hex: "#6ACBDB" },
      { n: 200, hex: "#53A2AF" },
      { n: 300, hex: "#3E7B85" },
      { n: 400, hex: "#29565D" },
      { n: 500, hex: "#163338" },
      { n: 600, hex: "#051316" },
    ],
  },
  {
    name: "Green",
    colors: [
      { n: 50, hex: "#C4FBE3" },
      { n: 100, hex: "#6ADBB2" },
      { n: 200, hex: "#54B18F" },
      { n: 300, hex: "#3F886E" },
      { n: 400, hex: "#2B614E" },
      { n: 500, hex: "#193D30" },
      { n: 600, hex: "#081D15" },
    ],
  },
  {
    name: "Gray",
    colors: [
      { n: 50, hex: "#E2E6E6" },
      { n: 100, hex: "#B9BEBF" },
      { n: 200, hex: "#939798" },
      { n: 300, hex: "#6F7373" },
      { n: 400, hex: "#4E5050" },
      { n: 500, hex: "#2E2F30" },
      { n: 600, hex: "#111112" },
    ],
  },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-5">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-border my-10" />;
}

function SemanticSwatch({
  label,
  variable,
  hex,
  tailwindBg,
  description,
}: (typeof semanticTokens)[number]) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`h-16 rounded-xl border border-white/5 ${tailwindBg}`} />
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="font-mono text-[11px] text-accent/70">{variable}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{hex}</p>
        <p className="text-[11px] text-muted-foreground/60">{description}</p>
      </div>
    </div>
  );
}

function PaletteScale({ name, colors }: (typeof paletteScales)[number]) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">{name}</p>
      <div className="grid grid-cols-7 gap-2">
        {colors.map(({ n, hex }) => (
          <div key={n} className="flex flex-col gap-1">
            <div className="h-10 rounded-lg" style={{ backgroundColor: hex }} title={hex} />
            <p className="font-mono text-[10px] text-muted-foreground text-center">{n}</p>
            <p className="font-mono text-[10px] text-muted-foreground/50 text-center">{hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Story ─────────────────────────────────────────────────────────────────────

function Colors() {
  return (
    <div className="bg-background min-h-screen px-10 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-1">Color Tokens</h1>
          <p className="font-mono text-sm text-muted-foreground">
            globals.css · tailwind.config.ts
          </p>
        </div>

        {/* Semantic Tokens */}
        <SectionLabel>Semantic Tokens</SectionLabel>
        <div className="grid grid-cols-4 gap-6">
          {semanticTokens.map((token) => (
            <SemanticSwatch key={token.label} {...token} />
          ))}
        </div>

        <Divider />

        {/* Gradients */}
        <SectionLabel>Gradients</SectionLabel>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2.5">
            <div className="h-16 rounded-xl bg-gradient-accent" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">bg-gradient-accent</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                linear-gradient(135deg, #0DCADC, #10B981)
              </p>
              <p className="text-[11px] text-muted-foreground/60">배경 그라데이션</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="h-16 rounded-xl bg-card border border-border flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">Gradient Text</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">gradient-text</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                linear-gradient(135deg, #0DCADC, #10B981)
              </p>
              <p className="text-[11px] text-muted-foreground/60">텍스트 그라데이션</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Palette Scales */}
        <SectionLabel>Palette Scales</SectionLabel>
        <div className="flex flex-col gap-8">
          {paletteScales.map((scale) => (
            <PaletteScale key={scale.name} {...scale} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Default = {
  render: () => <Colors />,
  name: "Palette",
};
