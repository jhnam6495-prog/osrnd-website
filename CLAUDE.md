# OSRnD 홈페이지 프로젝트

## 프로젝트 개요
- 목적: 오에스알앤디㈜ 공식 홈페이지 개발
- 기술 스택: React 18 + Vite + Tailwind CSS
- 참고 문서:
  - docs/index.html    (기존 완성된 홈페이지 HTML)
  - docs/images/       (기존 홈페이지 이미지)

## 작업 방식
- docs/index.html을 기준으로 동일한 디자인 구현
- docs/images 폴더의 이미지를 그대로 사용
- 임의로 내용을 바꾸지 말 것

## 브랜드 가이드
- 메인 색상: 네이비 블루 (#1A3A6B)
- 포인트 색상: 레드 (#CC2200)
- 폰트: Noto Sans KR
- 톤앤매너: 전문적이고 신뢰감 있게

## 코딩 규칙
- 컴포넌트는 함수형으로 작성
- 파일명은 PascalCase
- CSS는 Tailwind CSS 사용
- 주석은 한국어로 작성
- 반응형 필수 (모바일/태블릿/PC)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
