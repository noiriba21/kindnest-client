"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm, { type EventFormData } from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";
import { api } from "@/lib/api";
import { errMsg } from "@/lib/utils";

function CreateInner() {
  const router = useRouter();

  const create = async (data: EventFormData) => {
    try {
      await api("/events", { method: "POST", body: JSON.stringify(data) });
      toast.success("Event created! +20 kindness points 🎉");
      router.push("/events");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Create a good deed</h1>
      <p className="text-center mt-2 mb-8 opacity-80">Tell your neighbours what you are planning.</p>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <EventForm submitText="Create Event" onSubmit={create} />
        </div>
      </div>
    </section>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateInner />
    </PrivateRoute>
  );
}