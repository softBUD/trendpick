"use client";

import * as React from "react";
import VideoCard from "@/components/ui/videoCard/VideoCard";
import VideoListSkeleton from "../skeleton/VideoListSkeleton";
import {YoutubeVideoDTO} from "@/types/video";

interface VideoListProps {
  videos: YoutubeVideoDTO[];
}
export default function VideoList({videos}: VideoListProps) {
  if (!videos || videos.length === 0) {
    return <VideoListSkeleton />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
      {videos.map((video, index) => (
        <VideoCard
          id={`${video.id}-${index}`}
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
