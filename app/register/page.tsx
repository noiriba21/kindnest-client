"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const photoURL = String(form.get("photoURL")).trim();
    const password = String(form.get("password"));

    if (!name) return toast.error("Please write your name");
    if (!photoURL.startsWith("http"))
      return toast.error("Photo URL must start with http or https");
    if (!/[A-Z]/.test(password))
      return toast.error("Password needs at least one uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.error("Password needs at least one lowercase letter");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) return toast.error(error.message || "Could not register");
    toast.success("Welcome to KindNest! 🎉");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-200 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-primary">Join KindNest 🐦</h1>
          <p className="opacity-80">Make an account and start doing good deeds.</p>

          <input name="name" type="text" placeholder="Your name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Your email" className="input input-bordered w-full" required />
          <input name="photoURL" type="url" placeholder="Photo URL (https://...)" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          <p className="text-sm opacity-70">
            Password needs an uppercase letter, a lowercase letter and 6 or more characters.
          </p>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}