import type { LucideIcon } from "lucide-react";

export interface InfoItem {
  label: string;
  value: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export interface AboutWhatIDoItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}
