// 원본 YouTube API DTO 타입
export interface YoutubeVideoDTO {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  viewCount: string;
  channelId: string;
}

export interface YoutubeApiResponse {
  items: any[];
  nextPageToken?: string;
}

// 컴포넌트에서 사용할 ViewModel 타입
export interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  viewCount?: string;
}

// 필터링 조회 파라미터
export type YoutubeSearchParams = {
  keyword: string;
  maxResults?: number;
  order?: "date" | "rating" | "relevance" | "title" | "viewCount";
  publishedAfter?: string;
};
