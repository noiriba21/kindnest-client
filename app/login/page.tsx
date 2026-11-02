"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

const getNext = () => {
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") ? n : "/";
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) return toast.error("Please fill in email and password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "Could not log in");
    toast.success("Welcome back! 🌟");
    router.push(getNext());
    router.refresh();
  };

  const githubLogin = async () => {
    try {
      await authClient.signIn.social({ provider: "github", callbackURL: getNext() });
    } catch {
      toast.error("GitHub login is not ready yet");
    }
  };

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-200 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-primary">Welcome back 🐦</h1>
          <p className="opacity-80">Log in to create and join events.</p>

          <input name="email" type="email" placeholder="Your email" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider my-1">or</div>

          <button type="button" onClick={githubLogin} className="btn btn-outline">
            <FaGithub /> Continue with GitHub
          </button>

          <p className="text-center">
            New here?{" "}
            <Link href="/register" className="link link-primary font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}