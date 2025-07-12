"use client";

import VideoList from "@/components/ui/videoList/VideoList";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";
import {useYoutubeVideos} from "@/hooks/useYoutubeVideos";
import {useEffect, useRef} from "react";

export default function SearchPage() {
  const keyword = "투자 재테크";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useYoutubeVideos(keyword);

  const observerRef = useRef<HTMLDivElement | null>(null);

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
      <VideoList videos={allVideos} />
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <VideoListSkeleton />}
    </div>
  );
}
