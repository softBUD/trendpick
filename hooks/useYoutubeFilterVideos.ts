import {useInfiniteQuery} from "@tanstack/react-query";
import {YoutubeVideoDTO} from "@/types/video";

interface VideosResponse {
  videos: YoutubeVideoDTO[];
  nextPageToken?: string;
}

export function useYoutubeVideos(
  keyword: string,
  filters: {uploadPeriod?: number; viewCount?: number; subscriberCount?: number}
) {
  return useInfiniteQuery<VideosResponse, Error>({
    queryKey: ["videos", keyword, filters],
    queryFn: async ({pageParam = ""}) => {
      const params = new URLSearchParams();
      params.set("keyword", keyword);
      if (filters.uploadPeriod)
        params.set("uploadPeriod", filters.uploadPeriod.toString());
      if (filters.viewCount)
        params.set("viewCount", filters.viewCount.toString());
      if (filters.subscriberCount)
        params.set("subscriberCount", filters.subscriberCount.toString());
      if (pageParam) params.set("pageToken", pageParam as string);

      const res = await fetch(`/api/videos/search?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: "",
  });
}
