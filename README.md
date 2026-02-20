# 공기훈 포트폴리오

개인 포트폴리오 웹사이트 — Next.js 14 기반 풀스택 구성

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 14 (App Router, SSG/ISR) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3, shadcn/ui |
| **Animation** | Framer Motion, Lenis (smooth scroll) |
| **Font** | Pretendard (KR), JetBrains Mono |
| **Theme** | next-themes (dark mode 기본) |
| **Linter** | Biome (ESLint + Prettier 대체) |
| **Git Hooks** | Lefthook (pre-commit biome check) |
| **Deploy** | Vercel |

---

## 시작하기

### 요구사항

- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

### 코드 품질

```bash
# 린트 + 포맷 동시 실행 (권장)
npm run check

# 린트만
npm run lint

# 포맷만
npm run format
```

> pre-commit 훅이 자동으로 `biome check --write`를 실행합니다. (Lefthook)

---

## 프로젝트 구조

```
portFolio/
├── app/
│   ├── fonts/
│   │   └── PretendardVariable.woff2   # 로컬 폰트
│   ├── globals.css                    # CSS 변수, 커스텀 스크롤바
│   ├── layout.tsx                     # 루트 레이아웃 (ThemeProvider)
│   └── page.tsx                       # 홈 페이지
├── components/
│   ├── common/
│   │   └── CustomCursor.tsx           # 커스텀 마우스 커서
│   ├── layout/
│   │   ├── Header.tsx                 # 네비게이션 + 다크모드 토글
│   │   └── Footer.tsx                 # 푸터 + 소셜 링크
│   └── ui/                            # shadcn/ui 컴포넌트
├── lib/
│   └── utils.ts                       # cn 유틸리티
├── biome.json                         # Biome 설정
├── lefthook.yml                       # Git Hooks 설정
├── tailwind.config.ts                 # 디자인 시스템
└── components.json                    # shadcn/ui 설정
```

---

## 페이지 구성

| 경로 | 설명 | 상태 |
|------|------|------|
| `/` | Hero 랜딩 + 기술 스택 + CTA | ✅ |
| `/about` | 소개 + 인적사항 | 🚧 |
| `/skills` | 기술 스택 카드 | 🚧 |
| `/projects` | 프로젝트 목록 (필터) | 🚧 |
| `/projects/[slug]` | 프로젝트 상세 (MDX) | 🚧 |
| `/activities` | 타임라인 (활동/수상) | 🚧 |
| `/contact` | 연락처 + 문의 폼 | 🚧 |

---

## 디자인 시스템

### 컬러

| 변수 | 값 | 용도 |
|------|-----|------|
| `background` | `#0A0A0F` | 메인 배경 |
| `card` | `#111118` | 카드 배경 |
| `accent` | `#4361EE` | CTA, 강조 요소 |
| `accent2` | `#7C3AED` | 그라데이션 포인트 |

### 폰트

- **Pretendard** — 한글 기본체 (`font-sans`)
- **JetBrains Mono** — 코드/모노 (`font-mono`)

---

## 개발 규칙

- **컴포넌트**: PascalCase, 함수형 + arrow function
- **커밋**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **브랜치**: `main` (배포) / `feature/*` (기능)
- **스타일**: Tailwind 유틸리티 우선, 커스텀 CSS 최소화

---

## 기획 문서

상세 기획은 [PLANNING.md](./PLANNING.md) 참고
