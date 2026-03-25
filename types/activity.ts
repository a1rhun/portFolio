export type ActivityCategory = "전체" | "경력" | "활동" | "수상";
export type ActivityType = Exclude<ActivityCategory, "전체">;

export interface ActivityProject {
  title: string;
  period: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  organization: string;
  period: string;
  role?: string;
  description?: string;
  tags?: string[];
  logo?: string;
  projects?: ActivityProject[];
}
