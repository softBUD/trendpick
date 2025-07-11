import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import EmptyState from "@/components/ui/empty/EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    message: "결과가 없어요!",
    description: "조건을 바꿔서 다시 검색해보세요.",
  },
};
