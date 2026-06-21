// Date + small math helpers. Everything is local-time, ISO = "YYYY-MM-DD".

export function isoFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return isoFromDate(new Date());
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return isoFromDate(d);
}

export function dayOfWeek(iso: string): number {
  return parseISO(iso).getDay(); // 0 = Sun
}

const WD_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WD_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MO_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const weekdayShort = (iso: string) => WD_SHORT[dayOfWeek(iso)];
export const weekdayLong = (iso: string) => WD_LONG[dayOfWeek(iso)];
export const dayNum = (iso: string) => parseISO(iso).getDate();
export const monthShort = (iso: string) => MO_SHORT[parseISO(iso).getMonth()];

export function prettyDate(iso: string): string {
  return `${weekdayLong(iso)} ${dayNum(iso)} ${monthShort(iso)}`;
}

export function relativeDay(iso: string): string {
  const t = todayISO();
  if (iso === t) return "Today";
  if (iso === addDays(t, 1)) return "Tomorrow";
  if (iso === addDays(t, -1)) return "Yesterday";
  return weekdayLong(iso);
}

// Deterministic string hash → unsigned int
export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Seeded 0..1 from a string
export function rand01(seed: string): number {
  return (hashStr(seed) % 100000) / 100000;
}

// Pick deterministically from an array
export function pick<T>(arr: T[], seed: string): T {
  return arr[hashStr(seed) % arr.length];
}

export function secToClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function clockToSec(clock: string): number {
  const parts = clock.split(":").map((n) => parseInt(n, 10));
  if (parts.length === 2 && !parts.some(isNaN)) return parts[0] * 60 + parts[1];
  return NaN;
}

export const KG_PER_LB = 0.45359237;
