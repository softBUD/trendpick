/**
 * 클라이언트에서 최종적으로 사용되는 비디오 데이터 타입
 * YouTube API로부터 받아온 데이터를 가공해서 사용하는 DTO (Data Transfer Object)
 */
export interface YoutubeVideoDTO {
  id: string; // 영상 ID
  title: string; // 영상 제목
  thumbnailUrl: string; // 썸네일 URL
  channelTitle: string; // 채널 이름
  viewCount: string; // 조회수
  channelId: string; // 채널 ID
  subscriberCount?: number; // 구독자 수 (옵션)
}

/**
 * 채널 정보를 나타내는 타입
 * YouTube channels API의 단일 item 구조와 일치
 */
export interface YoutubeChannelItem {
  id: string; // 채널 ID
  statistics: {
    subscriberCount: string; // 구독자 수 (문자열로 전달됨)
  };
}

/**
 * 채널 리스트 응답 타입
 * YouTube channels API 전체 응답
 */
export interface YoutubeChannelResponse {
  items: YoutubeChannelItem[]; // 채널 데이터 배열
}

/**
 * YouTube search API에서 개별 video item 구조
 * 검색 결과의 item (통계 정보 없음)
 */
export interface YoutubeApiItem {
  id: {
    videoId: string; // 영상 ID
  };
  snippet: {
    title: string; // 영상 제목
    thumbnails: {
      medium: {url: string}; // 썸네일 URL
    };
    channelTitle: string; // 채널 이름
    channelId: string; // 채널 ID
  };
}

/**
 * YouTube videos API에서 통계 포함 video item 구조
 * videoId와 통계(statistics)가 함께 포함됨
 */
export interface YoutubeVideoItemWithStats {
  id: string; // 영상 ID
  snippet: {
    title: string; // 영상 제목
    thumbnails: {
      medium: {url: string}; // 썸네일 URL
    };
    channelTitle: string; // 채널 이름
    channelId: string; // 채널 ID
  };
  statistics: {
    viewCount: string; // 조회수
    subscriberCount?: string; // 구독자 수 (videos API에는 없고 channels API에서 별도 조회)
  };
}

/**
 * YouTube search API 전체 응답 타입
 * videos API와 달리 기본적으로 통계(statistics)는 포함되지 않음
 */
export interface YoutubeApiResponse {
  items: YoutubeApiItem[]; // 검색 결과 items
  nextPageToken?: string; // 다음 페이지 토큰 (있을 경우)
}

/**
 * /search에서 검색 시 전송할 파라미터 타입
 */
export interface YoutubeFilterSearchParams {
  keyword: string; // 검색 키워드
  publishedAfter?: string; // 특정 날짜 이후 영상만 검색
  viewCount?: number; // 최소 조회수 필터
  subscriberCount?: number; // 최소 구독자 수 필터
}

/**
 * 필터 검색 후 응답 타입
 * 클라이언트에 반환되는 구조
 */
export interface YoutubeFilterSearchRes {
  videos: YoutubeVideoDTO[]; // 필터된 영상 리스트
  nextPageToken?: string; // 다음 페이지 토큰 (있을 경우)
}
