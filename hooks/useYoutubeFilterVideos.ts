import {YoutubeFilterSearchParams, YoutubeFilterSearchRes} from "@/types/video";
import {useMutation} from "@tanstack/react-query";

export function useYoutubeFilterVideos() {
  return useMutation<YoutubeFilterSearchRes, Error, YoutubeFilterSearchParams>({
    mutationFn: async (params: YoutubeFilterSearchParams) => {
      const res = await fetch("/api/videos/filterSearch", {
        method: "POST",
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("검색 실패");
      return res.json();
    },
  });
}
