"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Impact } from "@/lib/types";

function ProfileInner() {
  const { data: session } = authClient.useSession();
  const [impact, setImpact] = useState<Impact | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<Impact>("/impact").then(setImpact).catch(() => {});
  }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    const image = String(f.get("image")).trim();
    if (name.length < 2) return toast.error("Name must be at least 2 characters");
    if (!/^https?:\/\//.test(image)) return toast.error("Photo link must start with http or https");

    setSaving(true);
    const { error } = await authClient.updateUser({ name, image });
    setSaving(false);
    if (error) return toast.error(error.message || "Could not update profile");
    toast.success("Profile updated ✅");
  };

  const points = impact?.points ?? 0;

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 grid gap-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center">My profile</h1>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-4 ring-offset-base-200">
              <img src={session?.user.image || "https://picsum.photos/seed/kindnest-user/200"} alt="Your profile" referrerPolicy="no-referrer" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">{session?.user.name}</h2>
          <p className="opacity-80">{session?.user.email}</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">⭐ Your kindness points</h2>
          {!impact ? (
            <div className="skeleton h-24 w-full" />
          ) : (
            <>
              <div className="stats stats-vertical sm:stats-horizontal bg-base-100">
                <div className="stat"><div className="stat-title">Badge</div><div className="stat-value text-2xl">{impact.badge}</div></div>
                <div className="stat"><div className="stat-title">Points</div><div className="stat-value text-primary">{impact.points}</div></div>
                <div className="stat"><div className="stat-title">Joined / Created</div><div className="stat-value text-2xl">{impact.joined} / {impact.created}</div></div>
              </div>
              <progress className="progress progress-primary w-full" value={Math.min(points, 100)} max={100} />
              <p className="text-sm opacity-80">
                Join an event for +10 points and create one for +20. 40 points make you a 🌿 Helper and 100 points make you a 🌳 Hero.
              </p>
            </>
          )}
        </div>
      </div>

      <form onSubmit={save} className="card bg-base-200 shadow-xl">
        <div className="card-body gap-3">
          <h2 className="card-title">Update profile</h2>
          <label className="grid gap-1">
            <span className="font-semibold">Name</span>
            <input name="name" defaultValue={session?.user.name} className="input input-bordered w-full" required />
          </label>
          <label className="grid gap-1">
            <span className="font-semibold">Photo link</span>
            <input name="image" type="url" defaultValue={session?.user.image || ""} className="input input-bordered w-full" required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileInner />
    </PrivateRoute>
  );
}