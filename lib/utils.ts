export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Other",
];

// Tomorrow's date in Bangladesh time, e.g. "2026-11-03"
export const tomorrowStr = () =>
  new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString().slice(0, 10);

export const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const errMsg = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong";