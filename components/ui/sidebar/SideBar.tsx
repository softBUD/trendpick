import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="min-w-2xs h-screen flex flex-col space-y-4 text-neutral-400">
      <Link href="/">Video Search</Link>
      <Link href="#">Beauty</Link>
      <Link href="#">Food</Link>
      <Link href="#">Senior</Link>
      <Link href="#">Entertain</Link>
    </nav>
  );
}
