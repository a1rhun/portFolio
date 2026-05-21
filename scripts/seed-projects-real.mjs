import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, "../.env.local"), "utf-8")
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
      "Notion CMS 기반 콘텐츠 관리, ScrollTrigger를 활용한 인터랙티브 애니메이션, ISR로 자동 갱신되는 서버 컴포넌트 구조.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    type: "개인",
    role: "풀스택",
    period: "2026.03 -",
    points: [
      "Notion CMS 연동으로 코드 수정 없이 프로젝트·활동 데이터 관리",
      "GSAP ScrollTrigger로 Hero 패럴랙스 효과 구현",
      "서버 컴포넌트 전환 + ISR(1h)으로 빌드 성능 및 갱신 주기 최적화",
    ],
    github: "https://github.com/a1rhun/portFolio",
    featured: true,
    order: 1,
  },
  {
    title: "티처포보스 (Teacher For Boss)",
    description: "560만 자영업자를 위한 멘토링 커뮤니티 안드로이드 앱.",
    detail:
      "코엑스 프랜차이즈 창업 박람회 부스 참여로 314명 사전 등록, 구글 플레이 런칭 후 836명 유입. Fragment 생명주기 크래시 해결 및 StickyHeader 성능 최적화 담당.",
    tags: ["Kotlin", "Android", "Clean Architecture", "MVVM"],
    type: "팀",
    role: "Android Developer",
    team: 4,
    period: "2024.03 - 2024.12",
    points: [
      "Fragment/ViewBinding 생명주기 크래시 근본 원인 분석 및 해결",
      "StickyHeader 높이 캐싱·경량 스크롤 로직으로 프레임 드롭 제거",
      "구글 플레이 런칭, 박람회 IR 시연 안정화 달성",
    ],
    github: "https://github.com/teacher-for-boss/teacher-for-boss-android",
    demo: "https://play.google.com/store/apps/details?id=com.company.teacherforboss",
    featured: true,
    order: 2,
  },
  {
    title: "네스팅 (Nesting)",
    description: "키덜트 구매대행 웹 서비스 프론트엔드.",
    detail:
      "React 기반 웹 프론트엔드 개발. 코드 분할·지연 로딩으로 초기 번들 최적화, SCSS 스타일 시스템 구축.",
    tags: ["React", "JavaScript", "SCSS", "Vite"],
    type: "팀",
    role: "Frontend Developer",
    period: "2025.01 - 2025.06",
    points: [
      "코드 분할·지연 로딩 도입으로 초기 로드 성능 개선",
      "SCSS 공통 변수 중앙 관리로 스타일 중복 대폭 감소",
      "기획·디자인·백엔드와 협업하여 요구사항 기술적 해석 및 구현",
    ],
    github: "https://github.com/nesting2025/nesting-frontend",
    featured: false,
    order: 3,
  },
  {
    title: "타피오카 (Tapioca)",
    description: "오픈소스 개발자 대회 출품작 — 웹 개발 보조 오픈소스 서비스.",
    detail:
      "TeamTapioca 팀으로 참여한 오픈소스 프로젝트. 랜딩·가이드 페이지 UI 구현 및 디자인 토큰·공통 컴포넌트 시스템 구축.",
    tags: ["Frontend", "JavaScript"],
    type: "팀",
    role: "Frontend Developer",
    period: "2025.07 - 2025.08",
    points: [
      "오픈소스 서비스 초기 버전 랜딩·가이드 페이지 구현",
      "버튼/배지/카드 공통 컴포넌트 및 디자인 토큰 정의로 스타일 일관성 확보",
    ],
    github: "https://github.com/2025-oss-Tapioca",
    featured: false,
    order: 4,
  },
  {
    title: "따라가 (TTARAGA)",
    description: "따릉이 순환경로 추천 써드파티 앱 — 공개SW프로젝트 과목.",
    detail:
      "Spring Boot REST API 설계, GraphHopper 경사도·도로유형 가중치로 최적 경로 산출, 공공데이터 수집·AWS RDS 적재, Docker+EC2+Nginx 배포. PM으로 이슈·PR 템플릿 및 브랜치 전략도 수립.",
    tags: ["Spring Boot", "Java", "AWS", "Docker", "MariaDB"],
    type: "팀",
    role: "Backend Developer / PM",
    period: "2025.07 - 2025.08",
    points: [
      "GraphHopper에 경사도·도로유형 가중치 적용, 구간 단위 최적 경로 산출",
      "공공데이터 10분 주기 갱신 → AWS RDS 적재 파이프라인 구축",
      "Docker + EC2 + Nginx HTTPS 분리 배포 완료",
      "이슈·PR 템플릿·브랜치 전략 수립으로 협업 흐름 표준화",
    ],
    github: "https://github.com/a1rhun/TTARAGA",
    featured: false,
    order: 5,
  },
];

async function deleteAll() {
  console.log("기존 Projects 행 삭제 중...");
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: DB_ID,
      start_cursor: cursor,
    });
    for (const page of res.results) {
      await notion.pages.update({ page_id: page.id, archived: true });
      process.stdout.write(".");
    }
    cursor = res.has_more ? res.next_cursor : null;
  } while (cursor);
  console.log("\n삭제 완료\n");
}

async function seed() {
  console.log(`Projects DB에 ${projects.length}개 추가 중...\n`);
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
    if (p.detail)
      props.Detail = { rich_text: [{ text: { content: p.detail } }] };
    if (p.points)
      props.Points = {
        rich_text: [{ text: { content: p.points.join("\n") } }],
      };
    if (p.team) props.Team = { number: p.team };
    if (p.github) props.GitHub = { url: p.github };
    if (p.demo) props.Demo = { url: p.demo };

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: props,
    });
    console.log(`✓ ${p.title}`);
  }
  console.log("\n완료!");
}

await deleteAll();
await seed();
