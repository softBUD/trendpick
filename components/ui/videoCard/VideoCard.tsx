"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  viewCount: string;
}

export default function VideoCard({
  title,
  thumbnailUrl,
  channelTitle,
  viewCount,
}: VideoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-row rounded-xl w-full  overflow-hidden shadow-sm hover:shadow-lg bg-neutral-800 transition"
      )}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="aspect-video h-full object-cover"
      />
      <div className="p-20">
        <h3 className="text-base font-semibold mb-1 line-clamp-2 text-white">
          {title}
        </h3>
        <p className="text-sm text-white">{channelTitle}</p>
        <p className="text-xs text-white">{viewCount} views</p>
      </div>
    </div>
  );
}
