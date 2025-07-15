# 🎥 YouTube Trending & Filter Project

## ✨ 소개

유튜브 API를 활용하여 카테고리 별로 트렌딩 영상과 업로드 날짜, 조회수, 구독자 수 등 다양한 조건으로 필터링할 수 있는 Next.js 기반 프로젝트입니다.
👉 **데모 링크**: [https://trendpick.vercel.app/](https://trendpick.vercel.app/)
👉 **포스팅 링크**: [블로그 포스팅](https://velog.io/@hye_oo2/TrendPick-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%ED%8A%B8%EB%A0%8C%EB%93%9C-%EA%B8%B0%EB%B0%98-%EC%98%81%EC%83%81-%EA%B2%80%EC%83%89%EC%B6%94%EC%B2%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EB%B0%9C%EA%B8%B0)


## 💻 기술 스택

- **Next.js 14 (App Router)**
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Radix UI (Select 등)
- Vercel 배포
- Storybook (컴포넌트 문서화)

## 🚀 주요 기능

- 유튜브 인기 영상 실시간 조회 (무한스크롤)
- 조회수 / 구독자 수 / 업로드 기간 필터링 (기능 개선 예정)
- 모달 영상 미리보기
- Skeleton & Spinner 로딩 상태 UI
- Storybook 기반 UI 컴포넌트 관리

## ⚙️ 개발 환경

```bash
node: ">=18.0.0"
pnpm: ">=8.0.0"
```

## 🗂️ 폴더 구조

```
├── app/
│   ├── page.tsx (홈)
│   ├── layout.tsx (레이아웃)
│   ├── beauty/page.tsx
│   ├── food/page.tsx
│   ├── football/page.tsx
│   ├── health/page.tsx
│   ├── idol/page.tsx
│   ├── investment/page.tsx
│   └── search/page.tsx (검색 페이지)
├── components/
│   ├── ui/
│   │   ├── button/
│   │   ├── empty/
│   │   ├── header/
│   │   ├── searchBar/
│   │   ├── select/
│   │   ├── sidebar/
│   │   ├── skeleton/
│   │   ├── spinner/
│   │   ├── videoCard/
│   │   ├── videoList/
│   │   └── empty/
├── hooks/
│   ├── usePopularVideos/route.ts
│   ├── useYoutubeFilterVideos/route.ts
│   └── useYoutubeVideos.ts
├── lib/
│   ├── tanstackQuery.ts
│   ├── utils.ts
│   └── youtube.ts
├── types/
│   └── video.ts
├── app/api/videos/
│   ├── filterSearch/route.ts
│   ├── popular/route.ts
│   └── search/route.ts
```

## 🗝️ 유튜브 API 키 설정

`.env.local` 파일에 다음과 같이 설정하세요:

```env
YOUTUBE_API_KEYS=key
```

- 서버 사이드에서만 사용되어 키가 클라이언트에 노출되지 않습니다.

## 💡 주요 구현 아이디어

### ⚖️ 서버 사이드 필터링

- 유튜브 API에서 조회수, 구독자 수 조건 검색이 불가
- API 응답 후 서버에서 필터링 로직 수행 (`filterByViewAndSubscribers`)

### ⚡ 무한스크롤

- React Query `useInfiniteQuery` 활용
- Intersection Observer로 스크롤 감지 후 `fetchNextPage` 호출


## 💬 실행

```bash
pnpm install
pnpm dev
```


## ✅ Storybook

```bash
pnpm storybook
```

- Spinner, Skeleton, EmptyState 등 UI 컴포넌트 문서화



---

### 🔗 참고

- [YouTube Data API v3 Docs](https://developers.google.com/youtube/v3)
- [TanStack Query](https://tanstack.com/query/latest)
- [Next.js Docs](https://nextjs.org/docs)

---

