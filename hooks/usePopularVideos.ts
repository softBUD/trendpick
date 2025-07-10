// hooks/usePopularVideos.ts
import {useInfiniteQuery} from "@tanstack/react-query";
import {YoutubeVideoDTO} from "@/types/video";

interface PopularVideosResponse {
  videos: YoutubeVideoDTO[];
  nextPageToken?: string;
}

export function usePopularVideos() {
  return useInfiniteQuery<PopularVideosResponse, Error>({
    queryKey: ["popularVideos"],
    queryFn: async ({pageParam = ""}) => {
      const res = await fetch(`/api/videos/popular?pageToken=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch popular videos");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: "",
  });
}
