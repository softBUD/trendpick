"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useState} from "react";
import {queryClient} from "@/lib/tanstackQuery";

export default function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
