import {useInfiniteQuery} from "@tanstack/react-query";
import {YoutubeFilterSearchParams, YoutubeFilterSearchRes} from "@/types/video";

export function useYoutubeFilterVideos(
  params: YoutubeFilterSearchParams | null
) {
  return useInfiniteQuery<YoutubeFilterSearchRes, Error>({
    queryKey: ["videos", params],
    queryFn: async ({pageParam = ""}) => {
      if (!params || !params.keyword) {
        return {videos: [], nextPageToken: undefined};
      }
      const res = await fetch("/api/videos/filterSearch", {
        method: "POST",
        body: JSON.stringify({
          ...params,
          pageToken: pageParam,
        }),
      });
      if (!res.ok) throw new Error("검색 실패");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: "",
    enabled: !!params && !!params.keyword,
  });
}
