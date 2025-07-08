import "@/app/globals.css";
import Header from "@/components/ui/header/Header";
import Sidebar from "@/components/ui/sidebar/SideBar";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "TrendPick - Discover Trending Videos",
  description: "실시간 트렌디한 영상과 키워드를 한눈에!",
  openGraph: {
    title: "TrendPick",
    description: "실시간 트렌디한 영상과 키워드를 한눈에!",
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
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
