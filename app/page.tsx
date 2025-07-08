import SearchBar from "@/components/ui/searchBar/SearchBar";
import Select from "@/components/ui/select/Select";
import VideoList from "@/components/ui/videoList/VideoList";

export default function HomePage() {
  const mockVideos = [
    {
      id: "1",
      title: "🔥 지금 가장 인기 있는 트렌디한 영상 제목입니다",
      thumbnailUrl: "https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg",
      channelTitle: "Trend Channel",
      viewCount: "1,234,567",
    },
    {
      id: "2",
      title: "🍳 요리 브이로그 - 집에서 간단하게 만들기!",
      thumbnailUrl: "https://i.ytimg.com/vi/2Vv-BfVoq4g/mqdefault.jpg",
      channelTitle: "Cooking Lab",
      viewCount: "987,654",
    },
    {
      id: "3",
      title: "💄 요즘 핫한 뷰티템 추천과 리뷰",
      thumbnailUrl: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg",
      channelTitle: "Beauty Star",
      viewCount: "654,321",
    },
    {
      id: "1",
      title: "🔥 지금 가장 인기 있는 트렌디한 영상 제목입니다",
      thumbnailUrl: "https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg",
      channelTitle: "Trend Channel",
      viewCount: "1,234,567",
    },
    {
      id: "2",
      title: "🍳 요리 브이로그 - 집에서 간단하게 만들기!",
      thumbnailUrl: "https://i.ytimg.com/vi/2Vv-BfVoq4g/mqdefault.jpg",
      channelTitle: "Cooking Lab",
      viewCount: "987,654",
    },
    {
      id: "3",
      title: "💄 요즘 핫한 뷰티템 추천과 리뷰",
      thumbnailUrl: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg",
      channelTitle: "Beauty Star",
      viewCount: "654,321",
    },
    {
      id: "1",
      title: "🔥 지금 가장 인기 있는 트렌디한 영상 제목입니다",
      thumbnailUrl: "https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg",
      channelTitle: "Trend Channel",
      viewCount: "1,234,567",
    },
    {
      id: "2",
      title: "🍳 요리 브이로그 - 집에서 간단하게 만들기!",
      thumbnailUrl: "https://i.ytimg.com/vi/2Vv-BfVoq4g/mqdefault.jpg",
      channelTitle: "Cooking Lab",
      viewCount: "987,654",
    },
    {
      id: "3",
      title: "💄 요즘 핫한 뷰티템 추천과 리뷰",
      thumbnailUrl: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg",
      channelTitle: "Beauty Star",
      viewCount: "654,321",
    },
  ];

  const optionScribers = [
    {
      label: "10만",
      value: "10+ scribers",
    },
    {
      label: "100만",
      value: "100+ scribers",
    },
  ];

  return (
    <div className="flex gap-6 flex-col">
      <SearchBar />
      <div className="flex gap-4">
        <Select options={optionScribers} placeholder="구독자수" />
        <Select options={optionScribers} placeholder="업로드 날짜" />
        <Select options={optionScribers} placeholder="조회수" />
      </div>
      <VideoList videos={mockVideos} />
    </div>
  );
}
