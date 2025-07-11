import {NextRequest, NextResponse} from "next/server";
import {
  fetchSearchYoutubeVideos,
  filterByViewAndSubscribers,
} from "@/lib/youtube";

export async function POST(req: NextRequest) {
  const {keyword, publishedAfter, viewCount, subscriberCount, pageToken} =
    await req.json();

  const {videos, nextPageToken} = await fetchSearchYoutubeVideos(
    keyword,
    pageToken,
    publishedAfter
  );

  const filteredVideos = await filterByViewAndSubscribers(videos, {
    viewCount,
    subscriberCount,
  });

  return NextResponse.json({videos: filteredVideos, nextPageToken});
}
