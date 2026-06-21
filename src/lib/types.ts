export type ClassType =
  | "CrossFit"
  | "Weightlifting"
  | "Gymnastics"
  | "Open Gym";

export type Track = "CrossFit" | "Competition" | "Scaled / Health";

export interface ClassSlot {
  id: string;
  dateISO: string;
  time: string; // "HH:MM" 24h
  durationMin: number;
  type: ClassType;
  coach: string;
  capacity: number;
  baseBooked: number; // seeded attendance, excluding the user
}

export interface WorkoutSection {
  title: string;
  lines: string[];
}

export type ScoreType = "time" | "reps" | "rounds" | "load";

export interface Metcon {
  title: string;
  style: string; // e.g. "5 Rounds For Time", "AMRAP 12"
  scoreType: ScoreType;
  rx: string[];
  scaled: string[];
  timeCap?: string;
  notes?: string;
}

export interface Workout {
  dateISO: string;
  name: string; // session codename, e.g. "PALMIER"
  warmup: WorkoutSection;
  strength?: WorkoutSection;
  metcon: Metcon;
}

export type RxTag = "Rx" | "Scaled";

export interface ScoreEntry {
  id: string;
  name: string;
  initials: string;
  value: string; // "12:34", "185 reps", "120 kg"
  rx: RxTag;
  note?: string;
  isUser?: boolean;
}

export type PRCategory = "Lift" | "Benchmark" | "Gymnastics";

export interface PRHistoryPoint {
  value: number;
  dateISO: string;
}

export interface PR {
  id: string;
  name: string;
  category: PRCategory;
  unit: string; // "kg", "reps", "time"
  value: number; // for time PRs, seconds (lower is better)
  dateISO: string;
  history: PRHistoryPoint[];
}

export interface Metric {
  id: string;
  dateISO: string;
  weightKg: number;
}

export interface LogEntry {
  id: string;
  dateISO: string;
  title: string;
  detail: string; // result line
  rx?: RxTag;
}

export type Theme = "dark" | "light" | "system";

export interface AppState {
  signedIn: boolean;
  theme: Theme;
  bookings: string[]; // slot ids
  /** user scores keyed by workout key `${dateISO}` */
  userScores: Record<string, ScoreEntry>;
  prs: PR[];
  metrics: Metric[];
  log: LogEntry[];
}
