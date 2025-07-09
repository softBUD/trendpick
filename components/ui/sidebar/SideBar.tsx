"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {label: "인기 영상", href: "/"},
    {label: "뷰티", href: "/beauty"},
    {label: "먹방", href: "/food"},
    {label: "건강", href: "/health"},
    {label: "축구", href: "/football"},
    {label: "아이돌", href: "/idol"},
    {label: "재테크", href: "/investment"},
  ];

  return (
    <nav className="w-xs text-xl h-screen flex flex-col space-y-4 text-neutral-400">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "w-[65%] transition-colors px-3 py-2 rounded-lg",
              "hover:bg-neutral-700 hover:text-white",
              isActive && "text-white font-semibold"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
