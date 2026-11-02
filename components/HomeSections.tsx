"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import EventCard from "./EventCard";
import { CardSkeletons } from "./Skeletons";
import { publicApi } from "@/lib/api";
import { errMsg } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="mt-2 opacity-80 max-w-2xl mx-auto">{text}</p>
    </div>
  );
}

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20">
      <span className="float absolute top-10 left-6 text-5xl md:text-6xl select-none">🐦</span>
      <span className="float-slow absolute bottom-10 right-8 text-5xl md:text-6xl select-none">🌳</span>
      <span className="float-slow absolute top-16 right-1/4 text-3xl select-none hidden md:block">🧡</span>
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
        <p className="badge badge-secondary badge-lg mb-4">Where kind neighbours gather</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Small kindnesses build a <span className="text-primary">big nest</span>
        </h1>
        <p className="mt-5 text-lg opacity-80">
          Find a good deed near you, invite your friends and make your
          neighbourhood warmer. From winter clothes in Mirpur to beach cleanups
          in Patenga, every helping hand counts.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/events" className="btn btn-primary">Explore Events</Link>
          <Link href="/create-event" className="btn btn-outline btn-primary">Start your own event</Link>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: "📅", title: "Plan a good deed", text: "Create an event in a minute with a date, a place and a picture." },
  { icon: "🤝", title: "Join with one tap", text: "Pick an event you like and join it. Your list stays sorted by date." },
  { icon: "⭐", title: "Earn kindness points", text: "Get points and badges every time you create or join an event." },
  { icon: "🔒", title: "Safe and private", text: "Only you can edit or delete the events that you created." },
];

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle title="Why neighbours love KindNest" text="Simple tools that turn good intentions into real action." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="card bg-base-200 h-full">
            <div className="card-body items-center text-center">
              <div className="text-5xl">{f.icon}</div>
              <h3 className="card-title">{f.title}</h3>
              <p className="opacity-80">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpcomingSection() {
  const [list, setList] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    publicApi<EventItem[]>("/events?limit=6")
      .then(setList)
      .catch((e) => setError(errMsg(e)));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle title="Upcoming good deeds" text="The next events happening near you. Pick one and join in." />
      {error ? (
        <p className="text-center text-error">{error}</p>
      ) : !list ? (
        <CardSkeletons count={6} />
      ) : list.length === 0 ? (
        <p className="text-center opacity-80">No upcoming events yet. Be the first to create one!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link href="/events" className="btn btn-primary">See all events</Link>
      </div>
    </section>
  );
}

const GALLERY = [
  { seed: "hands", caption: "Sharing warm clothes" },
  { seed: "forest", caption: "Planting little trees" },
  { seed: "ocean", caption: "Cleaning the beach" },
  { seed: "kids", caption: "Meals for children" },
  { seed: "garden", caption: "Greening the school yard" },
  { seed: "team", caption: "Volunteers together" },
];

export function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle title="Moments from our nest" text="A peek at the kindness our neighbours share." />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {GALLERY.map((g) => (
          <figure key={g.seed} className="relative overflow-hidden rounded-box group">
            <img
              src={`https://picsum.photos/seed/${g.seed}/600/400`}
              alt={g.caption}
              className="h-40 sm:h-56 md:h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-neutral/70 text-neutral-content text-sm px-3 py-2">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you! A little note from the nest is on its way 🐦");
    e.currentTarget.reset();
  };
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="rounded-box bg-gradient-to-r from-primary to-secondary text-primary-content p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Get a note from the nest</h2>
        <p className="mt-2 opacity-90">One short email a week with new events near you.</p>
        <form onSubmit={subscribe} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input type="email" required placeholder="Your email address" className="input input-bordered w-full sm:max-w-sm text-base-content bg-base-100" />
          <button type="submit" className="btn btn-neutral">Subscribe</button>
        </form>
      </div>
    </section>
  );
}