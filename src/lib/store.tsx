"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AppState, Metric, PR, ScoreEntry, Theme } from "./types";
import { buildSeedState } from "./seed";
import { todayISO } from "./format";

const STORAGE_KEY = "cfw-state-v2";

interface Store extends AppState {
  hydrated: boolean;
  // bookings
  isBooked: (slotId: string) => boolean;
  toggleBooking: (slotId: string) => void;
  // scores / whiteboard
  setScore: (
    dateISO: string,
    workoutLabel: string,
    entry: Omit<ScoreEntry, "id" | "name" | "initials" | "isUser">,
  ) => void;
  removeScore: (dateISO: string) => void;
  // progress
  addPR: (prId: string, value: number) => void;
  addMetric: (weightKg: number) => void;
  // settings / session
  setTheme: (t: Theme) => void;
  signIn: () => void;
  signOut: () => void;
  resetDemo: () => void;
}

const Ctx = createContext<Store | null>(null);

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const effective =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.classList.toggle("dark", effective === "dark");
  root.classList.toggle("light", effective === "light");
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => buildSeedState());
  const [hydrated, setHydrated] = useState(false);
  const persistRef = useRef(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        setState((s) => ({ ...s, ...parsed }));
        if (parsed.theme) applyTheme(parsed.theme);
      }
    } catch {
      /* ignore corrupt state */
    }
    persistRef.current = true;
    setHydrated(true);
  }, []);

  // Persist on change (after first hydrate).
  useEffect(() => {
    if (!persistRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota / private mode — ignore */
    }
  }, [state]);

  // Keep "system" theme in sync with OS changes.
  useEffect(() => {
    applyTheme(state.theme);
    if (state.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [state.theme]);

  const isBooked = (slotId: string) => state.bookings.includes(slotId);

  const toggleBooking = (slotId: string) =>
    setState((s) => ({
      ...s,
      bookings: s.bookings.includes(slotId)
        ? s.bookings.filter((b) => b !== slotId)
        : [...s.bookings, slotId],
    }));

  const setScore: Store["setScore"] = (dateISO, workoutLabel, entry) =>
    setState((s) => {
      const full: ScoreEntry = {
        ...entry,
        id: `user_${dateISO}`,
        name: "You",
        initials: "SW",
        isUser: true,
      };
      const log = s.log.filter((l) => l.id !== `log_${dateISO}`);
      log.unshift({
        id: `log_${dateISO}`,
        dateISO,
        title: workoutLabel,
        detail: entry.value,
        rx: entry.rx,
      });
      return { ...s, userScores: { ...s.userScores, [dateISO]: full }, log };
    });

  const removeScore = (dateISO: string) =>
    setState((s) => {
      const userScores = { ...s.userScores };
      delete userScores[dateISO];
      return {
        ...s,
        userScores,
        log: s.log.filter((l) => l.id !== `log_${dateISO}`),
      };
    });

  const addPR = (prId: string, value: number) =>
    setState((s) => ({
      ...s,
      prs: s.prs.map((pr: PR) =>
        pr.id === prId
          ? {
              ...pr,
              value,
              dateISO: todayISO(),
              history: [...pr.history, { value, dateISO: todayISO() }],
            }
          : pr,
      ),
    }));

  const addMetric = (weightKg: number) =>
    setState((s) => {
      const iso = todayISO();
      const others = s.metrics.filter((m: Metric) => m.dateISO !== iso);
      return {
        ...s,
        metrics: [...others, { id: "m_" + iso, dateISO: iso, weightKg }].sort(
          (a, b) => a.dateISO.localeCompare(b.dateISO),
        ),
      };
    });

  const setTheme = (t: Theme) => {
    applyTheme(t);
    setState((s) => ({ ...s, theme: t }));
  };

  const signIn = () => setState((s) => ({ ...s, signedIn: true }));
  const signOut = () => setState((s) => ({ ...s, signedIn: false }));

  const resetDemo = () =>
    setState((s) => ({
      ...buildSeedState(),
      signedIn: s.signedIn,
      theme: s.theme,
    }));

  const value: Store = {
    ...state,
    hydrated,
    isBooked,
    toggleBooking,
    setScore,
    removeScore,
    addPR,
    addMetric,
    setTheme,
    signIn,
    signOut,
    resetDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
