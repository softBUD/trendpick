import "@/app/globals.css";
import Providers from "@/app/providers";
import Header from "@/components/ui/header/Header";
import Sidebar from "@/components/ui/sidebar/SideBar";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "TrendPick - Discover Trending Videos",
  description: "유튜브의 인기 영상을 한눈에! 검색을 한번에!",
  openGraph: {
    title: "TrendPick",
    description: "유튜브의 인기 영상을 한눈에! 검색을 한번에!",
    url: "https://your-domain.com",
    siteName: "TrendPick",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="flex flex-col bg-neutral-900 min-h-screen">
        <Header />
        <div className="flex flex-1">
          <aside className="w-64 h-full px-8 py-6 border-neutral-700">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
