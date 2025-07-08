"use client";

import * as React from "react";
import VideoCard from "@/components/ui/videoCard/VideoCard";

interface VideoListProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    viewCount: string;
  }[];
}

export default function VideoList({videos}: VideoListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
          channelTitle={video.channelTitle}
          viewCount={video.viewCount}
        />
      ))}
    </div>
  );
}
