import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local 수동 파싱
const envPath = resolve(__dirname, "../.env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
    .filter(([k]) => k),
);

const notion = new Client({ auth: env.NOTION_TOKEN });
const DB_ID = env.NOTION_PROJECTS_DB_ID;

const projects = [
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
    order: 1,
  },
  {
    title: "커뮤니티 플랫폼",
    description: "48시간 해커톤에서 대상을 수상한 실시간 커뮤니티 플랫폼.",
    detail:
      "Firebase Realtime DB와 React로 48시간 내에 MVP를 완성했습니다. 실시간 채팅, 게시판, 알림 기능을 포함합니다.",
    tags: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
    type: "수상작",
    role: "프론트엔드 리드",
    team: 3,
    period: "2025.11",
    points: [
      "Firebase Realtime DB 구독 패턴으로 지연 50ms 이하의 실시간 채팅 구현",
      "48시간 내 디자인부터 배포까지 완료, 팀원 역할 분배 주도",
      "심사위원단 대상 수상 (50팀 중 1위)",
    ],
    github: "https://github.com/a1rhun/community-platform",
    featured: true,
    order: 2,
  },
  {
    title: "기업 홈페이지 리뉴얼",
    description: "Next.js 기반 기업 홈페이지 유지보수 및 리뉴얼 프로젝트.",
    detail:
      "레거시 PHP 페이지를 Next.js App Router 기반으로 마이그레이션하고, 디자인 시스템을 새로 구축했습니다.",
    tags: ["Next.js", "TypeScript", "Storybook", "Sass"],
    type: "팀",
    role: "프론트엔드",
    team: 4,
    period: "2025.03 - 2025.12",
    points: [
      "Lighthouse 성능 점수 56 → 94 개선 (이미지 최적화, 코드 스플리팅)",
      "Storybook 기반 컴포넌트 라이브러리 40+ 컴포넌트 구축",
      "주 5일제 협업, 스프린트 리뷰·회고 주도",
    ],
    github: "https://github.com/a1rhun/company-homepage",
    featured: false,
    order: 3,
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
    featured: false,
    order: 4,
  },
];

async function seed() {
  console.log(`Projects DB에 ${projects.length}개 항목 추가 중...\n`);

  for (const p of projects) {
    const props = {
      Name: { title: [{ text: { content: p.title } }] },
      Description: { rich_text: [{ text: { content: p.description } }] },
      Tags: { multi_select: p.tags.map((name) => ({ name })) },
      Type: { select: { name: p.type } },
      Role: { rich_text: [{ text: { content: p.role } }] },
      Period: { rich_text: [{ text: { content: p.period } }] },
      Featured: { checkbox: p.featured },
      Order: { number: p.order },
    };

    if (p.detail) {
      props.Detail = { rich_text: [{ text: { content: p.detail } }] };
    }
    if (p.points) {
      props.Points = {
        rich_text: [{ text: { content: p.points.join("\n") } }],
      };
    }
    if (p.team) {
      props.Team = { number: p.team };
    }
    if (p.github) {
      props.GitHub = { url: p.github };
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: props,
    });
    console.log(`✓ ${p.title}`);
  }

  console.log("\n완료!");
}

seed().catch(console.error);
