# 다음 작업 알림장

## 현재 브랜치
`feat/2-common-ui-components`

## 오늘 한 것 (2026-03-10)
- 컬러 팔레트 CSS 변수 + Tailwind 토큰 추가 (blue/teal/green/gray)
- Header 리팩토링: liquid glass 효과, Framer Motion active pill, 스크롤 기반 네비게이션
- LenisProvider 구현 및 레이아웃 적용
- Storybook 설정 추가
- CLAUDE.md, Next.md, Claude 스킬(.claude/skills/) 세팅

> 커밋 전 상태. 집 가서 터미널에서 직접 커밋 후 push.

---

## 다음에 할 것

### 1. 커밋 + push (바로)
```bash
# 1) 설정/패키지
git add .gitignore package.json package-lock.json
git commit -m "chore: #2 패키지 추가 및 .gitignore 업데이트"

# 2) 디자인 토큰
git add app/globals.css tailwind.config.ts
git commit -m "style: #2 컬러 팔레트 CSS 변수 및 Tailwind 토큰 추가"

# 3) LenisProvider
git add components/providers/ app/layout.tsx
git commit -m "feat: #2 LenisProvider 구현 및 레이아웃 적용"

# 4) Header
git add components/layout/Header.tsx
git commit -m "feat: #2 Header liquid glass 효과 및 스크롤 기반 네비게이션 구현"

# 5) 문서/도구
git add CLAUDE.md .storybook/ .claude/ Next.md
git commit -m "chore: #2 CLAUDE.md, Storybook, Claude 스킬 설정 추가"

git push origin feat/2-common-ui-components
```

---

### 2. 공통 UI 컴포넌트 구현 (이슈 #2)
`components/common/` 아래에 순서대로:

- [ ] `SectionTitle.tsx` — 섹션 제목 (그라데이션 텍스트 + 서브타이틀)
- [ ] `AnimatedSection.tsx` — 스크롤 진입 시 fade-in 래퍼 (Framer Motion)
- [ ] `GlassCard.tsx` — `.glass` 스타일 카드 컴포넌트
- [ ] `Tag.tsx` — 기술 스택 태그 / 배지
- [ ] `TypewriterText.tsx` — 타이핑 효과 텍스트
- [ ] `SkillProgressBar.tsx` — 숙련도 프로그레스 바
- [ ] `ReadingProgress.tsx` — 상단 읽기 진행률 바 (프로젝트 상세용)

---

### 3. 페이지 섹션 구조 세팅 (nav 연결)
`app/page.tsx`에 section ID 추가:
```tsx
<section id="skills">...</section>
<section id="projects">...</section>
<section id="activities">...</section>
<section id="contact">...</section>
```
→ Header의 스크롤 네비게이션이 이 ID를 찾아 이동함

---

### 4. 이후 이슈 순서
| 이슈 | 브랜치 | 내용 |
|------|--------|------|
| #3 | `feat/3-about-page` | MDX 시스템 + Hero 고도화 + About 페이지 |
| #4 | `feat/4-skills-page` | Skills 페이지 |
| #5 | `feat/5-projects-page` | Projects 목록 + 상세 페이지 |
| #6 | `feat/6-activities-contact` | Activities + Contact 페이지 |
| #7 | `chore/7-seo-optimization` | SEO + 성능 최적화 (Lighthouse 90+) |

---

## 참고
- 로컬 개발 서버: `npm run dev -- -p 3002` → http://localhost:3002
- Figma 토큰 노출됨 → Figma Settings에서 재발급 필요
- Figma 파일: `Y23M44YF9oQ9MgfIK6S4R0` (node-id: `1-1845` = 네비게이션)
