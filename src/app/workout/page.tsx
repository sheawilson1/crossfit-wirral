"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircleCheck,
  ClipboardList,
  Flame,
  Moon,
  PencilLine,
  Timer,
  Trophy,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { seedScoresForDate, workoutForDate } from "@/lib/seed";
import {
  addDays,
  clockToSec,
  dayNum,
  prettyDate,
  relativeDay,
  todayISO,
  weekdayShort,
} from "@/lib/format";
import { cx, Segmented, Sheet, Tag } from "@/components/ui";
import type { RxTag, ScoreEntry, ScoreType } from "@/lib/types";

function numKey(value: string): number {
  const m = value.match(/(\d+)\s*\+\s*(\d+)/); // "5 + 12"
  if (m) return parseInt(m[1]) * 1000 + parseInt(m[2]);
  const n = value.match(/\d+(\.\d+)?/);
  return n ? parseFloat(n[0]) : 0;
}

function rankScores(entries: ScoreEntry[], scoreType: ScoreType): ScoreEntry[] {
  return [...entries].sort((a, b) => {
    if (a.rx !== b.rx) return a.rx === "Rx" ? -1 : 1; // Rx ranks above Scaled
    if (scoreType === "time") {
      const av = clockToSec(a.value) || 1e9;
      const bv = clockToSec(b.value) || 1e9;
      return av - bv;
    }
    return numKey(b.value) - numKey(a.value);
  });
}

const SCORE_HINT: Record<ScoreType, string> = {
  time: "mm:ss  ·  e.g. 12:34",
  rounds: "rounds + reps  ·  e.g. 5 + 12",
  reps: "total reps  ·  e.g. 184",
  load: "load  ·  e.g. 120 kg",
};

export default function WorkoutPage() {
  const { userScores, setScore, removeScore } = useStore();
  const today = todayISO();
  const [selected, setSelected] = useState(today);
  const [variant, setVariant] = useState<RxTag>("Rx");

  const strip = useMemo(
    () => Array.from({ length: 14 }, (_, i) => addDays(today, i - 4)),
    [today],
  );
  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [selected]);

  const workout = workoutForDate(selected);
  const userScore = userScores[selected];

  const board = useMemo(() => {
    if (!workout) return [];
    const seed = seedScoresForDate(selected, workout.metcon.scoreType);
    const merged = userScore ? [userScore, ...seed] : seed;
    return rankScores(merged, workout.metcon.scoreType);
  }, [selected, workout, userScore]);

  const [logOpen, setLogOpen] = useState(false);
  const [val, setVal] = useState("");
  const [rx, setRx] = useState<RxTag>("Rx");
  const [note, setNote] = useState("");

  function openLog() {
    setVal(userScore?.value ?? "");
    setRx(userScore?.rx ?? "Rx");
    setNote(userScore?.note ?? "");
    setLogOpen(true);
  }

  function save() {
    if (!val.trim() || !workout) return;
    setScore(selected, `${workout.name} · ${workout.metcon.title}`, {
      value: val.trim(),
      rx,
      note: note.trim() || undefined,
    });
    setLogOpen(false);
  }

  return (
    <div className="pb-8">
      {/* Date strip */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line px-4 py-3">
        {strip.map((iso) => {
          const active = iso === selected;
          return (
            <button
              key={iso}
              ref={active ? activeRef : undefined}
              onClick={() => setSelected(iso)}
              className={cx(
                "flex w-12 shrink-0 flex-col items-center gap-1 border py-2 transition-colors",
                active
                  ? "border-red bg-red text-white"
                  : "border-line text-muted hover:border-line-2",
              )}
            >
              <span className="mono text-[0.58rem] font-bold uppercase tracking-wider">
                {weekdayShort(iso)}
              </span>
              <span className="font-display text-xl leading-none tabular">
                {dayNum(iso)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-end justify-between px-4 pb-1 pt-4">
        <div>
          <p className="kicker text-red">{relativeDay(selected)}</p>
          <h2 className="font-display text-2xl">{prettyDate(selected)}</h2>
        </div>
        <span className="mono text-xs text-muted">CrossFit</span>
      </div>

      {!workout ? (
        <div className="px-4 pt-4">
          <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
            <Moon size={28} className="mb-1 text-faint" />
            <p className="font-display text-2xl">Rest day</p>
            <p className="max-w-[15rem] text-sm text-muted">
              No programming on Sundays. Stretch, sleep, refuel.
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 pt-3">
          <p className="font-display text-4xl text-red">{workout.name}</p>

          {/* Warm-up */}
          <Block icon={<Flame size={15} />} label="Warm-up" title={workout.warmup.title}>
            <ul className="flex flex-col gap-1.5">
              {workout.warmup.lines.map((l, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-red" />
                  {l}
                </li>
              ))}
            </ul>
          </Block>

          {/* Strength */}
          {workout.strength && (
            <Block
              icon={<Trophy size={15} />}
              label="Strength / Skill"
              title={workout.strength.title}
            >
              <ul className="flex flex-col gap-1.5">
                {workout.strength.lines.map((l, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-red" />
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {/* Metcon */}
          <div className="card mt-3">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="mono flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-widest text-red">
                <Timer size={14} /> Workout of the day
              </span>
              {workout.metcon.timeCap && (
                <Tag tone="neutral">Cap {workout.metcon.timeCap}</Tag>
              )}
            </div>
            <div className="p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{workout.metcon.title}</h3>
              </div>
              <p className="mono mb-3 text-sm text-fg">{workout.metcon.style}</p>

              <div className="mb-3">
                <Segmented
                  options={[
                    { label: "Rx", value: "Rx" },
                    { label: "Scaled", value: "Scaled" },
                  ]}
                  value={variant}
                  onChange={setVariant}
                />
              </div>

              <ul className="flex flex-col gap-2">
                {(variant === "Rx" ? workout.metcon.rx : workout.metcon.scaled).map(
                  (l, i) => (
                    <li key={i} className="flex items-baseline gap-2.5">
                      <span className="mono mt-0.5 text-xs text-faint tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem]">{l}</span>
                    </li>
                  ),
                )}
              </ul>

              {workout.metcon.notes && (
                <p className="mt-3 border-l-2 border-red bg-surface-2 px-3 py-2 text-sm text-muted">
                  {workout.metcon.notes}
                </p>
              )}

              {/* Log score */}
              {userScore ? (
                <div className="mt-4 flex items-center justify-between border border-good bg-good/10 p-3">
                  <div>
                    <p className="mono text-[0.6rem] uppercase tracking-wider text-good">
                      Your score
                    </p>
                    <p className="font-display text-2xl leading-tight">
                      {userScore.value}{" "}
                      <span className="text-base text-muted">· {userScore.rx}</span>
                    </p>
                  </div>
                  <button
                    onClick={openLog}
                    className="mono flex items-center gap-1.5 border border-line px-3 py-2 text-[0.62rem] font-bold uppercase tracking-wider text-muted hover:text-fg"
                  >
                    <PencilLine size={13} /> Edit
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLog}
                  className="btn btn-primary btn-block mt-4"
                >
                  <CircleCheck size={16} /> Log your score
                </button>
              )}
            </div>
          </div>

          {/* Whiteboard */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <ClipboardList size={16} className="text-red" />
              <h3 className="font-display text-xl">Whiteboard</h3>
              <span className="mono text-xs text-faint">{board.length} logged</span>
            </div>

            <div className="card divide-y divide-line">
              {board.map((e, i) => (
                <div
                  key={e.id}
                  className={cx(
                    "flex items-center gap-3 px-3 py-2.5",
                    e.isUser && "bg-good/10",
                  )}
                >
                  <span
                    className={cx(
                      "mono w-6 text-center text-sm font-bold tabular",
                      i === 0 ? "text-red" : "text-faint",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cx(
                      "mono grid h-8 w-8 shrink-0 place-items-center border text-[0.62rem] font-bold uppercase",
                      e.isUser
                        ? "border-good bg-good text-[#04210f]"
                        : "border-line bg-surface-2 text-muted",
                    )}
                  >
                    {e.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {e.isUser ? "You" : e.name}
                    </p>
                    {e.note && (
                      <p className="truncate text-xs text-faint">{e.note}</p>
                    )}
                  </div>
                  <Tag tone={e.rx === "Rx" ? "rx" : "scaled"}>{e.rx}</Tag>
                  <span className="font-display ml-1 w-16 text-right text-lg tabular">
                    {e.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Log score sheet */}
      <Sheet
        open={logOpen}
        onClose={() => setLogOpen(false)}
        title={workout ? `Log · ${workout.metcon.title}` : "Log score"}
      >
        {workout && (
          <>
            <label className="kicker mb-1.5 block text-faint">Result</label>
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              autoFocus
              placeholder={SCORE_HINT[workout.metcon.scoreType]}
              className="mono w-full border border-line bg-surface-2 px-3 py-3 text-lg outline-none focus:border-red"
            />

            <label className="kicker mb-1.5 mt-4 block text-faint">
              How did you do it?
            </label>
            <Segmented
              options={[
                { label: "Rx", value: "Rx" },
                { label: "Scaled", value: "Scaled" },
              ]}
              value={rx}
              onChange={setRx}
            />

            <label className="kicker mb-1.5 mt-4 block text-faint">
              Note (optional)
            </label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Felt strong, broke pull-ups 11-7-3…"
              className="w-full border border-line bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-red"
            />

            <button
              onClick={save}
              disabled={!val.trim()}
              className="btn btn-primary btn-block mt-5"
            >
              {userScore ? "Update score" : "Post to whiteboard"}
            </button>
            {userScore && (
              <button
                onClick={() => {
                  removeScore(selected);
                  setLogOpen(false);
                }}
                className="mono mt-3 block w-full py-2 text-center text-xs uppercase tracking-wider text-faint hover:text-red"
              >
                Remove my score
              </button>
            )}
          </>
        )}
      </Sheet>
    </div>
  );
}

function Block({
  icon,
  label,
  title,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card mt-3 p-4">
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="text-red">{icon}</span>
        <span className="mono text-[0.62rem] font-bold uppercase tracking-widest text-red">
          {label}
        </span>
      </div>
      <p className="mb-3 font-medium">{title}</p>
      {children}
    </div>
  );
}
