"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { timetable, gym } from "@/lib/content";

export function Timetable() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0 … Sun=6
  // Default to today, but if today has no classes (Sunday) open Monday instead.
  const [active, setActive] = useState(timetable[todayIdx].sessions.length ? todayIdx : 0);
  const day = timetable[active];
  const am = day.sessions.filter((s) => s.period === "AM");
  const pm = day.sessions.filter((s) => s.period === "PM");

  return (
    <section id="timetable" className="relative overflow-hidden border-b border-steel bg-ink py-24 sm:py-32">
      <div className="grid-texture absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker mb-5 flex items-center gap-3 text-red">
              <span className="inline-block h-px w-8 bg-red" />
              The timetable
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-bone">
              40+ classes <span className="text-hollow">a week</span>
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-smoke">
            Eight class times a day, six days a week. There&apos;s a slot before work, at lunch and
            after the school run. Just turn up — no class booking gymnastics.
          </p>
        </div>

        {/* Day tabs */}
        <div className="no-scrollbar -mx-5 flex gap-px overflow-x-auto border-y border-steel bg-steel px-5 sm:mx-0 sm:px-0">
          {timetable.map((d, i) => {
            const isActive = i === active;
            const isToday = i === todayIdx;
            return (
              <button
                key={d.day}
                onClick={() => setActive(i)}
                className={`relative flex-1 whitespace-nowrap px-4 py-5 text-center transition-colors sm:px-2 ${
                  isActive ? "bg-red text-ink" : "bg-coal text-smoke hover:bg-char hover:text-bone"
                }`}
              >
                <span className="font-display text-xl sm:text-2xl">{d.short}</span>
                {isToday && (
                  <span
                    className={`mono absolute left-1/2 top-1.5 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.15em] ${
                      isActive ? "text-ink/70" : "text-red"
                    }`}
                  >
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sessions */}
        <div className="min-h-[18rem] border border-t-0 border-steel bg-coal p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {day.sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="font-display text-5xl text-steel-2 sm:text-7xl">Rest Day</div>
                  <p className="mt-4 max-w-sm text-smoke">
                    Sunday is for recovery. Eat well, sleep, and come back Monday ready to go.
                  </p>
                </div>
              ) : (
                <div className="grid gap-10 sm:grid-cols-2">
                  {[
                    { title: "Morning", set: am },
                    { title: "Afternoon & evening", set: pm },
                  ].map((group) =>
                    group.set.length ? (
                      <div key={group.title}>
                        <div className="mb-5 flex items-center gap-3">
                          <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-ash">
                            {group.title}
                          </span>
                          <span className="h-px flex-1 bg-steel" />
                          <span className="mono text-[0.7rem] text-steel-2">{group.set.length}</span>
                        </div>
                        <ul className="flex flex-col gap-px bg-steel">
                          {group.set.map((s) => (
                            <li
                              key={s.time}
                              className="group flex items-center justify-between bg-coal px-4 py-4 transition-colors hover:bg-char"
                            >
                              <span className="font-display text-2xl text-bone sm:text-3xl">{s.time}</span>
                              <span className="flex items-center gap-3">
                                <span className="text-sm text-smoke">{s.label}</span>
                                <span className="mono text-[0.6rem] uppercase tracking-[0.15em] text-red opacity-0 transition-opacity group-hover:opacity-100">
                                  Book →
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ash">
            New here? Start with a free intro — we&apos;ll find the class time that fits your week.
          </p>
          <div className="flex gap-3">
            <a href="#visit" className="btn btn-primary">
              Book free session
            </a>
            <a
              href={`https://wa.me/${gym.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
