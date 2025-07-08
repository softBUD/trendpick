import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import CustomSelect from "./Select";

const meta: Meta<typeof CustomSelect> = {
  title: "UI/CustomSelect",
  component: CustomSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

export const Default: Story = {
  args: {
    placeholder: "Filter by",
    options: [
      {label: "Latest", value: "latest"},
      {label: "Most Viewed", value: "views"},
      {label: "Oldest", value: "oldest"},
    ],
  },
};
