"use client";

import VideoList from "@/components/ui/videoList/VideoList";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";
import {useYoutubeVideos} from "@/hooks/useYoutubeVideos";
import {useState, useEffect, useRef} from "react";

export default function SearchPage() {
  // ✅ 실제로는 input이나 Select에서 받아서 세팅하도록 설계 (예시용 state)
  const [keyword, setKeyword] = useState("뷰티");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useYoutubeVideos(keyword);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {threshold: 1}
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading && !isFetchingNextPage) {
    return <VideoListSkeleton />;
  }

  if (isError) {
    return <p className="text-red-500">영상을 불러올 수 없습니다.</p>;
  }

  const allVideos = data?.pages.flatMap((page) => page.videos) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* 예시용: 추후 검색바와 셀렉트 추가 시 */}
      {/* <SearchBar onSearch={(value) => setKeyword(value)} /> */}

      <VideoList videos={allVideos} />
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <VideoListSkeleton />}
    </div>
  );
}
