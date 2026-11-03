"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const QUOTES = [
  { faith: "Islam", icon: "☪️", text: "Charity never makes wealth less.", by: "Prophet Muhammad ﷺ (Sahih Muslim)" },
  { faith: "Hinduism", icon: "🕉️", text: "Give because it is right to give, without expecting anything back.", by: "Bhagavad Gita 17.20 (paraphrased)" },
  { faith: "Christianity", icon: "✝️", text: "It is more blessed to give than to receive.", by: "Acts 20:35" },
  { faith: "Buddhism", icon: "☸️", text: "If people knew the fruit of sharing, they would not eat a meal without sharing it.", by: "Itivuttaka (paraphrased)" },
  { faith: "Sikhism", icon: "🪯", text: "Earn honestly and share what you have with others.", by: "Guru Nanak, Vand Chhakna (paraphrased)" },
  { faith: "Judaism", icon: "✡️", text: "Whoever is kind to the poor lends to the Lord.", by: "Proverbs 19:17 (paraphrased)" },
  { faith: "Jainism", icon: "🤲", text: "Souls help one another.", by: "Tattvartha Sutra 5.21 (paraphrased)" },
];

export function QuotesOfKindness() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const q = QUOTES[i];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Every heart teaches kindness</h2>
        <p className="mt-2 opacity-80">Different faiths, one beautiful message: share what you have.</p>
      </div>

      <div
        className="rounded-box bg-base-200 p-8 md:p-12 text-center shadow-lg min-h-64 flex flex-col items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div key={i} className="animate-[fadeIn_0.6s_ease]">
          <div className="text-5xl mb-4">{q.icon}</div>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">“{q.text}”</p>
          <p className="mt-4 opacity-70">{q.by}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {QUOTES.map((x, idx) => (
          <button
            key={x.faith}
            onClick={() => setI(idx)}
            className={`btn btn-sm ${idx === i ? "btn-primary" : "btn-outline"}`}
          >
            {x.faith}
          </button>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { n: "1", icon: "🔎", title: "Find a good deed", text: "Browse upcoming events near you and pick one that warms your heart." },
  { n: "2", icon: "🤝", title: "Join your neighbours", text: "Tap Join Event and show up with a smile. It is that simple." },
  { n: "3", icon: "🌳", title: "Grow your kindness", text: "Earn points and badges and watch your nest of kindness grow." },
];

export function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">How KindNest works</h2>
        <p className="mt-2 opacity-80">Three small steps to a warmer neighbourhood.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="card bg-base-200 h-full transition hover:-translate-y-2 hover:shadow-xl">
            <div className="card-body items-center text-center">
              <div className="float badge badge-primary badge-lg">Step {s.n}</div>
              <div className="text-5xl mt-2">{s.icon}</div>
              <h3 className="card-title">{s.title}</h3>
              <p className="opacity-80">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/events" className="btn btn-primary">Start now</Link>
      </div>
    </section>
  );
}