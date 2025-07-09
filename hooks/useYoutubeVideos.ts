import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchYoutubeVideos} from "@/lib/youtube";
import {YoutubeVideoDTO} from "@/types/video";

export function useYoutubeVideos(keyword: string) {
  return useInfiniteQuery<
    {videos: YoutubeVideoDTO[]; nextPageToken?: string}, // 반환 타입
    Error
  >({
    queryKey: ["videos", keyword],
    queryFn: ({pageParam}) =>
      fetchYoutubeVideos(keyword, pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: undefined,
  });
}
