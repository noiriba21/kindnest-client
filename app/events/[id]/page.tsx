"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PageSkeleton } from "@/components/Skeletons";
import { api, publicApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { errMsg, fmtDate, tomorrowStr } from "@/lib/utils";
import type { EventItem, JoinedItem } from "@/lib/types";

function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    publicApi<EventItem>(`/events/${id}`)
      .then(setEvent)
      .catch((e) => setError(errMsg(e)));
  }, [id]);

  useEffect(() => {
    if (!session) return;
    api<JoinedItem[]>("/joined")
      .then((list) => setJoined(list.some((j) => j.eventId === id)))
      .catch(() => {});
  }, [session, id]);

  const join = async () => {
    if (!session) {
      toast.error("Please log in to join this event");
      router.push(`/login?next=/events/${id}`);
      return;
    }
    setJoining(true);
    try {
      await api(`/events/${id}/join`, { method: "POST" });
      toast.success("You joined this event! +10 kindness points 🌟");
      setJoined(true);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setJoining(false);
    }
  };

  if (error)
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="mt-2 text-error">{error}</p>
        <Link href="/events" className="btn btn-primary mt-6">Back to events</Link>
      </section>
    );
  if (!event) return <PageSkeleton />;

  const ended = event.eventDate < tomorrowStr() && event.eventDate < new Date().toISOString().slice(0, 10);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="card bg-base-200 shadow-xl overflow-hidden">
        <img src={event.thumbnail} alt={event.title} className="h-64 md:h-96 w-full object-cover" />
        <div className="card-body gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-secondary badge-lg">{event.eventType}</span>
            {ended && <span className="badge badge-neutral badge-lg">Event ended</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
          <div className="grid gap-2 sm:grid-cols-2">
            <p>📍 <b>Where:</b> {event.location}</p>
            <p>📅 <b>When:</b> {fmtDate(event.eventDate)}</p>
            <p>🧑 <b>Organised by:</b> {event.creatorName || event.creatorEmail}</p>
          </div>
          <p className="text-lg leading-relaxed">{event.description}</p>
          <div className="card-actions mt-2">
            {joined ? (
              <button className="btn btn-success" disabled>✅ You joined this event</button>
            ) : (
              <button onClick={join} className="btn btn-primary" disabled={joining || ended}>
                {joining ? "Joining..." : "Join Event"}
              </button>
            )}
            <Link href="/events" className="btn btn-outline btn-primary">Back to events</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function EventDetailsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EventDetails />
    </Suspense>
  );
}