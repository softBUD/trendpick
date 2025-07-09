"use client";

import VideoList from "@/components/ui/videoList/VideoList";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";
import {useYoutubeVideos} from "@/hooks/useYoutubeVideos";
import {useEffect, useRef} from "react";

export default function BeautyPage() {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useYoutubeVideos("뷰티");

  const loader = useRef<HTMLDivElement | null>(null);

  // Intersection Observer를 통한 무한스크롤 트리거
  useEffect(() => {
    if (!loader.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader.current, fetchNextPage, hasNextPage]);

  if (isLoading) return <VideoListSkeleton />;

  const videos = data?.pages.flatMap((page) => page.videos) ?? [];

  return (
    <div>
      <VideoList videos={videos} />
      {isFetchingNextPage && <VideoListSkeleton />}
      <div ref={loader} />
    </div>
  );
}
