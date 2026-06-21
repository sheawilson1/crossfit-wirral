"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Clock, Moon, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { CAPACITY, HOURS, classesForDate, isClosed } from "@/lib/schedule";
import {
  addDays,
  dayNum,
  prettyDate,
  relativeDay,
  todayISO,
  weekdayShort,
} from "@/lib/format";
import { cx, ProgressBar, Tag } from "@/components/ui";
import type { ClassType } from "@/lib/types";

const TYPE_TONE: Record<ClassType, "red" | "neutral" | "warn"> = {
  CrossFit: "red",
  Weightlifting: "warn",
  Gymnastics: "warn",
  "Open Gym": "neutral",
};

export default function BookPage() {
  const { bookings, toggleBooking } = useStore();
  const today = todayISO();
  const [selected, setSelected] = useState(today);
  const stripRef = useRef<HTMLDivElement>(null);

  const week = useMemo(
    () => Array.from({ length: 14 }, (_, i) => addDays(today, i)),
    [today],
  );

  const slots = useMemo(() => classesForDate(selected), [selected]);
  const closed = isClosed(selected);

  const hoursLabel =
    weekdayShort(selected) === "Sat"
      ? HOURS.saturday
      : closed
        ? HOURS.sunday
        : HOURS.weekday;

  return (
    <div className="pb-8">
      {/* Date strip */}
      <div
        ref={stripRef}
        className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line px-4 py-3"
      >
        {week.map((iso) => {
          const active = iso === selected;
          const sunday = isClosed(iso);
          return (
            <button
              key={iso}
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
              <span
                className={cx(
                  "h-1 w-1 rounded-full",
                  active
                    ? "bg-white"
                    : sunday
                      ? "bg-transparent"
                      : "bg-good",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Day header */}
      <div className="flex items-end justify-between px-4 pb-2 pt-4">
        <div>
          <p className="kicker text-red">{relativeDay(selected)}</p>
          <h2 className="font-display text-2xl">{prettyDate(selected)}</h2>
        </div>
        <span className="mono flex items-center gap-1.5 text-xs text-muted">
          <Clock size={14} /> {hoursLabel}
        </span>
      </div>

      {/* Slots */}
      <div className="px-4 pt-2">
        {closed ? (
          <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
            <Moon size={28} className="mb-1 text-faint" />
            <p className="font-display text-2xl">Closed Sundays</p>
            <p className="max-w-[15rem] text-sm text-muted">
              No classes today — the box is shut. Enjoy the rest day and we&apos;ll
              see you Monday.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {slots.map((s) => {
              const booked = bookings.includes(s.id);
              const count = s.baseBooked + (booked ? 1 : 0);
              const spotsLeft = CAPACITY - count;
              const full = spotsLeft <= 0 && !booked;
              return (
                <div
                  key={s.id}
                  className={cx(
                    "card p-3.5",
                    booked && "border-good",
                  )}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex w-14 shrink-0 flex-col items-center">
                      <span className="font-display text-2xl leading-none tabular">
                        {s.time}
                      </span>
                      <span className="mono mt-1 text-[0.58rem] uppercase tracking-wider text-faint">
                        {s.durationMin}m
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-display text-lg leading-none">
                          {s.type}
                        </span>
                        {s.type !== "CrossFit" && (
                          <Tag tone={TYPE_TONE[s.type]}>{s.type === "Open Gym" ? "Open" : s.type}</Tag>
                        )}
                      </div>
                      <p className="mb-2.5 text-xs text-muted">Coach {s.coach}</p>

                      <ProgressBar
                        value={count}
                        max={CAPACITY}
                        tone={spotsLeft <= 3 ? "red" : "good"}
                      />
                      <p className="mono mt-1.5 flex items-center gap-1 text-[0.62rem] uppercase tracking-wider">
                        <Users size={12} className="text-faint" />
                        <span
                          className={cx(
                            full
                              ? "text-red"
                              : spotsLeft <= 3
                                ? "text-warn"
                                : "text-muted",
                          )}
                        >
                          {full ? "Class full" : `${spotsLeft} of ${CAPACITY} left`}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBooking(s.id)}
                      disabled={full}
                      className={cx(
                        "mono min-w-[5.2rem] self-center px-3 py-2.5 text-[0.66rem] font-bold uppercase tracking-wider transition-colors",
                        booked
                          ? "bg-good text-[#04210f]"
                          : full
                            ? "cursor-not-allowed border border-line text-faint"
                            : "bg-red text-white hover:bg-red-bright",
                      )}
                    >
                      {booked ? (
                        <span className="inline-flex items-center gap-1">
                          <Check size={13} /> Booked
                        </span>
                      ) : full ? (
                        "Full"
                      ) : (
                        "Book"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
