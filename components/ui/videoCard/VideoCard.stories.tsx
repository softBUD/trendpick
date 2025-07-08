import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import VideoCard from "./VideoCard";

const meta: Meta<typeof VideoCard> = {
  title: "UI/VideoCard",
  component: VideoCard,
  tags: ["autodocs"],
  argTypes: {
    title: {control: "text"},
    thumbnailUrl: {control: "text"},
    channelTitle: {control: "text"},
    viewCount: {control: "text"},
  },
};

export default meta;
type Story = StoryObj<typeof VideoCard>;

export const Default: Story = {
  args: {
    title: "🔥 지금 가장 인기 있는 트렌디한 영상 제목입니다",
    thumbnailUrl: "https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg",
    channelTitle: "Trend Channel",
    viewCount: "1,234,567",
  },
};
