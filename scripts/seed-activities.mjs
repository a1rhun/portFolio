import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, "../.env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
    .filter(([k]) => k),
);

const notion = new Client({ auth: env.NOTION_TOKEN });
const DB_ID = env.NOTION_ACTIVITIES_DB_ID;

const activities = [
  // ── 경력 ──────────────────────────────────────────────────────
  {
    title: "티처포보스 (TeacherForBoss)",
    type: "경력",
    organization: "스타트업",
    period: "2024",
    role: "Android 개발자",
    description:
      "자영업자를 위한 안드로이드 앱. Kotlin으로 StickyHeader 커스텀 구현 및 성능 최적화 담당. 스크롤 병목을 높이 캐싱·레이아웃 평탄화로 해결해 IR 시연 안정화.",
    tags: ["Kotlin", "Android", "Clean Architecture"],
    order: 1,
  },
  {
    title: "프론트엔드 개발 인턴",
    type: "경력",
    organization: "인턴",
    period: "인턴십",
    role: "프론트엔드 개발",
    description:
      "디자인 시안 구현 및 UX 개선 의견 제안. QA 단계 이슈 최소화, 디자인·기획 부서와 협업.",
    tags: ["Frontend", "React"],
    order: 2,
  },

  // ── 활동 ──────────────────────────────────────────────────────
  {
    title: "Farm System 5기",
    type: "활동",
    organization: "동국대학교 SW교육원",
    period: "2026.03 ~ 2026.12",
    role: "AIoT 트랙",
    description: "AIoT 트랙 활동.",
    order: 3,
  },
  {
    title: "GDGoC Dongguk 3기",
    type: "활동",
    organization: "Google Developers Group on Campus",
    period: "2025.09 ~ 2026.07",
    role: "Web/App General Member",
    description:
      "Google Developers Group on Campus 동국대학교 챕터 Web/App 트랙 활동.",
    tags: ["Web", "App"],
    order: 4,
  },
  {
    title: "Farm System 4기",
    type: "활동",
    organization: "동국대학교 SW교육원",
    period: "2025.03 ~ 2026.02",
    role: "빅데이터 트랙",
    description: "빅데이터 트랙 활동.",
    order: 5,
  },
  {
    title: "Runtime FC",
    type: "활동",
    organization: "컴AI학부 축구동아리",
    period: "2025.03 ~ 2026.03",
    role: "운영진",
    description: "컴AI학부 축구동아리 운영진. 대회 우승 주전 선수.",
    order: 6,
  },
  {
    title: "과 대표",
    type: "활동",
    organization: "동국대학교 컴퓨터공학과",
    period: "2024.07 ~ 2025.02",
    role: "과 대표",
    description: "학과 과 대표 역임.",
    order: 7,
  },
  {
    title: "세미콜론",
    type: "활동",
    organization: "컴퓨터공학전공 축구동아리",
    period: "2021.03 ~ 2025.02",
    role: "주장",
    description: "컴퓨터공학전공 축구동아리. 약 1년간 주장으로 활동.",
    order: 8,
  },
  {
    title: "학과 학생회",
    type: "활동",
    organization: "동국대학교 컴퓨터공학과",
    period: "2021.03 ~ 2022.07",
    role: "자치국원 → 자치국장",
    description: "학과 학생회 자치국원으로 시작해 자치국장까지 역임.",
    order: 9,
  },

  // ── 수상 ──────────────────────────────────────────────────────
  {
    title: "FarmSystem 빅데이터 트랙 최종 해커톤",
    type: "수상",
    organization: "동국대학교 SW교육원",
    period: "2025.11.19",
    role: "최고 성적",
    description: "논문 분석 주제 해커톤에서 트랙 최고 성적 달성.",
    order: 10,
  },
  {
    title: "E2GEE Lab 메이커톤 우수상",
    type: "수상",
    organization: "동국대학교 창업기술본부",
    period: "2025.09.27",
    description: "음성인식을 통한 자서전 구현 주제로 우수상 수상.",
    order: 11,
  },
  {
    title: "학기 우등생",
    type: "수상",
    organization: "동국대학교",
    period: "2021.07 / 2022.01 / 2026.02",
    description: "3회 수상 (2021년 1학기, 2021년 2학기, 2025년 2학기).",
    order: 12,
  },
];

async function deleteAll() {
  console.log("기존 행 삭제 중...");
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
  console.log(`Activities DB에 ${activities.length}개 항목 추가 중...\n`);

  for (const a of activities) {
    const props = {
      Name: { title: [{ text: { content: a.title } }] },
      Type: { select: { name: a.type } },
      Organization: { rich_text: [{ text: { content: a.organization } }] },
      Period: { rich_text: [{ text: { content: a.period } }] },
      Order: { number: a.order },
    };

    if (a.role) {
      props.Role = { rich_text: [{ text: { content: a.role } }] };
    }
    if (a.description) {
      props.Description = { rich_text: [{ text: { content: a.description } }] };
    }
    if (a.tags?.length) {
      props.Tags = { multi_select: a.tags.map((name) => ({ name })) };
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: props,
    });
    console.log(`✓ [${a.type}] ${a.title}`);
  }

  console.log("\n완료!");
}

await deleteAll();
await seed();
