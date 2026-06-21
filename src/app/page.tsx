"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarPlus,
  Check,
  Dumbbell,
  Flame,
  MessageSquarePlus,
  Moon,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { ANNOUNCEMENTS, MEMBER, workoutForDate } from "@/lib/seed";
import { classesForDate, isClosed } from "@/lib/schedule";
import {
  addDays,
  hashStr,
  prettyDate,
  relativeDay,
  todayISO,
  weekdayShort,
} from "@/lib/format";
import { Avatar, Sheet } from "@/components/ui";
import { asset } from "@/lib/asset";

function photoFor(seed: string) {
  return asset(`/gym/p${String(1 + (hashStr(seed) % 15)).padStart(2, "0")}.jpg`);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const { bookings, log, toggleBooking } = useStore();
  const today = todayISO();
  const closed = isClosed(today);
  const workout = workoutForDate(today);

  const todaysBooked = useMemo(() => {
    const slots = classesForDate(today);
    return slots.find((s) => bookings.includes(s.id)) ?? null;
  }, [bookings, today]);

  const trained = useMemo(() => new Set(log.map((l) => l.dateISO)), [log]);
  const days = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const iso = addDays(today, -(13 - i));
        return { iso, on: trained.has(iso), isToday: iso === today };
      }),
    [today, trained],
  );

  const streak = useMemo(() => {
    let n = 0;
    let cursor = trained.has(today) ? today : addDays(today, -1);
    while (trained.has(cursor)) {
      n++;
      cursor = addDays(cursor, -1);
    }
    return n;
  }, [trained, today]);

  const monthCount = useMemo(
    () => log.filter((l) => l.dateISO.slice(0, 7) === today.slice(0, 7)).length,
    [log, today],
  );

  const upcoming = useMemo(() => {
    const out: {
      id: string;
      dateISO: string;
      time: string;
      type: string;
      coach: string;
    }[] = [];
    for (let i = 0; i < 14 && out.length < 4; i++) {
      const iso = addDays(today, i);
      for (const s of classesForDate(iso)) {
        if (bookings.includes(s.id))
          out.push({ id: s.id, dateISO: iso, time: s.time, type: s.type, coach: s.coach });
      }
    }
    return out;
  }, [bookings, today]);

  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState<typeof ANNOUNCEMENTS>([]);

  function post() {
    const body = draft.trim();
    if (!body) return;
    setPosts((p) => [
      {
        id: "u" + Date.now(),
        author: MEMBER.name,
        initials: MEMBER.initials,
        when: "Just now",
        body,
      },
      ...p,
    ]);
    setDraft("");
    setComposeOpen(false);
  }

  const feed = [...posts, ...ANNOUNCEMENTS];

  return (
    <div className="pb-8">
      <div className="px-4 pb-3 pt-5">
        <p className="kicker text-faint">{prettyDate(today)}</p>
        <h1 className="font-display mt-1 text-3xl">
          {greeting()}, {MEMBER.firstName}.
        </h1>
      </div>

      <div className="px-4">
        <div className="slab relative overflow-hidden border border-line">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${photoFor("hero" + today)})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,9,10,0.45) 0%, rgba(8,9,10,0.82) 70%, rgba(8,9,10,0.95) 100%)",
            }}
            aria-hidden
          />
          <div className="relative p-4 text-[#f1eee7]">
            <p className="kicker mb-2 text-red">Today&apos;s session</p>

            {closed || !workout ? (
              <>
                <div className="mb-2 flex items-center gap-2">
                  <Moon size={22} className="text-[#c9c6bf]" />
                  <h2 className="font-display text-4xl">Rest day</h2>
                </div>
                <p className="max-w-xs text-sm text-[#c9c6bf]">
                  The box is closed on Sundays. Mobilise, eat well, and come back
                  ready to attack the week.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl leading-none">
                  {workout.name}
                </h2>
                <p className="mono mt-1 text-sm text-[#c9c6bf]">
                  {workout.metcon.title} · {workout.metcon.style}
                </p>

                <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
                  {todaysBooked ? (
                    <span className="mono inline-flex items-center gap-1.5 text-sm text-good">
                      <Check size={16} /> You&apos;re in · {todaysBooked.time}{" "}
                      {todaysBooked.type}
                    </span>
                  ) : (
                    <span className="mono text-sm text-[#c9c6bf]">
                      Not booked in yet
                    </span>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/workout"
                    className="btn btn-ghost flex-1 !text-white"
                    style={{ boxShadow: "inset 0 0 0 1.4px rgba(255,255,255,0.4)" }}
                  >
                    <Dumbbell size={16} /> Workout
                  </Link>
                  <Link href="/book" className="btn btn-primary flex-1">
                    {todaysBooked ? "Manage" : "Book in"} <ArrowRight size={16} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="mt-6 px-4">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="kicker text-faint">Consistency</p>
            <span className="mono inline-flex items-center gap-1.5 text-sm text-red">
              <Flame size={16} />
              {streak} day{streak === 1 ? "" : "s"} · {monthCount} this month
            </span>
          </div>
          <div className="flex items-end justify-between gap-1">
            {days.map((d) => (
              <div
                key={d.iso}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div
                  className={"w-full " + (d.on ? "bg-good" : "bg-line-2/50")}
                  style={{ height: d.on ? 34 : 14 }}
                />
                <span
                  className={
                    "mono text-[0.55rem] " +
                    (d.isToday ? "font-bold text-red" : "text-faint")
                  }
                >
                  {weekdayShort(d.iso)[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="kicker text-faint">Upcoming bookings</p>
          <Link href="/book" className="mono text-xs text-red">
            Book more
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <Link href="/book" className="card flex items-center justify-between p-4">
            <span className="text-sm text-muted">
              No classes booked. Tap to grab a slot.
            </span>
            <CalendarPlus size={18} className="text-red" />
          </Link>
        ) : (
          <div className="flex flex-col gap-2">
            {upcoming.map((b) => (
              <div key={b.id} className="card flex items-center gap-3 p-3">
                <div className="grid h-11 w-11 place-items-center bg-surface-2">
                  <span className="mono text-lg font-bold leading-none tabular">
                    {b.time.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {b.type} · {b.time}
                  </p>
                  <p className="text-xs text-muted">
                    {relativeDay(b.dateISO)} · Coach {b.coach}
                  </p>
                </div>
                <button
                  onClick={() => toggleBooking(b.id)}
                  className="mono border border-line px-2.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-wider text-muted hover:border-red hover:text-red"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 px-4">
        <p className="kicker mb-3 text-faint">From the community</p>
        <button
          onClick={() => setComposeOpen(true)}
          className="card mb-3 flex w-full items-center gap-3 p-3 text-left"
        >
          <Avatar initials={MEMBER.initials} size={36} tone="you" />
          <span className="flex-1 text-sm text-muted">Post a message…</span>
          <MessageSquarePlus size={18} className="text-red" />
        </button>

        <div className="flex flex-col gap-2">
          {feed.map((p) => (
            <article key={p.id} className="card p-3">
              <div className="mb-2 flex items-center gap-2.5">
                <Avatar
                  initials={p.initials}
                  size={34}
                  tone={p.author === MEMBER.name ? "you" : "red"}
                />
                <div>
                  <p className="text-sm font-medium leading-tight">{p.author}</p>
                  <p className="mono text-[0.62rem] uppercase tracking-wider text-faint">
                    {p.when}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Sheet
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="New post"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          autoFocus
          placeholder="Share a win, ask a question, hype the 6am crew…"
          className="w-full resize-none border border-line bg-surface-2 p-3 text-sm outline-none focus:border-red"
        />
        <button
          onClick={post}
          disabled={!draft.trim()}
          className="btn btn-primary btn-block mt-3"
        >
          Post to community
        </button>
      </Sheet>
    </div>
  );
}
