"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {cn} from "@/lib/utils";

export interface CustomSelectProps {
  placeholder?: string;
  options: {label: string; value: string}[];
  onChange?: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder = "Select an option",
  options,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full bg-neutral-800 text-neutral-200 border-none",
          "py-2 pl-4 pr-10 rounded-md outline-none",
          "transition-all duration-300",
          "focus:ring-2 focus:ring-brand focus:bg-neutral-700",
          "hover:bg-neutral-700"
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={cn(
          "bg-neutral-800 border border-neutral-700 text-neutral-200",
          "transition-all duration-300"
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={cn(
              "cursor-pointer",
              "hover:bg-neutral-700 hover:text-white",
              "focus:bg-neutral-700 focus:text-white",
              "transition-all duration-200"
            )}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
