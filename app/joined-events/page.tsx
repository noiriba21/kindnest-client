"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { CardSkeletons } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { errMsg, fmtDate } from "@/lib/utils";
import type { JoinedItem } from "@/lib/types";

function JoinedInner() {
  const [list, setList] = useState<JoinedItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<JoinedItem[]>("/joined")
      .then(setList)
      .catch((e) => setError(errMsg(e)));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Events you joined</h1>
      <p className="text-center mt-2 mb-10 opacity-80">Sorted by date, the nearest one first.</p>

      {error ? (
        <p className="text-center text-error">{error}</p>
      ) : !list ? (
        <CardSkeletons count={3} />
      ) : list.length === 0 ? (
        <div className="text-center">
          <p className="opacity-80">You have not joined any event yet.</p>
          <Link href="/events" className="btn btn-primary mt-4">Find an event</Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((j) => (
            <div key={j._id} className="card bg-base-200 shadow-md h-full">
              <figure>
                <img src={j.thumbnail} alt={j.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="badge badge-secondary">{j.eventType}</div>
                <h3 className="card-title line-clamp-2 min-h-14">{j.title}</h3>
                <p>📍 {j.location}</p>
                <p>📅 {fmtDate(j.eventDate)}</p>
                <div className="card-actions mt-auto pt-3">
                  <Link href={`/events/${j.eventId}`} className="btn btn-primary w-full">View Event</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedInner />
    </PrivateRoute>
  );
}