import VideoCardSkeleton from "@/components/ui/skeleton/VideoCardSkeleton";

export default function VideoListSkeleton() {
  return (
    <div className="grid pt-6 gap-6 sm:grid-cols-2 lg:grid-cols-1">
      {Array.from({length: 12}).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
