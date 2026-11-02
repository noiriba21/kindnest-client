import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="brand text-2xl font-bold text-primary">
            🐦 KindNest
          </Link>
        </div>
        <div className="flex-none flex items-center gap-2">
          <Link href="/events" className="btn btn-ghost">
            Upcoming Events
          </Link>
          <ThemeToggle />
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}