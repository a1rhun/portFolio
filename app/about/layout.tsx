import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 개발자 공기훈 소개",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
