import { Briefcase, GraduationCap, Layers, MapPin, Sparkles, User, Zap } from "lucide-react";
import type { AboutWhatIDoItem, InfoItem } from "@/types/about";

export const infoItems: InfoItem[] = [
  { label: "이름", value: "공기훈", icon: User },
  { label: "위치", value: "서울", icon: MapPin },
  { label: "학력", value: "OO대학교 컴퓨터공학과", icon: GraduationCap },
  { label: "상태", value: "구직 중", icon: Briefcase, highlight: true },
];

export const whatIDo: AboutWhatIDoItem[] = [
  {
    icon: Layers,
    title: "모던 프론트엔드",
    description:
      "React, Next.js App Router, TypeScript로 성능 최적화된 웹 애플리케이션을 구축합니다. SSR/SSG 전략과 Core Web Vitals를 고려한 개발을 지향합니다.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Sparkles,
    title: "UI/UX & 애니메이션",
    description:
      "Framer Motion, GSAP을 활용한 인터랙티브한 인터페이스를 만듭니다. 사용자 경험을 최우선으로 한 접근성 있는 디자인을 구현합니다.",
    tags: ["Framer Motion", "GSAP", "Tailwind CSS"],
  },
  {
    icon: Zap,
    title: "개발 경험 & 툴링",
    description:
      "Storybook, Biome, Lefthook으로 팀 개발 환경을 구축합니다. 컴포넌트 문서화와 코드 품질 자동화에 관심이 많습니다.",
    tags: ["Storybook", "Biome", "Git"],
  },
];
