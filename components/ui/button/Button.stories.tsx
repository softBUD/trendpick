import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import Button from "./Button";
import {Plus} from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: {action: "clicked"},
    loading: {control: "boolean"}, // Controls에서 boolean으로 강제
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
    loading: false,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: "Add Item",
    startIcon: <Plus />,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    loading: true,
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    loading: false,
  },
};

export const Flat: Story = {
  args: {
    children: "Flat",
    variant: "flat",
    loading: false,
  },
};
