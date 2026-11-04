"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { CardSkeletons } from "@/components/Skeletons";
import { publicApi } from "@/lib/api";
import { EVENT_TYPES, errMsg } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export default function EventsPage() {
  const [list, setList] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setList(null);
      setError("");
      publicApi<EventItem[]>(
        `/events?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`
      )
        .then(setList)
        .catch((e) => setError(errMsg(e)));
    }, 300);
    return () => clearTimeout(t);
  }, [search, type]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Upcoming Events</h1>
      <p className="text-center mt-2 opacity-80">Choose a good deed and join your neighbours.</p>

      <div className="mt-8 mb-10 flex flex-col sm:flex-row gap-3 justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by event title"
          className="input input-bordered w-full sm:max-w-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select select-bordered w-full sm:max-w-xs"
        >
          <option value="">All types</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-center text-error">{error}</p>
      ) : !list ? (
        <CardSkeletons count={6} />
      ) : list.length === 0 ? (
        <p className="text-center opacity-80">No upcoming events match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
    </section>
  );
}