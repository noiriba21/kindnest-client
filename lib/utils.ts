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
export const countdown = (d: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round(
    (new Date(`${d}T00:00:00`).getTime() - today.getTime()) / 86400000
  );
  if (days <= 0) return "Happening today!";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
};