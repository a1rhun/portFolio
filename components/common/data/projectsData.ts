import type { ProjectCardData, ProjectCategory, ProjectType } from "@/types/project";

export type {
  ProjectCardData,
  ProjectCategory,
  ProjectType,
} from "@/types/project";

export const typeBadge: Record<ProjectType, string> = {
  개인: "bg-accent/10 text-accent border-accent/25",
  팀: "bg-accent2/10 text-accent2 border-accent2/25",
  수상작: "bg-chart-4/10 text-chart-4 border-chart-4/25",
};

// simpleicons CDN: https://cdn.simpleicons.org/{slug} — 태그명에서 슬러그를 자동 유추한다.
// Notion에서 태그가 추가/변경돼도 코드 수정 없이 대부분 실제 아이콘이 뜨고,
// 브랜드 슬러그가 이름과 다르거나 매칭되는 아이콘이 없는 경우만 아래 예외로 등록한다.
const tagSlugOverrides: Record<string, string> = {
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  "Node.js": "nodedotjs",
  "Nuxt.js": "nuxtdotjs",
  "React Query": "reactquery",
  "TanStack Query": "reactquery",
  "TanStack Table": "reacttable",
  "TanStack Router": "reactrouter",
  "Express.js": "express",
  "Framer Motion": "framer",
  GSAP: "greensock",
  ".NET": "dotnet",
  "C++": "cplusplus",
  "C#": "csharp",
};

// 기본 색이 검정에 가까워 다크 배경에서 안 보이는 슬러그는 흰색으로 강제한다.
const forceWhiteSlugs = new Set(["nextdotjs", "mdx", "vercel", "express", "openai", "github"]);

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getTagIconUrl(name: string): string {
  const slug = tagSlugOverrides[name] ?? slugify(name);
  const color = forceWhiteSlugs.has(slug) ? "/ffffff" : "";
  return `https://cdn.simpleicons.org/${slug}${color}`;
}

export const categories: ProjectCategory[] = ["전체", "개인", "팀", "수상작"];

export const projects: ProjectCardData[] = [
  {
    title: "포트폴리오 웹사이트",
    description: "Next.js 14와 GSAP을 활용한 개인 포트폴리오 사이트.",
    detail:
      "MDX 기반 콘텐츠 시스템으로 프로젝트·경력을 관리하고, ScrollTrigger를 활용한 인터랙티브 애니메이션을 구현했습니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    type: "개인",
    role: "풀스택",
    period: "2026.03 -",
    points: [
      "CSS 변수 기반 디자인 토큰 시스템으로 일관된 UI 유지",
      "GSAP ScrollTrigger로 스크롤 연동 시차 효과 구현",
      "next-mdx-remote 기반 정적 콘텐츠 파이프라인 설계",
    ],
    github: "https://github.com/a1rhun/portfolio",
    featured: true,
  },
  {
    title: "커뮤니티 플랫폼",
    description: "48시간 해커톤에서 대상을 수상한 실시간 커뮤니티 플랫폼.",
    detail:
      "Firebase Realtime DB와 React로 48시간 내에 MVP를 완성했습니다. 실시간 채팅, 게시판, 알림 기능을 포함합니다.",
    tags: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
    type: "수상작",
    role: "프론트엔드 리드",
    team: "3",
    period: "2025.11",
    points: [
      "Firebase Realtime DB 구독 패턴으로 지연 50ms 이하의 실시간 채팅 구현",
      "48시간 내 디자인부터 배포까지 완료, 팀원 역할 분배 주도",
      "심사위원단 대상 수상 (50팀 중 1위)",
    ],
    github: "https://github.com/a1rhun/community-platform",
    featured: true,
  },
  {
    title: "기업 홈페이지 리뉴얼",
    description: "Next.js 기반 기업 홈페이지 유지보수 및 리뉴얼 프로젝트.",
    detail:
      "레거시 PHP 페이지를 Next.js App Router 기반으로 마이그레이션하고, 디자인 시스템을 새로 구축했습니다.",
    tags: ["Next.js", "TypeScript", "Storybook", "Sass"],
    type: "팀",
    role: "프론트엔드",
    team: "4",
    period: "2025.03 - 2025.12",
    points: [
      "Lighthouse 성능 점수 56 → 94 개선 (이미지 최적화, 코드 스플리팅)",
      "Storybook 기반 컴포넌트 라이브러리 40+ 컴포넌트 구축",
      "주 5일제 협업, 스프린트 리뷰·회고 주도",
    ],
    github: "https://github.com/a1rhun/company-homepage",
  },
  {
    title: "대시보드 SaaS",
    description: "팀 내부 데이터 시각화용 실험적 SaaS 대시보드 프로토타입.",
    detail:
      "Recharts와 React Query를 조합해 실시간 데이터 갱신이 가능한 대시보드를 구현했습니다. 사용자 맞춤 위젯 레이아웃을 지원합니다.",
    tags: ["React", "Recharts", "React Query", "Zustand"],
    type: "개인",
    role: "풀스택",
    period: "2025.08 - 2025.10",
    points: [
      "드래그 앤 드롭 위젯 레이아웃 편집 기능 구현 (react-grid-layout)",
      "React Query staleTime 튜닝으로 API 호출 수 60% 감소",
    ],
    github: "https://github.com/a1rhun/dashboard-saas",
  },
];
