import Link from "next/link";
import { fmtDate } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card bg-base-200 shadow-md h-full transition hover:-translate-y-1 hover:shadow-xl">
      <figure>
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary">{event.eventType}</div>
        <h3 className="card-title line-clamp-2 min-h-14">{event.title}</h3>
        <p>📍 {event.location}</p>
        <p>📅 {fmtDate(event.eventDate)}</p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}