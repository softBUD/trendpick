import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchPopularVideos} from "@/lib/youtube";
import {YoutubeVideoDTO} from "@/types/video";

interface FetchResult {
  videos: YoutubeVideoDTO[];
  nextPageToken?: string;
}

export function usePopularVideosInfinite() {
  return useInfiniteQuery<FetchResult, Error>({
    queryKey: ["popularVideos"],
    queryFn: ({pageParam}) =>
      fetchPopularVideos(pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: undefined,
  });
}
