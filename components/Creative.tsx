"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Reveal from "./Reveal";

/* ---------- Ticker ---------- */
const WORDS = [
  "🧥 Donate warm clothes",
  "🌱 Plant a tree",
  "🧹 Clean your street",
  "🍲 Share a meal",
  "📚 Give a book",
  "🤝 Help a neighbour",
  "💧 Save water",
  "🐦 Feed the birds",
];

export function Ticker() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee overflow-hidden bg-primary text-primary-content py-3">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="mx-8 font-semibold whitespace-nowrap">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Wave ---------- */
export function Wave() {
  return (
    <div className="text-base-200 leading-none">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-12 md:h-20">
        <path
          fill="currentColor"
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}

/* ---------- Features ---------- */
const FEATURES = [
  { icon: "📅", title: "Plan a good deed", text: "Create an event in a minute with a date, a place and a picture." },
  { icon: "🤝", title: "Join with one tap", text: "Pick an event you like and join it. Your list stays sorted by date." },
  { icon: "⭐", title: "Earn kindness points", text: "Get points and badges every time you create or join an event." },
  { icon: "🔒", title: "Safe and private", text: "Only you can edit or delete the events that you created." },
];

export function FeaturesAlive() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Why neighbours love KindNest</h2>
          <p className="mt-2 opacity-80 max-w-2xl mx-auto">
            Simple tools that turn good intentions into real action.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 120} className="h-full">
            <div className="lift card bg-base-200 h-full border border-base-300">
              <div className="card-body items-center text-center">
                <div className="wiggle text-5xl">{f.icon}</div>
                <h3 className="card-title">{f.title}</h3>
                <p className="opacity-80">{f.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Kindness of the Day ---------- */
const ACTS = [
  "Smile and say good morning to three neighbours.",
  "Give your seat to someone who needs it more.",
  "Share a meal or fruit with someone nearby.",
  "Pick up five pieces of litter on your street.",
  "Call a grandparent or an older relative just to say hello.",
  "Give a little water to the birds on your balcony.",
  "Donate one book or one toy you no longer use.",
  "Say a real thank you to your teacher or helper.",
  "Help a younger child with their homework.",
  "Turn off lights and fans you are not using.",
  "Write a kind note for a friend who feels sad.",
  "Carry a heavy bag for someone.",
  "Plant a seed or water a plant that needs care.",
  "Forgive someone, and let the small thing go.",
];
const EMOJIS = ["🎉", "🧡", "🌟", "🌼", "🐦", "✨", "🌳", "💛"];

export function DailyKindness() {
  const [idx, setIdx] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    setIdx(Math.floor(Date.now() / 86400000) % ACTS.length);
  }, []);

  const finish = () => {
    setDone(true);
    setBurst(true);
    toast.success("Beautiful! The world is a little warmer now 🧡");
    setTimeout(() => setBurst(false), 1400);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <Reveal>
        <div className="relative rounded-box bg-base-100 border-2 border-dashed border-primary p-8 md:p-10 text-center shadow-lg">
          <p className="badge badge-primary badge-lg mb-3">🎯 Kindness of the Day</p>
          <h2 className="text-3xl md:text-4xl font-bold">Your tiny mission for today</h2>
          <p className="mt-5 text-xl md:text-2xl font-semibold leading-relaxed min-h-16">
            {idx === null ? "" : ACTS[idx]}
          </p>
          <p className="mt-2 opacity-70 text-sm">A new mission appears every day.</p>

          <div className="relative mt-6 inline-block">
            <button onClick={finish} disabled={done || idx === null} className="btn btn-primary">
              {done ? "✅ Done for today" : "I did it!"}
            </button>
            {burst &&
              EMOJIS.map((e, i) => (
                <span
                  key={i}
                  className="pop"
                  style={
                    {
                      "--x": `${Math.cos((i / EMOJIS.length) * Math.PI * 2) * 110}px`,
                      "--y": `${Math.sin((i / EMOJIS.length) * Math.PI * 2) * 110}px`,
                    } as React.CSSProperties
                  }
                >
                  {e}
                </span>
              ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Gallery with lightbox ---------- */
const GALLERY = [
  { seed: "hands", caption: "Sharing warm clothes" },
  { seed: "forest", caption: "Planting little trees" },
  { seed: "ocean", caption: "Cleaning the beach" },
  { seed: "kids", caption: "Meals for children" },
  { seed: "garden", caption: "Greening the school yard" },
  { seed: "team", caption: "Volunteers together" },
];

export function GalleryAlive() {
  const [open, setOpen] = useState<number | null>(null);
  const go = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + GALLERY.length) % GALLERY.length));

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Moments from our nest</h2>
          <p className="mt-2 opacity-80 max-w-2xl mx-auto">
            A peek at the kindness our neighbours share. Tap a picture to see it bigger.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {GALLERY.map((g, i) => (
          <Reveal key={g.seed} delay={i * 90}>
            <button
              onClick={() => setOpen(i)}
              className="lift relative block w-full overflow-hidden rounded-box group text-left"
              aria-label={`Open ${g.caption}`}
            >
              <img
                src={`https://picsum.photos/seed/${g.seed}/600/400`}
                alt={g.caption}
                className="h-40 sm:h-56 md:h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 bg-neutral/70 text-neutral-content text-sm px-3 py-2">
                {g.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div className="modal modal-open" onClick={() => setOpen(null)}>
          <div className="modal-box max-w-3xl p-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://picsum.photos/seed/${GALLERY[open].seed}/1000/650`}
              alt={GALLERY[open].caption}
              className="w-full rounded-box object-cover"
            />
            <p className="text-center font-semibold mt-3">{GALLERY[open].caption}</p>
            <div className="flex justify-between mt-3">
              <button onClick={() => go(-1)} className="btn btn-outline btn-primary btn-sm">← Back</button>
              <button onClick={() => setOpen(null)} className="btn btn-ghost btn-sm">Close</button>
              <button onClick={() => go(1)} className="btn btn-outline btn-primary btn-sm">Next →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Scroll progress + back to top ---------- */
export function ScrollExtras() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-1 bg-primary" style={{ width: `${pct}%` }} />
      {pct > 15 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-primary btn-circle fixed bottom-6 right-6 z-50 shadow-xl"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}