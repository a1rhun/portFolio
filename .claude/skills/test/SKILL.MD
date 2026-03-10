---
name: test
description: 테스트 코드 작성 워크플로우. 기능 분석 → 이해 확인 → 테스트 작성 → 검증 단계를 순차적으로 진행합니다.
---

## Context (자동 수집)

테스트 대상 파일: $ARGUMENTS

---

## 시작 전 확인

`$ARGUMENTS`가 비어 있으면 작업을 시작하기 전에 반드시 다음과 같이 요청한다:

> "테스트할 파일 경로를 알려주세요. (예: `components/layout/Header.tsx`)"

파일 경로를 받은 후 아래 워크플로우를 진행한다.

---

## 워크플로우

### 1단계: 기능 분석

테스트 대상 파일을 분석합니다:

1. **파일 읽기**: 대상 파일의 전체 코드를 읽습니다
2. **의존성 파악**: import된 모듈, hooks, 외부 라이브러리 등을 확인합니다
3. **실제 사용처 파악**: Grep으로 대상 파일을 import하는 컴포넌트/파일을 검색한다
   - 어떤 컴포넌트에서 어떤 흐름으로 사용되는지 파악
   - 실제 사용자가 경험하는 시나리오를 도출 (예: "네비 클릭 시 스크롤 이동", "다크모드 토글" 등)
4. **핵심 로직 식별**:
   - 컴포넌트/hook이 반환하는 값 또는 렌더링 결과
   - 주요 분기 조건 (if/switch, 조건부 렌더링)
   - 상태 변화 (useState, useReducer)
   - 사이드 이펙트 (useEffect, 외부 API 호출, DOM 조작)

**분석 결과를 다음 형식으로 정리:**

```
## 기능 분석 결과

### 파일 개요
- 파일: [경로]
- 타입: [component / hook / util / lib]
- 목적: [한 줄 설명]
- 사용처: [컴포넌트명 또는 파일 경로]

### 실제 사용 시나리오
- [시나리오1]: [사용처에서 어떤 상황에 해당하는지]
- [시나리오2]: [사용처에서 어떤 상황에 해당하는지]

### 주요 기능
1. [기능1]: [설명]
2. [기능2]: [설명]

### 의존성
- Hooks: [목록]
- 외부 라이브러리: [목록]
- Utils: [목록]

### 테스트 포인트
- [ ] [테스트할 동작 1]
- [ ] [테스트할 동작 2]
```

---

### 2단계: 이해 확인

분석 결과를 사용자에게 공유하고 다음을 확인합니다:

**필수 질문:**
1. "위 분석이 맞나요? 수정하거나 추가할 부분이 있나요?"
2. "테스트 범위에서 제외하거나 추가할 케이스가 있나요?"

**선택 질문 (불명확한 경우):**
- 비즈니스 로직의 의도
- 에지 케이스 처리 방법
- Mock 범위 (어떤 의존성까지 Mock할지)

사용자 확인을 받은 후 3단계로 진행한다.

---

### 3단계: 테스트 작성

**파일 위치**: 테스트 대상과 같은 디렉토리에 `*.test.tsx`

```
components/layout/Header.tsx
components/layout/Header.test.tsx  ✅

lib/utils.ts
lib/utils.test.ts  ✅
```

**테스트 작성 원칙 — 행위 중심**

테스트는 내부 구현 변수를 추적하는 것이 아니라, **사용자/시스템이 관찰할 수 있는 동작 결과**를 기준으로 작성한다.

```ts
// ❌ 구현 중심 — 내부 state 하나씩 추적
describe('Header', () => {
  it('mobileOpen이 true로 바뀐다')
  it('activeSection이 skills로 바뀐다')
})

// ❌ "~하면" 형식 — 금지
describe('햄버거 버튼을 클릭하면', () => {
  it('모바일 메뉴가 열린다')
})

// ✅ [상태/상황] 레이블 + 행위 중심 it
describe('[모바일 메뉴]', () => {
  it('햄버거 아이콘 클릭 시 네비게이션 링크가 표시된다')
  it('링크 클릭 시 메뉴가 닫힌다')
})
```

- `describe`: `[상태/상황]` 형식의 대괄호 레이블 사용 — "~하면" 형식 금지
  - **레이블은 실제 사용 시나리오에서 도출한다** — 함수명/변수명이 아닌, 사용자가 경험하는 실제 상황으로 표현
  - ❌ `[setMobileOpen 호출]` / `[activeSection === skills]` — 구현 내부 용어
  - ✅ `[모바일 메뉴 열림]` / `[기술 섹션 진입]` / `[다크모드 전환]` — 실제 사용 상황
- `it`: 관찰 가능한 동작 결과 (하나의 동작이 만드는 결과는 하나의 `it`에서 함께 검증)
- 내부 구현이 바뀌어도 동작이 유지되면 테스트도 통과해야 한다

**커버리지 기준**
- **component**: 렌더링 + 상호작용(클릭/입력) + 조건부 렌더링
- **custom hook**: 반환값 + 상태 변화 + 사이드 이펙트
- **util/lib**: 모든 입력 케이스 (undefined, 빈 문자열, 경계값 등)

**기본 구조 (Vitest + Testing Library):**

```tsx
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock 설정
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}))

describe('[컴포넌트명 — 시나리오]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('[기능 그룹]', () => {
    it('[관찰 가능한 결과]', () => {
      // Arrange
      render(<ComponentName />)

      // Act
      await userEvent.click(screen.getByRole('button', { name: /메뉴/ }))

      // Assert
      expect(screen.getByRole('navigation')).toBeVisible()
    })
  })
})
```

**자주 쓰는 Mock 패턴 (Next.js + 이 프로젝트)**

```ts
// next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

// next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({ theme: 'dark', setTheme: vi.fn() })),
}))

// Lenis (window.__lenis)
Object.defineProperty(window, '__lenis', {
  value: { scrollTo: vi.fn() },
  writable: true,
})

// IntersectionObserver
const mockObserver = { observe: vi.fn(), disconnect: vi.fn() }
vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))

// framer-motion (애니메이션 비활성화)
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
```

---

### 4단계: 검증 (필수)

테스트 작성 완료 후 반드시 다음을 실행한다:

**1. 테스트 실행:**

```bash
npx vitest run [테스트파일경로]
```

**2. 타입 체크:**

```bash
npx tsc --noEmit 2>&1 | grep "[파일명].test"
```

**3. 결과 보고:**
- 테스트 통과 여부
- 타입 에러 유무
- "IDE에서도 타입 에러가 없는지 확인해주세요" 안내

---

## 체크리스트

- [ ] 기능 분석 완료
- [ ] 사용자에게 이해 확인 받음
- [ ] 테스트 코드 작성 (행위 중심)
- [ ] 테스트 실행 성공
- [ ] 타입 체크 통과
- [ ] IDE 타입 에러 확인 안내
