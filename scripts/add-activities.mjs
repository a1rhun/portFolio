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
const DB_ID = env.NOTION_ACTIVITIES_DB_ID;

// 기존에 없는 항목만 추가
const newActivities = [
  {
    title: "네스팅 (Nesting)",
    type: "경력",
    organization: "스타트업",
    period: "2025.01 - 2025.06",
    role: "Frontend Developer",
    description:
      "키덜트 구매대행 웹 서비스. React 코드 분할·지연 로딩으로 초기 로드 성능 개선, SCSS 스타일 시스템 구축.",
    tags: ["React", "JavaScript", "SCSS", "Vite"],
    order: 3,
  },
  {
    title: "108리더스",
    type: "활동",
    organization: "동국대학교",
    period: "2024.11.21 -",
    description:
      "사회공헌·봉사 단체 활동. 농촌봉사활동(2025.06, 24시간) 및 자원봉사 교육 수료.",
    order: 10,
  },
  {
    title: "사물인터넷 아이디어톤 우수상",
    type: "수상",
    organization: "동국대학교 COSS 사업단",
    period: "2025",
    description: "2025 사물인터넷 아이디어톤 우수상 수상.",
    order: 13,
  },
];

async function add() {
  console.log(`Activities DB에 ${newActivities.length}개 추가 중...\n`);
  for (const a of newActivities) {
    const props = {
      Name: { title: [{ text: { content: a.title } }] },
      Type: { select: { name: a.type } },
      Organization: { rich_text: [{ text: { content: a.organization } }] },
      Period: { rich_text: [{ text: { content: a.period } }] },
      Order: { number: a.order },
    };
    if (a.role) props.Role = { rich_text: [{ text: { content: a.role } }] };
    if (a.description)
      props.Description = { rich_text: [{ text: { content: a.description } }] };
    if (a.tags?.length)
      props.Tags = { multi_select: a.tags.map((name) => ({ name })) };

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: props,
    });
    console.log(`✓ [${a.type}] ${a.title}`);
  }
  console.log("\n완료!");
}

await add();
