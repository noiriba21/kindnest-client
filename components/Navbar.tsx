"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const closeMenu = () =>
    (document.activeElement as HTMLElement | null)?.blur();

  const logout = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("You are logged out. See you soon! 👋");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="brand text-2xl font-bold text-primary">
            🐦 KindNest
          </Link>
        </div>

        <div className="flex-none flex items-center gap-1 sm:gap-2">
          <Link href="/events" className="btn btn-ghost btn-sm sm:btn-md">
            Upcoming Events
          </Link>
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    src={session.user.image || "https://picsum.photos/seed/kindnest-user/100"}
                    alt={session.user.name}
                    title={session.user.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box z-10 mt-3 w-56 p-2 shadow-xl">
                <li className="menu-title">{session.user.name}</li>
                <li><Link href="/create-event" onClick={closeMenu}>➕ Create Event</Link></li>
                <li><Link href="/manage-events" onClick={closeMenu}>🛠️ Manage Events</Link></li>
                <li><Link href="/joined-events" onClick={closeMenu}>🤝 Joined Events</Link></li>
                <li><Link href="/profile" onClick={closeMenu}>👤 My Profile</Link></li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">
              Login
            </Link>
          )}

          {session && (
            <button onClick={logout} className="btn btn-outline btn-primary btn-sm sm:btn-md">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}