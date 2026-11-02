"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EventForm, { type EventFormData } from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";
import { api } from "@/lib/api";
import { errMsg, fmtDate } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

function ManageInner() {
  const [list, setList] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<EventItem | null>(null);

  const load = useCallback(() => {
    api<EventItem[]>("/my-events")
      .then(setList)
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (data: EventFormData) => {
    if (!editing) return;
    try {
      await api(`/events/${editing._id}`, { method: "PUT", body: JSON.stringify(data) });
      toast.success("Event updated ✅");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const remove = async (ev: EventItem) => {
    const answer = await Swal.fire({
      title: "Delete this event?",
      text: `"${ev.title}" will be removed for everyone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#f97316",
    });
    if (!answer.isConfirmed) return;
    try {
      await api(`/events/${ev._id}`, { method: "DELETE" });
      toast.success("Event deleted");
      setList((old) => (old ? old.filter((x) => x._id !== ev._id) : old));
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Manage your events</h1>
      <p className="text-center mt-2 mb-8 opacity-80">Update or delete the events you created.</p>

      {error ? (
        <p className="text-center text-error">{error}</p>
      ) : !list ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 w-full" />)}
        </div>
      ) : list.length === 0 ? (
        <div className="text-center">
          <p className="opacity-80">You have not created any event yet.</p>
          <Link href="/create-event" className="btn btn-primary mt-4">Create your first event</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box bg-base-200">
          <table className="table">
            <thead>
              <tr><th>Event</th><th>Type</th><th>Date</th><th>Location</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {list.map((ev) => (
                <tr key={ev._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={ev.thumbnail} alt={ev.title} className="h-12 w-16 rounded-lg object-cover" />
                      <span className="font-semibold">{ev.title}</span>
                    </div>
                  </td>
                  <td>{ev.eventType}</td>
                  <td>{fmtDate(ev.eventDate)}</td>
                  <td>{ev.location}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(ev)} className="btn btn-sm btn-secondary">Update</button>
                      <button onClick={() => remove(ev)} className="btn btn-sm btn-outline btn-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Update event</h3>
            <EventForm
              key={editing._id}
              initial={editing}
              submitText="Save changes"
              onSubmit={save}
            />
            <div className="modal-action">
              <button onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageInner />
    </PrivateRoute>
  );
}