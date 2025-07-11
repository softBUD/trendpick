// 원본 YouTube API DTO 타입
export interface YoutubeVideoDTO {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  viewCount: string;
  channelId: string;
  subscriberCount?: number;
}

export interface YoutubeApiResponse {
  items: any[];
  nextPageToken?: string;
}

// 검색기능 파라미터
export interface YoutubeFilterSearchParams {
  keyword: string;
  publishedAfter?: string;
  viewCount?: number;
  subscriberCount?: number;
}

// 검색기능 response
export interface YoutubeFilterSearchRes {
  videos: YoutubeVideoDTO[];
  nextPageToken?: string;
}
