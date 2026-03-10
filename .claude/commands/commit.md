---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
description: 변경 사항을 확인하고 커밋 계획을 제안한 뒤 사용자 확인 후 커밋합니다
---

## Context

- 현재 git status: !`git status`
- 현재 변경 내용 (staged + unstaged): !`git diff HEAD`
- 현재 브랜치: !`git branch --show-current`
- 최근 커밋 목록: !`git log --oneline -10`

## Your task

위 변경 사항을 바탕으로 아래 규칙에 따라 커밋 계획을 제안하고, 사용자 확인 후 커밋을 실행한다.

### 커밋 메시지 형식

```
<type>[optional scope]: <#브랜치이슈번호> <한국어 설명>
```

**type 목록:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 코드 포매팅 (코드 변경 없음)
- `docs`: 문서 수정
- `chore`: 패키지/빌드/설정 변경
- `test`: 테스트 코드 추가

**브랜치 이슈번호:** 브랜치명에서 숫자 추출 (예: `fix/59-...` → `#59`)

### 제안 형식

```
커밋할 파일:
  - path/to/file.ts

커밋 메시지:
  <type>: <#이슈번호> <한국어 설명>
```

### 규칙

1. 변경 범위가 넓으면 여러 커밋으로 나눠 제안한다
2. 반드시 사용자 확인 후 커밋을 실행한다
3. 커밋 메시지 설명은 한국어로 작성한다
4. `any` 사용이나 보안 취약점이 보이면 먼저 경고한다
