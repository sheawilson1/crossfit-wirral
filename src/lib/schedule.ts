import type { ClassSlot, ClassType } from "./types";
import { dayOfWeek, hashStr } from "./format";

export const CAPACITY = 20;
export const COACHES = ["Dec", "Marcus", "Hannah", "Liv", "Tom", "Ronnie"];

// Opening hours, in plain words (used in the UI copy).
export const HOURS = {
  weekday: "06:00 – 20:00",
  saturday: "07:00 – 11:45",
  sunday: "Closed",
};

interface SlotDef {
  time: string;
  durationMin: number;
  type: ClassType;
}

// Weekday timetable — morning block, a midday gap (no early-afternoon
// classes), then an evening block. Open Gym caps each end.
const WEEKDAY: SlotDef[] = [
  { time: "06:00", durationMin: 60, type: "CrossFit" },
  { time: "07:00", durationMin: 60, type: "CrossFit" },
  { time: "09:00", durationMin: 60, type: "CrossFit" },
  { time: "10:00", durationMin: 60, type: "Open Gym" },
  // ——— midday gap, nothing scheduled ———
  { time: "16:30", durationMin: 60, type: "CrossFit" },
  { time: "17:30", durationMin: 60, type: "CrossFit" },
  { time: "18:30", durationMin: 60, type: "CrossFit" },
  { time: "19:00", durationMin: 60, type: "Open Gym" },
];

// Saturday — morning only, last class wrapped up by 11:45.
const SATURDAY: SlotDef[] = [
  { time: "07:30", durationMin: 60, type: "CrossFit" },
  { time: "08:30", durationMin: 60, type: "CrossFit" },
  { time: "09:30", durationMin: 60, type: "CrossFit" },
  { time: "10:45", durationMin: 60, type: "Open Gym" },
];

// A couple of weekday evening swaps for variety (deterministic by weekday).
function flavour(slot: SlotDef, dow: number): ClassType {
  if (slot.time === "18:30" && dow === 2) return "Weightlifting";
  if (slot.time === "18:30" && dow === 4) return "Gymnastics";
  if (slot.time === "09:00" && dow === 3) return "Weightlifting";
  return slot.type;
}

export function isClosed(iso: string): boolean {
  return dayOfWeek(iso) === 0; // Sunday
}

export function classesForDate(iso: string): ClassSlot[] {
  const dow = dayOfWeek(iso);
  if (dow === 0) return []; // Sunday — closed
  const defs = dow === 6 ? SATURDAY : WEEKDAY;

  return defs.map((d) => {
    const type = flavour(d, dow);
    const id = `${iso}_${d.time}`;
    const h = hashStr(id);
    const coach = COACHES[h % COACHES.length];
    // Evenings fuller than mornings; Open Gym lighter.
    const hourNum = parseInt(d.time.slice(0, 2), 10);
    const peak = hourNum >= 16 ? 9 : 3;
    let base = peak + ((h >> 3) % 11); // spread of attendance
    if (type === "Open Gym") base = Math.max(2, base - 6);
    base = Math.min(base, CAPACITY);
    return {
      id,
      dateISO: iso,
      time: d.time,
      durationMin: d.durationMin,
      type,
      coach,
      capacity: CAPACITY,
      baseBooked: base,
    };
  });
}
