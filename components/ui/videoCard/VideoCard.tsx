"use client";

import * as React from "react";
import {cn, formatViewCount} from "@/lib/utils";
import Image from "next/image";

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  viewCount?: string;
}

export default function VideoCard({
  id,
  title,
  thumbnailUrl,
  channelTitle,
  viewCount,
}: VideoCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex flex-row rounded-xl w-full cursor-pointer overflow-hidden shadow-sm hover:shadow-lg bg-neutral-800 transition"
        )}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          width={320}
          height={180}
          className="object-cover rounded-xl"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1 line-clamp-2 text-white">
            {title}
          </h3>
          <p className="text-[15px] mb-1 text-white">{channelTitle}</p>
          <p className="text-xs mb-1 text-white">
            {viewCount ? formatViewCount(viewCount) : viewCount} views
          </p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              title={title}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
