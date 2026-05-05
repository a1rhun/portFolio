import type { ActivityCategory, ActivityItem } from "@/types/activity";

export const activityCategories: ActivityCategory[] = ["전체", "경력", "활동", "수상"];

export const activities: ActivityItem[] = [
  {
    id: "karrot",
    type: "경력",
    title: "(주) 당근마켓",
    organization: "당근마켓",
    period: "2024.11 - (재직 중)",
    description: '"이웃과 더 가까워지는 따뜻한 동네를 만들어요"',
    tags: ["Frontend 개발", "Backend 개발"],
    projects: [
      {
        title: "비즈프로필 기반의 당근 3탭 서비스 개발",
        period: "2025년 상반기 - (진행 중)",
        description:
          "당근 3열(동네지도)의 유입 확보를 위한 비즈프로필 기반의 서비스 개발 (Frontend, Backend)",
      },
      {
        title: "비즈프로필 웹뷰의 플랫폼 개발",
        period: "2024년 상반기",
        description:
          "비즈프로필 웹뷰의 생산성, 안정성, 성능을 개선하기 위한 플랫폼 개발 (Frontend)",
      },
      {
        title: "지역 동네 업체 정보(비즈프로필) 관련 개발",
        period: "2024년 하반기",
        description:
          "이웃의 사장님들과 고객님들을 효과적으로 연결하기 위한 비즈프로필 관련 기능 개발 (Frontend)",
      },
    ],
  },
  {
    id: "intern",
    type: "활동",
    title: "OO기업 인턴십",
    organization: "OO기업",
    period: "2023.06 ~ 2023.12",
    role: "프론트엔드 개발팀",
    description: "React 기반 어드민 대시보드 개발",
  },
  {
    id: "club",
    type: "활동",
    title: "개발 동아리 활동",
    organization: "OO동아리",
    period: "2023.03 ~ 2023.12",
    description: "팀 프로젝트 3건 수행, 스터디 리딩",
  },
  {
    id: "award",
    type: "수상",
    title: "교내 프로그래밍 대회 장려상",
    organization: "OO대학교",
    period: "2022.09",
  },
];
