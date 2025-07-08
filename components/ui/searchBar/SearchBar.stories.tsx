import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "UI/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: "Search videos",
  },
};
