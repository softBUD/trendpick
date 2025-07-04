'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
    // 클라이언트 재생성 방지
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
