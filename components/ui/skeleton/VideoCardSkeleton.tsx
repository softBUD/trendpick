"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton";

export default function VideoCardSkeleton() {
  return (
    <div className="flex flex-row rounded-xl w-full overflow-hidden shadow-sm bg-neutral-800">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video h-full min-w-[320px] flex-shrink-0" />

      <div className="flex flex-col p-6 flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" /> {/* title skeleton */}
        <Skeleton className="h-3 w-1/2" /> {/* channel skeleton */}
        <Skeleton className="h-3 w-1/3" /> {/* view count skeleton */}
      </div>
    </div>
  );
}
