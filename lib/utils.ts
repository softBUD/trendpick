import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViewCount(count: string | number): string {
  const num = typeof count === "string" ? parseInt(count, 10) : count;

  if (isNaN(num)) return "0";

  if (num >= 100000000) {
    return `${Math.floor(num / 100000000)}억`;
  } else if (num >= 10000) {
    return `${Math.floor(num / 10000)}만`;
  } else {
    return num.toString();
  }
}
