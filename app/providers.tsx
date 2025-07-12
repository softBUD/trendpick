"use client";

import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {queryClient} from "@/lib/tanstackQuery";

export default function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
