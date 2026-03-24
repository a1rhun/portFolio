import type { WhatIDoItem } from "@/types/whatIDo";

export const roles = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Lover",
];

export const whatIDo: WhatIDoItem[] = [
  {
    title: "모던 프론트엔드",
    description:
      "느린 페이지는 사용자를 잃습니다. Core Web Vitals와 SSR/SSG 전략으로 검색에 잘 잡히고 빠른 앱을 설계합니다.",
    tags: ["React", "Vue.js", "Spring", "Next.js", "TypeScript", "Vite", "Webpack"],
  },
  {
    title: "UI/UX & 애니메이션",
    description:
      "좋은 애니메이션은 보이지 않습니다. 사용자가 '자연스럽다'고 느끼는 순간이 잘 만든 인터랙션입니다.",
    tags: ["Framer Motion", "GSAP", "Tailwind CSS", "Figma"],
  },
  {
    title: "개발 경험 & 툴링",
    description:
      "혼자 잘 짜는 코드보다, 팀이 함께 잘 짜는 환경이 더 중요합니다. 문서화와 자동화로 개발자가 개발에 집중할 수 있게 만듭니다.",
    tags: ["Storybook", "Biome", "Git", "Lefthook", "VitePress"],
  },
];
