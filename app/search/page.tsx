"use client";

import {useState} from "react";
import SearchBar from "@/components/ui/searchBar/SearchBar";
import Select from "@/components/ui/select/Select";
import VideoList from "@/components/ui/videoList/VideoList";
import VideoListSkeleton from "@/components/ui/skeleton/VideoListSkeleton";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [period, setPeriod] = useState<string>();
  const [viewCount, setViewCount] = useState<number>();
  const [subscribers, setSubscribers] = useState<number>();

  const handleSearch = async () => {
    setLoading(true);

    // 업로드 기간 계산
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

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        keyword,
        publishedAfter,
        viewCount,
        subscriberCount: subscribers,
      }),
    });

    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchBar onChange={(e) => setKeyword(e.target.value)} />
      <div className="flex gap-4">
        <Select
          options={[
            {label: "1주일", value: "week"},
            {label: "1개월", value: "month"},
            {label: "3개월", value: "3months"},
            {label: "6개월", value: "6months"},
          ]}
          placeholder="업로드 기간"
          onChange={setPeriod}
        />
        <Select
          options={[
            {label: "10만 이상", value: "100000"},
            {label: "50만 이상", value: "500000"},
            {label: "100만 이상", value: "1000000"},
            {label: "500만 이상", value: "5000000"},
          ]}
          placeholder="조회수"
          onChange={(v) => setViewCount(Number(v))}
        />
        <Select
          options={[
            {label: "10만 이상", value: "100000"},
            {label: "30만 이상", value: "300000"},
            {label: "50만 이상", value: "500000"},
            {label: "100만 이상", value: "1000000"},
          ]}
          placeholder="구독자수"
          onChange={(v) => setSubscribers(Number(v))}
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-brand text-white py-2 rounded-md w-full hover:bg-brand-dark transition"
      >
        검색
      </button>
      {loading ? <VideoListSkeleton /> : <VideoList videos={videos} />}
    </div>
  );
}
