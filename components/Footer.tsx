import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="brand text-2xl font-bold text-primary">🐦 KindNest</p>
          <p className="mt-3 opacity-80">
            A cosy nest where kind neighbours gather to share warmth, plant
            trees and clean their streets together.
          </p>
        </div>

        <div>
          <p className="font-bold mb-3">Quick links</p>
          <ul className="space-y-2 opacity-80">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/events" className="hover:text-primary">Upcoming Events</Link></li>
            <li><Link href="/login" className="hover:text-primary">Login</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3">Say hello</p>
          <p className="opacity-80">hello@kindnest.com</p>
          <p className="opacity-80">Chattogram, Bangladesh</p>
          <div className="flex gap-3 mt-4 text-xl">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-primary"><FaXTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-primary"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary"><FaInstagram /></a>
            <a href="https://github.com/noiriba21" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-primary"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-sm opacity-70">
        © 2026 KindNest. Made with love for kind neighbours.
      </div>
    </footer>
  );
}