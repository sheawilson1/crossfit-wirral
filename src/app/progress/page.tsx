"use client";

import { useMemo, useState } from "react";
import { Dumbbell, Plus, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";
import {
  monthShort,
  prettyDate,
  relativeDay,
  secToClock,
  clockToSec,
  todayISO,
  dayNum,
} from "@/lib/format";
import { cx, EmptyState, Segmented, Sheet, Stat, Tag } from "@/components/ui";
import type { PR, PRCategory } from "@/lib/types";

type Tab = "log" | "prs" | "body";

function formatPR(pr: PR): string {
  if (pr.unit === "time") return secToClock(pr.value);
  return `${pr.value} ${pr.unit}`;
}

function Sparkline({ values, better }: { values: number[]; better: "up" | "down" }) {
  if (values.length < 2) return null;
  const w = 64;
  const h = 22;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = values[values.length - 1];
  const first = values[0];
  const improved = better === "up" ? last >= first : last <= first;
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={improved ? "var(--color-good)" : "var(--color-red)"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProgressPage() {
  const { log, prs, metrics, addPR, addMetric } = useStore();
  const today = todayISO();
  const [tab, setTab] = useState<Tab>("log");

  const sortedLog = useMemo(
    () => [...log].sort((a, b) => b.dateISO.localeCompare(a.dateISO)),
    [log],
  );
  const sortedMetrics = useMemo(
    () => [...metrics].sort((a, b) => a.dateISO.localeCompare(b.dateISO)),
    [metrics],
  );

  const monthSessions = log.filter(
    (l) => l.dateISO.slice(0, 7) === today.slice(0, 7),
  ).length;
  const latestWeight = sortedMetrics.at(-1)?.weightKg ?? 0;
  const startWeight = sortedMetrics[0]?.weightKg ?? 0;
  const weightDelta = Math.round((latestWeight - startWeight) * 10) / 10;

  // PR sheet
  const [prOpen, setPrOpen] = useState(false);
  const [prId, setPrId] = useState(prs[0]?.id ?? "");
  const [prVal, setPrVal] = useState("");
  const activePr = prs.find((p) => p.id === prId);

  function openPr(id?: string) {
    setPrId(id ?? prs[0]?.id ?? "");
    setPrVal("");
    setPrOpen(true);
  }
  function savePr() {
    if (!activePr) return;
    const n =
      activePr.unit === "time" ? clockToSec(prVal) : parseFloat(prVal);
    if (!n || isNaN(n)) return;
    addPR(activePr.id, activePr.unit === "kg" ? Math.round(n * 10) / 10 : Math.round(n));
    setPrOpen(false);
  }

  // Weight sheet
  const [wOpen, setWOpen] = useState(false);
  const [wVal, setWVal] = useState("");
  function saveWeight() {
    const n = parseFloat(wVal);
    if (!n || isNaN(n)) return;
    addMetric(Math.round(n * 10) / 10);
    setWOpen(false);
  }

  const grouped = useMemo(() => {
    const g: Record<PRCategory, PR[]> = {
      Lift: [],
      Benchmark: [],
      Gymnastics: [],
    };
    prs.forEach((p) => g[p.category].push(p));
    return g;
  }, [prs]);

  return (
    <div className="pb-8">
      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        <Stat label="This month" value={monthSessions} sub="sessions" accent />
        <Stat label="Bodyweight" value={latestWeight} sub="kg" />
        <Stat label="Lifts" value={grouped.Lift.length} sub="tracked" />
      </div>

      <div className="px-4 pt-4">
        <Segmented
          options={[
            { label: "Log", value: "log" },
            { label: "PRs", value: "prs" },
            { label: "Body", value: "body" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div className="px-4 pt-4">
        {tab === "log" &&
          (sortedLog.length === 0 ? (
            <EmptyState
              icon={<Dumbbell size={28} />}
              title="No sessions yet"
              body="Log a score from the Workout tab and it'll show up here."
            />
          ) : (
            <div className="flex flex-col gap-2">
              {sortedLog.map((l) => (
                <div key={l.id} className="card flex items-center gap-3 p-3">
                  <div className="flex w-12 shrink-0 flex-col items-center border-r border-line pr-3">
                    <span className="font-display text-xl leading-none tabular">
                      {dayNum(l.dateISO)}
                    </span>
                    <span className="mono text-[0.55rem] uppercase text-faint">
                      {monthShort(l.dateISO)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{l.title}</p>
                    <p className="mono text-xs text-muted">{relativeDay(l.dateISO)}</p>
                  </div>
                  {l.rx && <Tag tone={l.rx === "Rx" ? "rx" : "scaled"}>{l.rx}</Tag>}
                  <span className="font-display text-xl tabular">{l.detail}</span>
                </div>
              ))}
            </div>
          ))}

        {tab === "prs" && (
          <div className="flex flex-col gap-5">
            <button onClick={() => openPr()} className="btn btn-primary btn-block">
              <Plus size={16} /> Log a PR
            </button>
            {(["Lift", "Benchmark", "Gymnastics"] as PRCategory[]).map((cat) =>
              grouped[cat].length ? (
                <div key={cat}>
                  <p className="kicker mb-2 text-faint">{cat}</p>
                  <div className="card divide-y divide-line">
                    {grouped[cat].map((pr) => (
                      <button
                        key={pr.id}
                        onClick={() => openPr(pr.id)}
                        className="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-surface-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{pr.name}</p>
                          <p className="mono text-[0.62rem] uppercase tracking-wider text-faint">
                            {prettyDate(pr.dateISO)}
                          </p>
                        </div>
                        <Sparkline
                          values={pr.history.map((h) => h.value)}
                          better={pr.unit === "time" ? "down" : "up"}
                        />
                        <span className="font-display w-20 text-right text-2xl leading-none tabular">
                          {formatPR(pr)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        )}

        {tab === "body" && (
          <div>
            <div className="card p-4">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="kicker text-faint">Bodyweight</p>
                  <p className="font-display text-4xl leading-none">
                    {latestWeight}
                    <span className="text-xl text-muted"> kg</span>
                  </p>
                </div>
                <span
                  className={cx(
                    "mono flex items-center gap-1 text-sm",
                    weightDelta <= 0 ? "text-good" : "text-warn",
                  )}
                >
                  {weightDelta <= 0 ? (
                    <TrendingDown size={15} />
                  ) : (
                    <TrendingUp size={15} />
                  )}
                  {weightDelta > 0 ? "+" : ""}
                  {weightDelta} kg
                </span>
              </div>
              <WeightChart values={sortedMetrics.map((m) => m.weightKg)} />
              <p className="mono mt-2 text-center text-[0.6rem] uppercase tracking-wider text-faint">
                Last {sortedMetrics.length} weeks
              </p>
            </div>

            <button
              onClick={() => setWOpen(true)}
              className="btn btn-primary btn-block mt-4"
            >
              <Scale size={16} /> Log today&apos;s weight
            </button>
          </div>
        )}
      </div>

      {/* PR sheet */}
      <Sheet open={prOpen} onClose={() => setPrOpen(false)} title="Log a PR">
        <label className="kicker mb-1.5 block text-faint">Movement</label>
        <select
          value={prId}
          onChange={(e) => setPrId(e.target.value)}
          className="w-full border border-line bg-surface-2 px-3 py-3 text-sm outline-none focus:border-red"
        >
          {prs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.category})
            </option>
          ))}
        </select>

        <label className="kicker mb-1.5 mt-4 block text-faint">
          New best{activePr ? ` (${activePr.unit})` : ""}
        </label>
        <input
          value={prVal}
          onChange={(e) => setPrVal(e.target.value)}
          autoFocus
          inputMode={activePr?.unit === "time" ? "text" : "decimal"}
          placeholder={
            activePr?.unit === "time"
              ? "mm:ss"
              : activePr?.unit === "kg"
                ? "kg"
                : "reps"
          }
          className="mono w-full border border-line bg-surface-2 px-3 py-3 text-lg outline-none focus:border-red"
        />
        {activePr && (
          <p className="mt-2 text-xs text-muted">
            Current: <span className="mono text-fg">{formatPR(activePr)}</span>
          </p>
        )}
        <button
          onClick={savePr}
          disabled={!prVal.trim()}
          className="btn btn-primary btn-block mt-5"
        >
          Save PR
        </button>
      </Sheet>

      {/* Weight sheet */}
      <Sheet open={wOpen} onClose={() => setWOpen(false)} title="Log bodyweight">
        <label className="kicker mb-1.5 block text-faint">Weight (kg)</label>
        <input
          value={wVal}
          onChange={(e) => setWVal(e.target.value)}
          autoFocus
          inputMode="decimal"
          placeholder={String(latestWeight)}
          className="mono w-full border border-line bg-surface-2 px-3 py-3 text-lg outline-none focus:border-red"
        />
        <button
          onClick={saveWeight}
          disabled={!wVal.trim()}
          className="btn btn-primary btn-block mt-5"
        >
          Save
        </button>
      </Sheet>
    </div>
  );
}

function WeightChart({ values }: { values: number[] }) {
  if (values.length < 2)
    return <p className="py-8 text-center text-sm text-muted">Not enough data yet.</p>;
  const w = 320;
  const h = 120;
  const pad = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i: number) => pad + (i / (values.length - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / span) * (h - pad * 2);
  const line = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <polygon points={area} fill="var(--color-red)" opacity="0.1" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((v, i) =>
        i === values.length - 1 ? (
          <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="var(--color-red)" />
        ) : null,
      )}
    </svg>
  );
}
