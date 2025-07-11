import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import Skeleton from "@/components/ui/skeleton/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    className: "h-6 w-48",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Square: Story = {
  args: {
    className: "h-24 w-24",
  },
};

export const FullWidth: Story = {
  args: {
    className: "h-8 w-full",
  },
};
