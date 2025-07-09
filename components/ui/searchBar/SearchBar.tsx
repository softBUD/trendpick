"use client";

import {useState, useEffect} from "react";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";
import React from "react";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({className, placeholder = "Search videos", ...props}, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      // 클라이언트 전용 처리
      return null;
    }

    return (
      <div
        className={cn("relative w-full transition-all duration-300", className)}
      >
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors duration-300"
          size={18}
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full bg-neutral-800 text-neutral-200 placeholder-neutral-500",
            "rounded-md py-2 pl-10 pr-4 outline-none",
            "transition-all duration-300 ease-in-out",
            "focus:ring-2 focus:ring-brand focus:bg-neutral-700"
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
