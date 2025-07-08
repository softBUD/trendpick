import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <Link href="/" className="text-4xl font-bold text-white">
        <h1>TrendPick</h1>
      </Link>
    </header>
  );
}
