import type {YoutubeApiResponse, YoutubeVideoDTO} from "@/types/video";

export async function fetchYoutubeVideos(
  keyword: string,
  pageToken?: string,
  maxResults = 12,
  order = "viewCount"
): Promise<{videos: YoutubeVideoDTO[]; nextPageToken?: string}> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";
  const url = `${baseUrl}?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
    keyword
  )}&order=${order}&type=video&key=${apiKey}${
    pageToken ? `&pageToken=${pageToken}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data: YoutubeApiResponse = await res.json();

  // 비디오 ID 추출
  const videoIds = data.items.map((item) => item.id.videoId).join(",");

  // 통계 데이터 조회
  const statsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
  );
  const statsData = await statsRes.json();

  const videos: YoutubeVideoDTO[] = data.items.map((item: any) => {
    const stats = statsData.items.find(
      (s: any) => s.id === item.id.videoId
    )?.statistics;

    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      viewCount: stats?.viewCount ?? "0",
    };
  });

  return {videos, nextPageToken: data.nextPageToken};
}

export async function fetchPopularVideos(
  pageToken?: string,
  maxResults = 12,
  regionCode = "KR"
): Promise<{videos: YoutubeVideoDTO[]; nextPageToken?: string}> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("chart", "mostPopular");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("regionCode", regionCode);
  url.searchParams.set("key", apiKey || "");
  if (pageToken) {
    url.searchParams.set("pageToken", pageToken);
  }

  const res = await fetch(url.toString());
  const data = await res.json();

  const videos: YoutubeVideoDTO[] = data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    viewCount: item.statistics.viewCount,
  }));

  return {
    videos,
    nextPageToken: data.nextPageToken,
  };
}
