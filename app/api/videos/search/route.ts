import {NextRequest, NextResponse} from "next/server";
import {fetchYoutubeVideos} from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const keyword = searchParams.get("keyword") ?? "";
  const pageToken = searchParams.get("pageToken") || undefined;

  const {videos, nextPageToken} = await fetchYoutubeVideos(keyword, pageToken);

  return NextResponse.json({videos, nextPageToken});
}
