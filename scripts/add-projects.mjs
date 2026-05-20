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
    title: "Runtime FC — Card Generator",
    description:
      "런타임 FC 경기 예고 및 선발 명단 소셜 카드를 1080×1080 PNG로 생성하는 도구.",
    detail:
      "선수 DB 기반 번호/이름 자동완성, Match Announcement·Starting XI 카드 2종 지원. html-to-image로 PNG 다운로드 및 모바일 공유 기능 구현.",
    tags: ["Next.js", "TypeScript"],
    type: "개인",
    role: "풀스택",
    period: "2025",
    points: [
      "html-to-image 라이브러리로 DOM → 1080×1080 PNG 변환 구현",
      "선수 DB 기반 번호·이름 자동완성으로 카드 생성 UX 개선",
      "모바일 공유 API 연동으로 SNS 직접 공유 지원",
    ],
    github: "https://github.com/a1rhun/Runtime",
    featured: false,
    order: 6,
  },
  {
    title: "DripNote",
    description:
      "인크로스 UX플랫폼개발팀 온보딩 과제 — Vue 3 + FSD 아키텍처 실전 적용.",
    detail:
      "4주 커리큘럼으로 Vue 3 문법, TypeScript 도입, FSD(Feature-Sliced Design) 아키텍처, 아토믹 디자인 패턴을 순차 학습하고 적용한 프로젝트.",
    tags: ["Vue.js", "TypeScript", "SCSS", "Vite"],
    type: "개인",
    role: "Frontend Developer",
    period: "2025",
    points: [
      "FSD(Feature-Sliced Design) 아키텍처 이해 및 실전 적용",
      "아토믹 디자인 패턴으로 컴포넌트 계층 구조 설계",
      "Pinia 상태 관리 + MSW API 모킹 환경 구축",
    ],
    github: "https://github.com/a1rhun/DripNote",
    featured: false,
    order: 7,
  },
];

async function add() {
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
    if (p.github) props.GitHub = { url: p.github };

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: props,
    });
    console.log(`✓ ${p.title}`);
  }
  console.log("\n완료!");
}

await add();
