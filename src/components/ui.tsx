"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

// ------------------------------------------------------------------ //
type Tone = "rx" | "scaled" | "red" | "neutral" | "good" | "warn";
const TONE: Record<Tone, string> = {
  rx: "bg-good/15 text-good",
  good: "bg-good/15 text-good",
  scaled: "bg-faint/15 text-muted",
  neutral: "bg-line-2/40 text-muted",
  red: "bg-red/15 text-red",
  warn: "bg-warn/15 text-warn",
};

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "mono inline-flex items-center gap-1 px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider leading-none",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker text-red">{children}</p>;
}

export function SectionTitle({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {kicker && <p className="kicker mb-1 text-faint">{kicker}</p>}
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Avatar({
  initials,
  size = 40,
  tone = "default",
}: {
  initials: string;
  size?: number;
  tone?: "default" | "red" | "you";
}) {
  const bg =
    tone === "red"
      ? "bg-red text-white"
      : tone === "you"
        ? "bg-good text-[#04210f]"
        : "bg-surface-2 text-muted";
  return (
    <span
      className={cx(
        "mono inline-flex shrink-0 items-center justify-center border border-line font-bold uppercase",
        bg,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

export function ProgressBar({
  value,
  max,
  tone = "red",
}: {
  value: number;
  max: number;
  tone?: "red" | "good" | "warn";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color =
    tone === "good" ? "bg-good" : tone === "warn" ? "bg-warn" : "bg-red";
  return (
    <div className="h-1.5 w-full bg-line-2/40">
      <div
        className={cx("h-full transition-[width] duration-500", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 border border-line bg-surface p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cx(
              "mono flex-1 px-2 py-2 text-[0.7rem] font-bold uppercase tracking-wider transition-colors",
              active
                ? "bg-red text-white"
                : "text-muted hover:text-fg",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="card-2 p-3">
      <p className="kicker mb-1.5 text-faint">{label}</p>
      <p
        className={cx(
          "font-display text-3xl leading-none tabular",
          accent && "text-red",
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="mb-1 text-faint">{icon}</div>
      <p className="font-display text-xl">{title}</p>
      <p className="max-w-[16rem] text-sm text-muted">{body}</p>
    </div>
  );
}

// ------------------------------------------------------------------ //
// Bottom sheet
// ------------------------------------------------------------------ //
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <div className="fade-in absolute inset-0 bg-black/65" onClick={onClose} />
      <div className="sheet-panel relative w-full max-w-[480px] border-t border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="font-display text-xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center text-muted hover:text-fg"
          >
            <X size={20} />
          </button>
        </div>
        <div className="safe-b max-h-[78dvh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
