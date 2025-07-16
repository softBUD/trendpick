"use client";

import {useState, useRef, useEffect} from "react";
import SearchBar from "@/components/ui/searchBar/SearchBar";
import Select from "@/components/ui/select/Select";
import VideoList from "@/components/ui/videoList/VideoList";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";
import EmptyState from "@/components/ui/empty/EmptyState";
import Button from "@/components/ui/button/Button";
import {useYoutubeFilterVideos} from "@/hooks/useYoutubeFilterVideos";
import {YoutubeFilterSearchParams} from "@/types/video";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");

  const [period, setPeriod] = useState<string>();
  const [viewCount, setViewCount] = useState<string>();
  const [subscribers, setSubscribers] = useState<string>();

  const [searchParams, setSearchParams] =
    useState<YoutubeFilterSearchParams | null>(null);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useYoutubeFilterVideos(searchParams);

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

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const handleSearch = () => {
    let publishedAfter;
    if (period === "week") {
      publishedAfter = new Date(
        new Date().setDate(new Date().getDate() - 7)
      ).toISOString();
    } else if (period === "month") {
      publishedAfter = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      ).toISOString();
    } else if (period === "3months") {
      publishedAfter = new Date(
        new Date().setMonth(new Date().getMonth() - 3)
      ).toISOString();
    } else if (period === "6months") {
      publishedAfter = new Date(
        new Date().setMonth(new Date().getMonth() - 6)
      ).toISOString();
    }

    setSearchParams({
      keyword,
      publishedAfter,
      viewCount:
        viewCount && viewCount !== "none" ? Number(viewCount) : undefined,
      subscriberCount:
        subscribers && subscribers !== "none" ? Number(subscribers) : undefined,
    });
  };

  const handleResetFilters = () => {
    setKeyword("");
    setPeriod(undefined);
    setViewCount(undefined);
    setSubscribers(undefined);
    setSearchParams(null);
  };

  const allVideos = data?.pages.flatMap((page) => page.videos) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          onClick={handleSearch}
          className="max-h-[40px] px-4 cursor-pointer hover:bg-neutral-600"
          loading={isLoading || isFetchingNextPage}
        >
          검색
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          color="default"
          className="min-w-24 text-neutral-200 p-2 border border-neutral-600 rounded-md hover:bg-neutral-700 transition"
        >
          초기화
        </Button>
      </div>

      <div className="flex gap-4">
        <Select
          value={period}
          options={[
            {label: "기간 전체", value: "none"},
            {label: "1주일", value: "week"},
            {label: "1개월", value: "month"},
            {label: "3개월", value: "3months"},
            {label: "6개월", value: "6months"},
          ]}
          placeholder="업로드 기간"
          onChange={setPeriod}
        />
        <Select
          value={viewCount}
          options={[
            {label: "조회수 전체", value: "none"},
            {label: "1만 이상", value: "10000"},
            {label: "10만 이상", value: "100000"},
            {label: "50만 이상", value: "500000"},
            {label: "100만 이상", value: "1000000"},
            {label: "500만 이상", value: "5000000"},
          ]}
          placeholder="조회수"
          onChange={setViewCount}
        />
        <Select
          value={subscribers}
          options={[
            {label: "구독자수 전체", value: "none"},
            {label: "1만 이상", value: "10000"},
            {label: "10만 이상", value: "100000"},
            {label: "30만 이상", value: "300000"},
            {label: "50만 이상", value: "500000"},
            {label: "100만 이상", value: "1000000"},
          ]}
          placeholder="구독자수"
          onChange={setSubscribers}
        />
      </div>
      {!keyword ? (
        <EmptyState
          message="검색어를 입력해주세요."
          description="검색어와 조건을 입력한 뒤 검색 버튼을 눌러주세요."
        />
      ) : isLoading ? (
        <VideoListSkeleton />
      ) : allVideos.length === 0 ? (
        <EmptyState
          message="조건에 맞는 영상이 없어요."
          description="조건을 조금 더 완화하거나 키워드를 변경해 보세요."
        />
      ) : (
        <VideoList videos={allVideos} />
      )}
      {/* {(isLoading || (!data && !isError)) && <VideoListSkeleton />}
      {!isLoading && !isError && allVideos.length === 0 && (
        <EmptyState
          message="조건에 맞는 영상이 없어요."
          description="조건을 조금 더 완화하거나 키워드를 변경해 보세요."
        />
      )}
      {!isLoading && !isError && allVideos.length > 0 && (
        <>
          <VideoList videos={allVideos} />
          <div ref={observerRef} className="h-10" />
          {isFetchingNextPage && <VideoListSkeleton />}
        </>
      )} */}
    </div>
  );
}
