export type Level = "주력" | "실무" | "학습";

export type Skill = {
  name: string;
  description: string;
  level: Level;
  icon?: string; // cdn.simpleicons.org URL
};

export type TabKey = "Frontend" | "Backend" | "DevOps" | "Tools";

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

export type TabData = Skill[] | SkillGroup[];
