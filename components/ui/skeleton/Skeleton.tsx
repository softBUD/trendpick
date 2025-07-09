"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({className}: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-700/60", className)}
    />
  );
}
