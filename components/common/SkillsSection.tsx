"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SkillCard, { type Skill } from "./SkillCard";

type TabKey = "Frontend" | "Backend" | "DevOps" | "Tools";

type SkillGroup = {
  category: string;
  skills: Skill[];
};

type TabData = Skill[] | SkillGroup[];

function isGrouped(data: TabData): data is SkillGroup[] {
  return data.length > 0 && "category" in data[0] && "skills" in data[0];
}

const tabs: TabKey[] = ["Frontend", "Backend", "DevOps", "Tools"];

// icon: https://cdn.simpleicons.org/{slug} 또는 {slug}/{color(hex without #)}
// 미지원 기술은 icon 생략 → SkillCard 이니셜 폴백
const skillsByTab: Record<TabKey, TabData> = {
  Frontend: [
    {
      category: "Core",
      skills: [
        {
          name: "JavaScript",
          icon: "https://cdn.simpleicons.org/javascript",
          description:
            "ES6+ 문법과 비동기 처리에 익숙합니다. TypeScript의 기반으로 깊이 이해하고 있습니다.",
          level: "주력",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.simpleicons.org/typescript",
          description:
            "제네릭·유틸리티 타입으로 타입 안전 코드 작성. 런타임 에러를 줄이는 개발 방식을 지향합니다.",
          level: "주력",
        },
        {
          name: "React",
          icon: "https://cdn.simpleicons.org/react",
          description:
            "커스텀 훅·상태 관리 패턴을 활용한 실무 프로젝트 다수. 재사용 가능한 컴포넌트 설계에 익숙합니다.",
          level: "주력",
        },
        {
          name: "Next.js",
          icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
          description:
            "App Router 기반 SSR/SSG 전략과 Core Web Vitals 최적화 경험. 실무 및 개인 프로젝트에 적용했습니다.",
          level: "주력",
        },
        {
          name: "Vue.js",
          icon: "https://cdn.simpleicons.org/vuedotjs",
          description: "Composition API 기반 실무 프로젝트 협업 경험. Options API에도 익숙합니다.",
          level: "실무",
        },
      ],
    },
    {
      category: "Styling",
      skills: [
        {
          name: "Tailwind CSS",
          icon: "https://cdn.simpleicons.org/tailwindcss",
          description:
            "디자인 토큰 기반 시스템을 직접 설계하고 운용. CSS-in-JS 없이도 일관된 스타일 체계를 구축합니다.",
          level: "주력",
        },
        {
          name: "Sass / SCSS",
          icon: "https://cdn.simpleicons.org/sass",
          description: "변수·믹스인·중첩 규칙으로 유지보수 가능한 스타일 코드를 작성합니다.",
          level: "실무",
        },
      ],
    },
    {
      category: "State & Data",
      skills: [
        {
          name: "Zustand",
          description:
            "보일러플레이트 없이 경량 전역 상태를 설계합니다. React 프로젝트의 주요 상태 관리 도구로 사용합니다.",
          level: "실무",
        },
        {
          name: "Pinia",
          icon: "https://cdn.simpleicons.org/pinia",
          description:
            "Vue.js 공식 상태 관리 라이브러리. Composition API 기반 스토어를 설계하고 운용합니다.",
          level: "실무",
        },
        {
          name: "TanStack Query",
          icon: "https://cdn.simpleicons.org/reactquery",
          description:
            "서버 상태 관리와 캐싱 전략을 체계적으로 다룹니다. 불필요한 네트워크 요청을 줄이는 패턴에 익숙합니다.",
          level: "실무",
        },
      ],
    },
    {
      category: "Testing",
      skills: [
        {
          name: "Vitest",
          icon: "https://cdn.simpleicons.org/vitest",
          description: "Vite 기반 유닛 테스트 환경을 구성하고 컴포넌트 및 유틸 함수를 검증합니다.",
          level: "실무",
        },
      ],
    },
    {
      category: "Animation",
      skills: [
        {
          name: "Framer Motion",
          icon: "https://cdn.simpleicons.org/framer",
          description: "whileInView·AnimatePresence를 활용한 인터랙티브 전환 효과를 구현합니다.",
          level: "실무",
        },
        {
          name: "GSAP",
          description: "ScrollTrigger 기반 스크롤 패럴랙스·타임라인 애니메이션을 구현합니다.",
          level: "실무",
        },
        {
          name: "Three.js",
          icon: "https://cdn.simpleicons.org/threedotjs/ffffff",
          description:
            "WebGL 기반 3D 렌더링을 학습 중입니다. 인터랙티브 3D 웹 경험에 관심이 있습니다.",
          level: "학습",
        },
      ],
    },
  ] satisfies SkillGroup[],

  Backend: [
    {
      name: "Node.js",
      icon: "https://cdn.simpleicons.org/nodedotjs",
      description: "Express 기반 REST API 설계 및 개발 경험. 미들웨어 패턴을 이해하고 활용합니다.",
      level: "실무",
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.simpleicons.org/spring",
      description:
        "JPA·Spring MVC를 활용한 백엔드 개발 경험. 프론트-백 통신 구조를 양쪽에서 이해합니다.",
      level: "실무",
    },
  ] satisfies Skill[],

  DevOps: [
    {
      name: "Git",
      icon: "https://cdn.simpleicons.org/git",
      description:
        "브랜치 전략 설계, PR 기반 협업, 이슈 트래킹까지 팀 개발 워크플로우 전반을 운용합니다.",
      level: "주력",
    },
    {
      name: "GitLab",
      icon: "https://cdn.simpleicons.org/gitlab",
      description: "CI/CD 파이프라인 설정과 MR 기반 코드 리뷰 협업 경험이 있습니다.",
      level: "실무",
    },
    {
      name: "Biome",
      icon: "https://cdn.simpleicons.org/biome",
      description:
        "Lint·Format을 단일 도구로 통합해 팀 코드 품질 자동화 파이프라인을 구축한 경험이 있습니다.",
      level: "실무",
    },
    {
      name: "Storybook",
      icon: "https://cdn.simpleicons.org/storybook",
      description: "컴포넌트 단위 문서화와 시각적 회귀 테스트 환경을 구축하고 운용합니다.",
      level: "실무",
    },
    {
      name: "Lefthook",
      description: "Git 훅 기반의 커밋 전 자동 검사 파이프라인을 구성합니다.",
      level: "실무",
    },
    {
      name: "Docker",
      icon: "https://cdn.simpleicons.org/docker",
      description:
        "컨테이너 기반 개발 환경 구성을 학습 중입니다. 로컬 환경 차이를 줄이는 방식에 관심이 있습니다.",
      level: "학습",
    },
    {
      name: "Vercel",
      icon: "https://cdn.simpleicons.org/vercel/ffffff",
      description: "Next.js 프로젝트 배포 및 Preview URL 기반 협업 환경을 운용합니다.",
      level: "실무",
    },
  ] satisfies Skill[],

  Tools: [
    {
      name: "Figma",
      icon: "https://cdn.simpleicons.org/figma",
      description:
        "디자인 시스템·컴포넌트 구조를 이해하며, 디자이너와의 협업 및 직접 구현이 가능합니다.",
      level: "실무",
    },
    {
      name: "Vite",
      icon: "https://cdn.simpleicons.org/vite",
      description:
        "번들러 설정 최적화와 플러그인 구성 경험. Storybook·VitePress 빌드 환경을 직접 구성했습니다.",
      level: "실무",
    },
    {
      name: "VitePress",
      icon: "https://cdn.simpleicons.org/vitepress",
      description:
        "마크다운 기반 기술 문서 사이트를 구축하고 커스텀 테마를 적용한 경험이 있습니다.",
      level: "실무",
    },
  ] satisfies Skill[],
};

// 탭 전환 방향에 따라 슬라이드 방향 결정
const slideVariants = {
  enter: (dir: number) => ({
    x: dir * 80,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir * -80,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  }),
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("Frontend");
  const [direction, setDirection] = useState(0);
  const handleTabChange = (tab: TabKey) => {
    const currentIdx = tabs.indexOf(activeTab);
    const nextIdx = tabs.indexOf(tab);
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setActiveTab(tab);
  };

  const data = skillsByTab[activeTab];

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Tech Stack</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground mt-3">주력부터 학습 중인 것까지</p>
        </AnimatedSection>

        {/* Tab nav */}
        <AnimatedSection delay={0.1} className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 ${
                activeTab === tab
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "text-muted-foreground border border-border hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </AnimatedSection>

        {/* Skill cards — 방향 감지 슬라이드 + 카드 스태거 재실행 */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {isGrouped(data) ? (
                <div className="flex flex-col gap-10">
                  {data.map((group) => (
                    <div key={group.category}>
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                        {group.category}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {group.skills.map((skill, i) => (
                          // activeTab을 key에 포함 → 탭 전환 시 remount로 스태거 애니메이션 재실행
                          <SkillCard key={`${activeTab}-${skill.name}`} {...skill} index={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.map((skill, i) => (
                    <SkillCard key={`${activeTab}-${skill.name}`} {...skill} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
