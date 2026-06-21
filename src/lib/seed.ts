import type {
  AppState,
  LogEntry,
  Metric,
  PR,
  ScoreEntry,
  ScoreType,
  Workout,
} from "./types";
import {
  addDays,
  hashStr,
  secToClock,
  todayISO,
} from "./format";
import { classesForDate, isClosed } from "./schedule";

export const MEMBER = {
  name: "Shea Wilson",
  firstName: "Shea",
  initials: "SW",
  plan: "Unlimited",
  since: "Mar 2022",
};

export const GYM = {
  name: "CrossFit Wirral",
  short: "CFW",
  town: "Birkenhead",
  est: "2012",
};

export const ANNOUNCEMENTS = [
  {
    id: "a1",
    author: "Coach Dec",
    initials: "DC",
    when: "2h ago",
    body: "Hero WOD ‘Murph’ programmed for Saturday — partner & scaled options on the board. Wear a vest if you've got one. 💪",
  },
  {
    id: "a2",
    author: "CFW",
    initials: "CFW",
    when: "Yesterday",
    body: "Reminder: the box is closed Sundays. Sat classes finish at 11:45 sharp — grab your slot early, they fill up.",
  },
  {
    id: "a3",
    author: "Coach Hannah",
    initials: "HA",
    when: "2 days ago",
    body: "Olympic lifting club back on Tuesday evenings. Snatch technique focus this block — all levels welcome.",
  },
];

// ------------------------------------------------------------------ //
// Workout pool
// ------------------------------------------------------------------ //
const WARMUPS = [
  {
    title: "8:00 Continuous flow — 3 rounds",
    lines: [
      "20 Single unders",
      "10 Banded pass throughs",
      "10 Banded pull aparts",
      "10 Dumbbell deadlifts (light)",
      "10s Handstand hold",
      "10s Hollow rock",
    ],
  },
  {
    title: "Row + mobility — 2 rounds",
    lines: [
      "250m Row easy",
      "10 Air squats",
      "10 Scap pull-ups",
      "8 Inchworm + push-up",
      "0:30 Couch stretch / side",
    ],
  },
  {
    title: "Pulse raiser — 3 rounds",
    lines: [
      "30s Bike",
      "10 Walking lunges",
      "8 PVC pass throughs",
      "6 Wall walk shrugs",
      "0:20 Plank",
    ],
  },
];

type Template = Omit<Workout, "dateISO" | "warmup"> & { warmupIdx: number };

const TEMPLATES: Template[] = [
  {
    name: "PALMIER",
    warmupIdx: 0,
    strength: {
      title: "Skill — Handstand walk",
      lines: ["10:00 practice", "Wall walks · shoulder taps · 10–20ft walks"],
    },
    metcon: {
      title: "Freedom",
      style: "5 Rounds For Time",
      scoreType: "time",
      rx: ["100ft Farmers carry (32.5/22.5 kg)", "50ft Handstand walk (or 4 wall walks)"],
      scaled: ["100ft Farmers carry (22.5/15 kg)", "4 Wall walks"],
      timeCap: "16:00",
      notes: "Pace the carries, keep transitions sharp.",
    },
  },
  {
    name: "FRAN",
    warmupIdx: 1,
    metcon: {
      title: "Fran",
      style: "21-15-9 For Time",
      scoreType: "time",
      rx: ["Thrusters (43/30 kg)", "Pull-ups"],
      scaled: ["Thrusters (30/20 kg)", "Banded pull-ups"],
      timeCap: "8:00",
      notes: "Benchmark. Go unbroken if you can — log it for the PR board.",
    },
  },
  {
    name: "GRIND",
    warmupIdx: 2,
    strength: {
      title: "Strength — Back squat",
      lines: ["5 × 5 @ 75%", "Rest 2:00 between sets", "Tempo: controlled down, drive up"],
    },
    metcon: {
      title: "Grind",
      style: "AMRAP 12",
      scoreType: "rounds",
      rx: ["12 Deadlifts (100/70 kg)", "9 Hang power cleans (60/42.5 kg)", "6 Shoulder to overhead"],
      scaled: ["12 Deadlifts (70/47.5 kg)", "9 Hang power cleans (40/30 kg)", "6 Shoulder to overhead"],
      notes: "Score = rounds + reps.",
    },
  },
  {
    name: "ENGINE",
    warmupIdx: 1,
    metcon: {
      title: "Engine",
      style: "21-18-15-12-9 For Time",
      scoreType: "time",
      rx: ["Calorie row", "Burpees over the rower"],
      scaled: ["Calorie row", "Burpees (no jump)"],
      timeCap: "20:00",
      notes: "Steady on the rower, smooth on the burpees.",
    },
  },
  {
    name: "THE DOCKS",
    warmupIdx: 2,
    metcon: {
      title: "The Docks",
      style: "Chipper — For Time",
      scoreType: "time",
      rx: ["40 Cal bike", "40 Toes-to-bar", "40 DB snatch (22.5/15 kg)", "40 Box jumps (24/20\")"],
      scaled: ["40 Cal bike", "40 Hanging knee raises", "40 DB snatch (15/10 kg)", "40 Box step-ups"],
      timeCap: "18:00",
    },
  },
  {
    name: "GRACE",
    warmupIdx: 0,
    strength: {
      title: "Strength — Push press",
      lines: ["5-5-3-3-1 building", "Last single is a heavy effort, not a max"],
    },
    metcon: {
      title: "Grace",
      style: "30 Clean & Jerk For Time",
      scoreType: "time",
      rx: ["30 Clean & jerk (60/42.5 kg)"],
      scaled: ["30 Clean & jerk (40/30 kg)"],
      timeCap: "10:00",
      notes: "Benchmark. Singles are fine — keep the bar moving.",
    },
  },
  {
    name: "TWO TO TANGO",
    warmupIdx: 1,
    metcon: {
      title: "Two To Tango",
      style: "Partner AMRAP 20",
      scoreType: "rounds",
      rx: ["40 Cal echo bike", "30 Pull-ups", "20 DB thrusters (2×22.5/15 kg)", "Split reps as needed"],
      scaled: ["40 Cal echo bike", "30 Ring rows", "20 DB thrusters (2×15/10 kg)", "Split reps as needed"],
      notes: "One partner works at a time. Score = total rounds + reps.",
    },
  },
];

export function workoutForDate(iso: string): Workout | null {
  if (isClosed(iso)) return null;
  const t = TEMPLATES[hashStr("wod" + iso) % TEMPLATES.length];
  return {
    dateISO: iso,
    name: t.name,
    warmup: WARMUPS[t.warmupIdx],
    strength: t.strength,
    metcon: t.metcon,
  };
}

// ------------------------------------------------------------------ //
// Whiteboard — other members' scores for a given day
// ------------------------------------------------------------------ //
const ROSTER = [
  "Jordan M",
  "Sarah K",
  "Beth O",
  "Connor R",
  "Aoife D",
  "Mikey T",
  "Priya S",
  "Dan W",
  "Ellie F",
  "Ryan G",
  "Chloe B",
];

function initials(name: string): string {
  const p = name.split(" ");
  return (p[0][0] + (p[1]?.[0] ?? "")).toUpperCase();
}

export function seedScoresForDate(iso: string, scoreType: ScoreType): ScoreEntry[] {
  // Deterministic, distinct roster for the day (fuller board, no dupes).
  const order = [...ROSTER].sort(
    (a, b) => hashStr(iso + "|" + a) - hashStr(iso + "|" + b),
  );
  const count = Math.min(order.length, 7 + (hashStr("n" + iso) % 4)); // 7–10
  const out: ScoreEntry[] = [];
  for (let i = 0; i < count; i++) {
    const name = order[i];
    const r = hashStr(iso + name);
    const scaled = r % 4 === 0; // ~25% scaled
    let value = "";
    if (scoreType === "time") {
      const base = 360 + (hashStr("t" + iso) % 540); // 6:00–15:00
      value = secToClock(base + (r % 180) - 60);
    } else if (scoreType === "rounds") {
      const rounds = 3 + (r % 5);
      const reps = r % 18;
      value = `${rounds} + ${reps}`;
    } else if (scoreType === "reps") {
      value = `${120 + (r % 90)} reps`;
    } else {
      value = `${60 + (r % 70)} kg`;
    }
    out.push({
      id: `${iso}_${name}`,
      name,
      initials: initials(name),
      value,
      rx: scaled ? "Scaled" : "Rx",
    });
  }
  return out;
}

// ------------------------------------------------------------------ //
// PRs, metrics, training log
// ------------------------------------------------------------------ //
function prHistory(end: number, drops: number[], startDaysAgo: number): PR["history"] {
  const t = todayISO();
  const pts: PR["history"] = [];
  let v = end;
  let day = 0;
  pts.push({ value: end, dateISO: addDays(t, -day) });
  for (const d of drops) {
    day += 70 + (hashStr(String(v)) % 60);
    v -= d;
    pts.push({ value: v, dateISO: addDays(t, -Math.min(day, startDaysAgo)) });
  }
  return pts.reverse();
}

function seedPRs(): PR[] {
  const t = todayISO();
  const lift = (name: string, value: number, drops: number[]): PR => ({
    id: "pr_" + name.toLowerCase().replace(/\s+/g, "_"),
    name,
    category: "Lift",
    unit: "kg",
    value,
    dateISO: addDays(t, -(20 + (hashStr(name) % 120))),
    history: prHistory(value, drops, 600),
  });
  const bench = (name: string, sec: number): PR => ({
    id: "pr_" + name.toLowerCase().replace(/\s+/g, "_"),
    name,
    category: "Benchmark",
    unit: "time",
    value: sec,
    dateISO: addDays(t, -(30 + (hashStr(name) % 150))),
    history: [
      { value: sec + 95, dateISO: addDays(t, -420) },
      { value: sec + 40, dateISO: addDays(t, -210) },
      { value: sec, dateISO: addDays(t, -(30 + (hashStr(name) % 150))) },
    ],
  });
  const gym = (name: string, reps: number): PR => ({
    id: "pr_" + name.toLowerCase().replace(/\s+/g, "_"),
    name,
    category: "Gymnastics",
    unit: "reps",
    value: reps,
    dateISO: addDays(t, -(15 + (hashStr(name) % 90))),
    history: [
      { value: Math.max(1, reps - 9), dateISO: addDays(t, -300) },
      { value: Math.max(1, reps - 4), dateISO: addDays(t, -120) },
      { value: reps, dateISO: addDays(t, -(15 + (hashStr(name) % 90))) },
    ],
  });

  return [
    lift("Back squat", 145, [5, 7.5, 10, 12.5]),
    lift("Front squat", 120, [5, 5, 10]),
    lift("Deadlift", 185, [10, 10, 15]),
    lift("Clean & jerk", 100, [2.5, 5, 7.5]),
    lift("Snatch", 78, [3, 4, 5]),
    lift("Strict press", 65, [2.5, 5]),
    bench("Fran", 4 * 60 + 12),
    bench("Grace", 3 * 60 + 48),
    gym("Max strict pull-ups", 18),
    gym("Max consecutive HSPU", 12),
  ];
}

function seedMetrics(): Metric[] {
  const t = todayISO();
  const out: Metric[] = [];
  let w = 84.5;
  for (let i = 11; i >= 0; i--) {
    const iso = addDays(t, -i * 7);
    w += (((hashStr(iso) % 100) / 100) - 0.55) * 0.9; // gentle drift down
    out.push({ id: "m_" + iso, dateISO: iso, weightKg: Math.round(w * 10) / 10 });
  }
  return out;
}

function seedLog(): LogEntry[] {
  const t = todayISO();
  const out: LogEntry[] = [];
  // Walk back over recent days the member "trained".
  let added = 0;
  for (let i = 1; i <= 21 && added < 6; i++) {
    const iso = addDays(t, -i);
    if (isClosed(iso)) continue;
    if (hashStr("att" + iso) % 3 === 0) continue; // some rest days
    const w = workoutForDate(iso);
    if (!w) continue;
    const r = hashStr("res" + iso);
    let detail = "";
    if (w.metcon.scoreType === "time") detail = secToClock(420 + (r % 360));
    else if (w.metcon.scoreType === "rounds") detail = `${4 + (r % 4)} + ${r % 15} rounds`;
    else detail = `${120 + (r % 80)} reps`;
    out.push({
      id: "log_" + iso,
      dateISO: iso,
      title: `${w.name} · ${w.metcon.title}`,
      detail,
      rx: r % 5 === 0 ? "Scaled" : "Rx",
    });
    added++;
  }
  return out;
}

// First upcoming bookable slot (today if open & in future-ish, else next open day)
function seedBookings(): string[] {
  const t = todayISO();
  for (let i = 0; i < 7; i++) {
    const iso = addDays(t, i);
    const slots = classesForDate(iso);
    if (slots.length) {
      // pick an evening class for realism
      const evening = slots.find((s) => s.time === "17:30") ?? slots[0];
      return [evening.id];
    }
  }
  return [];
}

export function buildSeedState(): AppState {
  return {
    signedIn: false,
    theme: "dark",
    bookings: seedBookings(),
    userScores: {},
    prs: seedPRs(),
    metrics: seedMetrics(),
    log: seedLog(),
  };
}
