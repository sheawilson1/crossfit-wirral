"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  CalendarClock,
  ChevronRight,
  CreditCard,
  Dumbbell,
  History,
  LogOut,
  MapPin,
  Phone,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { GYM, MEMBER } from "@/lib/seed";
import { CAPACITY, HOURS, classesForDate } from "@/lib/schedule";
import { dayNum, monthShort, prettyDate, todayISO } from "@/lib/format";
import { Avatar, cx, Segmented, Sheet, Tag } from "@/components/ui";
import type { Theme } from "@/lib/types";

export default function ProfilePage() {
  const { theme, setTheme, signOut, resetDemo, bookings, log } = useStore();
  const today = todayISO();

  const [notify, setNotify] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const bookingDetails = useMemo(() => {
    return bookings
      .map((id) => {
        const iso = id.slice(0, 10);
        const time = id.slice(11);
        const slot = classesForDate(iso).find((s) => s.time === time);
        return slot ? { id, iso, time, type: slot.type, coach: slot.coach } : null;
      })
      .filter(Boolean)
      .sort((a, b) => (a!.id < b!.id ? 1 : -1)) as {
      id: string;
      iso: string;
      time: string;
      type: string;
      coach: string;
    }[];
  }, [bookings]);

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 pb-4 pt-6">
        <Avatar initials={MEMBER.initials} size={64} tone="you" />
        <div>
          <h1 className="font-display text-3xl leading-none">{MEMBER.name}</h1>
          <p className="mono mt-1.5 text-xs uppercase tracking-wider text-faint">
            Member since {MEMBER.since}
          </p>
        </div>
      </div>

      {/* Membership */}
      <div className="px-4">
        <div className="slab relative overflow-hidden border border-line bg-surface p-4">
          <div className="red-glow absolute -right-10 -top-10 h-40 w-40" aria-hidden />
          <div className="relative">
            <div className="mb-3 flex items-center justify-between">
              <span className="mono flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-widest text-red">
                <CreditCard size={14} /> Membership
              </span>
              <Tag tone="rx">Active</Tag>
            </div>
            <p className="font-display text-3xl">{MEMBER.plan}</p>
            <p className="mt-1 text-sm text-muted">
              Unlimited classes · renews 1 {monthShort(today)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-5 px-4">
        <div className="card divide-y divide-line">
          <Row
            icon={<History size={18} />}
            label="Booking history"
            onClick={() => setHistoryOpen(true)}
          />
          <RowLink icon={<Dumbbell size={18} />} label="Training history" href="/progress" />
          <RowLink icon={<Trophy size={18} />} label="Personal records" href="/progress" />
        </div>
      </div>

      {/* Appearance */}
      <div className="mt-6 px-4">
        <p className="kicker mb-2 text-faint">Appearance</p>
        <div className="card p-4">
          <p className="mb-3 text-sm text-muted">
            Dark mode is on by default. Switch any time.
          </p>
          <Segmented
            options={[
              { label: "System", value: "system" },
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
            ]}
            value={theme}
            onChange={(t: Theme) => setTheme(t)}
          />
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 px-4">
        <p className="kicker mb-2 text-faint">Notifications</p>
        <div className="card flex items-center justify-between p-4">
          <span className="flex items-center gap-2.5">
            <Bell size={18} className="text-muted" />
            <span className="text-sm">Class reminders</span>
          </span>
          <Toggle on={notify} onChange={setNotify} />
        </div>
      </div>

      {/* Gym info */}
      <div className="mt-6 px-4">
        <p className="kicker mb-2 text-faint">{GYM.name}</p>
        <div className="card flex flex-col gap-3 p-4 text-sm">
          <InfoRow icon={<CalendarClock size={16} />} label="Mon – Fri" value={HOURS.weekday} />
          <InfoRow icon={<CalendarClock size={16} />} label="Saturday" value={HOURS.saturday} />
          <InfoRow icon={<CalendarClock size={16} />} label="Sunday" value="Closed" />
          <div className="my-1 border-t border-line" />
          <InfoRow icon={<MapPin size={16} />} label="Location" value={`${GYM.town}, Wirral`} />
          <InfoRow icon={<Phone size={16} />} label="Reception" value="0151 555 0123" />
          <p className="mono mt-1 text-[0.62rem] uppercase tracking-wider text-faint">
            Up to {CAPACITY} athletes per class
          </p>
        </div>
      </div>

      {/* Danger / utils */}
      <div className="mt-6 flex flex-col gap-2 px-4">
        <button
          onClick={() => setResetOpen(true)}
          className="card flex items-center justify-between p-4 text-left text-muted hover:text-fg"
        >
          <span className="flex items-center gap-2.5">
            <RotateCcw size={18} /> <span className="text-sm">Reset demo data</span>
          </span>
          <ChevronRight size={16} className="text-faint" />
        </button>
        <button
          onClick={signOut}
          className="card flex items-center gap-2.5 p-4 text-left text-red"
        >
          <LogOut size={18} /> <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>

      <p className="mono mt-8 text-center text-[0.58rem] uppercase tracking-widest text-faint">
        CFW member app · concept redesign
      </p>

      {/* Booking history sheet */}
      <Sheet open={historyOpen} onClose={() => setHistoryOpen(false)} title="Booking history">
        {bookingDetails.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No bookings yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {bookingDetails.map((b) => {
              const past = b.iso < today;
              return (
                <div key={b.id} className="card flex items-center gap-3 p-3">
                  <div className="flex w-12 shrink-0 flex-col items-center border-r border-line pr-3">
                    <span className="font-display text-xl leading-none tabular">
                      {dayNum(b.iso)}
                    </span>
                    <span className="mono text-[0.55rem] uppercase text-faint">
                      {monthShort(b.iso)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {b.type} · {b.time}
                    </p>
                    <p className="text-xs text-muted">{prettyDate(b.iso)}</p>
                  </div>
                  <Tag tone={past ? "neutral" : "rx"}>{past ? "Attended" : "Booked"}</Tag>
                </div>
              );
            })}
          </div>
        )}
      </Sheet>

      {/* Reset confirm */}
      <Sheet open={resetOpen} onClose={() => setResetOpen(false)} title="Reset demo data?">
        <p className="text-sm text-muted">
          This clears your bookings, logged scores, PRs and metrics, and restores
          the original demo data. Your theme and sign-in stay as they are.
        </p>
        <button
          onClick={() => {
            resetDemo();
            setResetOpen(false);
          }}
          className="btn btn-primary btn-block mt-5"
        >
          <RotateCcw size={16} /> Reset everything
        </button>
        <button
          onClick={() => setResetOpen(false)}
          className="mono mt-3 block w-full py-2 text-center text-xs uppercase tracking-wider text-faint hover:text-fg"
        >
          Cancel
        </button>
      </Sheet>
    </div>
  );
}

function Row({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-2"
    >
      <span className="text-muted">{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <ChevronRight size={16} className="text-faint" />
    </button>
  );
}

function RowLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link href={href} className="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-surface-2">
      <span className="text-muted">{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <ChevronRight size={16} className="text-faint" />
    </Link>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-faint">{icon}</span>
      <span className="flex-1 text-muted">{label}</span>
      <span className="mono tabular">{value}</span>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={cx(
        "relative h-6 w-11 border transition-colors",
        on ? "border-good bg-good" : "border-line bg-surface-2",
      )}
    >
      <span
        className={cx(
          "absolute top-0.5 h-4 w-4 transition-all",
          on ? "left-[1.45rem] bg-[#04210f]" : "left-0.5 bg-faint",
        )}
      />
    </button>
  );
}
