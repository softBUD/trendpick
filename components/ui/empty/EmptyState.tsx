"use client";

import {Search} from "lucide-react";

export default function EmptyState({
  message = "검색 결과가 없습니다.",
  description = "조건을 변경하여 다시 시도해보세요.",
}: {
  message?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
      <Search className="mb-4 h-12 w-12 text-neutral-500" />
      <h2 className="text-lg font-semibold">{message}</h2>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
}
