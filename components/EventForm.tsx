"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { EVENT_TYPES, tomorrowStr } from "@/lib/utils";

export type EventFormData = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
};

export default function EventForm({
  initial,
  submitText,
  onSubmit,
}: {
  initial?: Partial<EventFormData>;
  submitText: string;
  onSubmit: (data: EventFormData) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data: EventFormData = {
      title: String(f.get("title")).trim(),
      description: String(f.get("description")).trim(),
      eventType: String(f.get("eventType")),
      thumbnail: String(f.get("thumbnail")).trim(),
      location: String(f.get("location")).trim(),
      eventDate: String(f.get("eventDate")),
    };

    if (data.title.length < 5) return toast.error("Title must be at least 5 characters");
    if (data.description.length < 20)
      return toast.error("Description must be at least 20 characters");
    if (!data.eventType) return toast.error("Please choose an event type");
    if (!/^https?:\/\//.test(data.thumbnail))
      return toast.error("Thumbnail must be a link that starts with http or https");
    if (data.location.length < 3) return toast.error("Please write the location");
    if (!data.eventDate) return toast.error("Please choose the event date");
    if (data.eventDate < tomorrowStr())
      return toast.error("Event date must be in the future");

    setBusy(true);
    try {
      await onSubmit(data);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handle} className="grid gap-4">
      <label className="grid gap-1">
        <span className="font-semibold">Event title</span>
        <input name="title" defaultValue={initial?.title} placeholder="Winter Clothes Distribution" className="input input-bordered w-full" required />
      </label>

      <label className="grid gap-1">
        <span className="font-semibold">Description</span>
        <textarea name="description" defaultValue={initial?.description} placeholder="Tell neighbours what you will do and what to bring" className="textarea textarea-bordered w-full h-28 rounded-2xl" required />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="font-semibold">Event type</span>
          <select name="eventType" defaultValue={initial?.eventType || ""} className="select select-bordered w-full" required>
            <option value="" disabled>Choose a type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="font-semibold">Event date</span>
          <input type="date" name="eventDate" min={tomorrowStr()} defaultValue={initial?.eventDate} className="input input-bordered w-full" required />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="font-semibold">Thumbnail image link</span>
        <input name="thumbnail" type="url" defaultValue={initial?.thumbnail} placeholder="https://picsum.photos/seed/myevent/600/400" className="input input-bordered w-full" required />
      </label>

      <label className="grid gap-1">
        <span className="font-semibold">Location</span>
        <input name="location" defaultValue={initial?.location} placeholder="Mirpur 10, Dhaka" className="input input-bordered w-full" required />
      </label>

      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Please wait..." : submitText}
      </button>
    </form>
  );
}