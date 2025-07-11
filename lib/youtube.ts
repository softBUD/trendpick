// lib/youtube.ts
import {YoutubeApiResponse, YoutubeVideoDTO} from "@/types/video";

export async function fetchSearchYoutubeVideos(
  keyword: string,
  pageToken?: string,
  publishedAfter?: string
) {
  const apiKey = process.env.YOUTUBE_API_KEY!;
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";

  const url = `${baseUrl}?part=snippet&maxResults=12&q=${encodeURIComponent(
    keyword
  )}&order=viewCount&type=video&key=${apiKey}${
    pageToken ? `&pageToken=${pageToken}` : ""
  }${publishedAfter ? `&publishedAfter=${publishedAfter}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data: YoutubeApiResponse = await res.json();

  const videoIds = data.items.map((item) => item.id.videoId).join(",");

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
      channelId: item.snippet.channelId,
    };
  });

  return {videos, nextPageToken: data.nextPageToken};
}

export async function filterByViewAndSubscribers(
  videos: YoutubeVideoDTO[],
  filters: {viewCount?: number; subscriberCount?: number}
): Promise<YoutubeVideoDTO[]> {
  const {viewCount, subscriberCount} = filters;

  if (!subscriberCount) {
    return videos.filter((v) => !viewCount || +v.viewCount >= viewCount);
  }

  const apiKey = process.env.YOUTUBE_API_KEY!;
  const channelIds = videos.map((v) => v.channelId).join(",");

  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}&key=${apiKey}`
  );
  const channelData = await channelRes.json();

  const channelMap: Record<string, number> = {};
  channelData.items.forEach((ch: any) => {
    channelMap[ch.id] = Number(ch.statistics.subscriberCount);
  });

  return videos.filter((v) => {
    const chSubscribers = channelMap[v.channelId] ?? 0;
    const viewOk = !viewCount || +v.viewCount >= viewCount;
    const subscriberOk = !subscriberCount || chSubscribers >= subscriberCount;
    return viewOk && subscriberOk;
  });
}

export async function fetchYoutubeVideos(keyword: string, pageToken?: string) {
  const apiKey = process.env.YOUTUBE_API_KEY!;
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";

  const url = `${baseUrl}?part=snippet&maxResults=12&q=${encodeURIComponent(
    keyword
  )}&order=viewCount&type=video&key=${apiKey}${
    pageToken ? `&pageToken=${pageToken}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("YouTube API error response:", errorText);
    throw new Error("Failed to fetch videos");
  }

  const data: YoutubeApiResponse = await res.json();

  const videoIds = data.items.map((item) => item.id.videoId).join(",");

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
      channelId: item.snippet.channelId,
    };
  });

  return {videos, nextPageToken: data.nextPageToken};
}

export async function fetchPopularVideos(pageToken?: string) {
  const apiKey = process.env.YOUTUBE_API_KEY!;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=12&regionCode=KR&key=${apiKey}${
    pageToken ? `&pageToken=${pageToken}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch popular videos");
  const data = await res.json();

  const videos: YoutubeVideoDTO[] = data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    viewCount: item.statistics.viewCount,
    channelId: item.snippet.channelId,
  }));

  return {videos, nextPageToken: data.nextPageToken};
}
