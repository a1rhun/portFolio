# 공기훈 포트폴리오 — Claude Code 컨텍스트

## 프로젝트 개요

Next.js 14 App Router 기반 개인 포트폴리오 사이트. 다크모드 기본, 한글/영문 혼용.

- **배포**: Vercel 예정
- **로컬 개발 포트**: `3002` (3000은 다른 프로젝트, 3001은 docs)
  - 실행: `npm run dev -- -p 3002`

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router, SSG/ISR) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + CSS Variables |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Theme | next-themes (다크모드 기본) |
| Linter/Formatter | Biome (ESLint + Prettier 대체) |
| Git Hooks | Lefthook (pre-commit → `biome check --write`) |

---

## 디렉토리 구조

```
app/
  layout.tsx        # 루트 레이아웃 (ThemeProvider, CustomCursor)
  page.tsx          # 홈 (Hero, Tech Stack, CTA 섹션)
  globals.css       # CSS 변수, 스크롤바, selection 스타일
  fonts/            # Pretendard Variable .woff2
components/
  layout/
    Header.tsx      # 고정 헤더, 네비, 테마 토글, 모바일 메뉴
    Footer.tsx      # 푸터, 소셜 링크 (GitHub / Email / LinkedIn)
  common/
    CustomCursor.tsx  # dot + ring 커스텀 커서 (터치 제외)
lib/
  utils.ts          # cn() — clsx + tailwind-merge
```

---

## 페이지 구현 현황

| 경로 | 상태 |
|------|------|
| `/` | ✅ 완료 |
| `/about` | 🚧 미구현 |
| `/skills` | 🚧 미구현 |
| `/projects` | 🚧 미구현 |
| `/projects/[slug]` | 🚧 미구현 |
| `/activities` | 🚧 미구현 |
| `/contact` | 🚧 미구현 |

---

## 디자인 시스템

### 색상 (Dark-first, HSL 변수)
- `background`: `#0A0A0F`
- `card`: `#111118`
- `accent` (primary): `#4361EE` (파란색)
- `accent2`: `#7C3AED` (보라색, 그라데이션)
- `foreground`: `#F0F0F5`
- `muted`: `#666666`
- `border`: `#1F1F2E`

### 폰트
- **UI**: Pretendard Variable (로컬 woff2, 한글)
- **코드**: JetBrains Mono (Google Fonts)

### 주요 유틸리티 클래스
- `.glass` — 반투명 배경 + 12px blur
- `.gradient-text` — `#4361EE → #7C3AED` 그라데이션 텍스트
- `bg-gradient-accent` — 135deg 그라데이션 배경
- `font-mono` — JetBrains Mono

---

## 코딩 컨벤션

- 컴포넌트: **PascalCase**, 함수형 (`export default function`)
- 파일: PascalCase (컴포넌트), camelCase (util/lib)
- 스타일: Tailwind 유틸리티 우선, 복잡한 건 CSS Variables
- import 경로: `@/` alias 사용 (절대 경로)
- 커밋: **Conventional Commits** + gitmoji
  - 예: `✨ feat: 어바웃 페이지 구현 (#2)`

---

## Biome 설정 요약

- 들여쓰기: 2칸
- 라인 제한: 100자
- 세미콜론: 항상
- import 자동 정렬
- CSS 파일은 Biome 적용 제외

---

## 작업 시 주의사항

- `npm run check` — 커밋 전 반드시 통과 확인 (Lefthook이 자동 실행)
- 다크모드 기본이므로 라이트모드 스타일도 함께 확인
- `CustomCursor`는 `pointer: coarse` 디바이스(터치)에선 비활성화
- 새 페이지 추가 시 `Header.tsx`의 `navLinks` 배열에도 추가 필요
