import {NextRequest, NextResponse} from "next/server";
import {fetchYoutubeVideos} from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const body = await req.json();

  const keyword = body.keyword ?? "";
  const publishedAfter = body.publishedAfter;
  const viewCount = body.viewCount ?? 0;
  const subscriberCount = body.subscriberCount ?? 0;
  const pageToken = body.pageToken ?? undefined;

  const {videos, nextPageToken} = await fetchYoutubeVideos(keyword, pageToken);

  //   const filteredVideos = await filterByViewAndSubscribers(videos, {
  //     viewCount: viewCount || undefined,
  //     subscriberCount: subscriberCount || undefined,
  //   });

  //   return NextResponse.json({videos: filteredVideos, nextPageToken});
}
