"use client";

import VideoList from "@/components/ui/videoList/VideoList";
import {usePopularVideosInfinite} from "@/hooks/usePopularVideos";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";
import {useEffect, useRef} from "react";

export default function HomePage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePopularVideosInfinite();

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for infinite scroll
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
  }, [observerRef, hasNextPage, fetchNextPage]);

  if (isLoading) return <VideoListSkeleton />;
  if (isError)
    return <p className="text-red-500">페이지를 찾을 수 없습니다.</p>;

  const allVideos = data?.pages.flatMap((page) => page.videos) ?? [];

  return (
    <div className="flex gap-6 flex-col">
      <VideoList videos={allVideos} />
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <VideoListSkeleton />}
    </div>
  );
}
