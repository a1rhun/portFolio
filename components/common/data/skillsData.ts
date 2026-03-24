import type { Skill, SkillGroup, TabData, TabKey } from "@/types/skill";

export function isGrouped(data: TabData): data is SkillGroup[] {
  return data.length > 0 && "category" in data[0] && "skills" in data[0];
}

export const tabs: TabKey[] = ["Frontend", "Backend", "DevOps", "Tools"];

// icon: https://cdn.simpleicons.org/{slug} 또는 {slug}/{color(hex without #)}
// 미지원 기술은 icon 생략 → SkillCard 이니셜 폴백
export const skillsByTab: Record<TabKey, TabData> = {
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
