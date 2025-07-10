import {useInfiniteQuery} from "@tanstack/react-query";
import {YoutubeVideoDTO} from "@/types/video";

interface VideosResponse {
  videos: YoutubeVideoDTO[];
  nextPageToken?: string;
}

export function useYoutubeVideos(keyword: string) {
  return useInfiniteQuery<VideosResponse, Error>({
    queryKey: ["videos", keyword],
    queryFn: async ({pageParam = ""}) => {
      const res = await fetch(
        `/api/videos/search?keyword=${encodeURIComponent(
          keyword
        )}&pageToken=${pageParam}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: "",
  });
}
