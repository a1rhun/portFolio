import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { projects as staticProjects } from "@/components/common/data/projectsData";
import type { ProjectCardData, ProjectType } from "@/types/project";

function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getTitle(page: PageObjectResponse): string {
  const prop = page.properties["Name"];
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "";
}

function getSelect(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "select" && prop.select) {
    return prop.select.name;
  }
  return "";
}

function getMultiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((s) => s.name);
  }
  return [];
}

function getNumber(page: PageObjectResponse, key: string): number | null {
  const prop = page.properties[key];
  if (prop?.type === "number" && prop.number !== null) {
    return prop.number;
  }
  return null;
}

function getUrl(page: PageObjectResponse, key: string): string | undefined {
  const prop = page.properties[key];
  if (prop?.type === "url" && prop.url) {
    return prop.url;
  }
  return undefined;
}

function getCheckbox(page: PageObjectResponse, key: string): boolean {
  const prop = page.properties[key];
  if (prop?.type === "checkbox") {
    return prop.checkbox;
  }
  return false;
}

function mapNotionPage(page: PageObjectResponse): ProjectCardData {
  const type = getSelect(page, "Type") as ProjectType;
  const team = getNumber(page, "Team");
  const points = getRichText(page, "Points");

  return {
    title: getTitle(page),
    description: getRichText(page, "Description"),
    detail: getRichText(page, "Detail") || undefined,
    tags: getMultiSelect(page, "Tags"),
    type: (["개인", "팀", "수상작"].includes(type) ? type : "개인") as ProjectType,
    role: getRichText(page, "Role") || undefined,
    team: team !== null ? String(team) : undefined,
    period: getRichText(page, "Period") || undefined,
    points: points ? points.split("\n").filter(Boolean) : undefined,
    github: getUrl(page, "GitHub"),
    demo: getUrl(page, "Demo"),
    featured: getCheckbox(page, "Featured"),
  };
}

export async function getProjects(): Promise<ProjectCardData[]> {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_PROJECTS_DB_ID;

  if (!token || !dbId) {
    return staticProjects;
  }

  try {
    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const pages = response.results.filter(
      (r): r is PageObjectResponse => r.object === "page" && "properties" in r
    );

    const projects = pages.map(mapNotionPage).filter((p) => p.title);

    return projects.length > 0 ? projects : staticProjects;
  } catch {
    return staticProjects;
  }
}
