import { Reveal } from "./Reveal";
import { classFlow, community } from "@/lib/content";

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden border-b border-steel bg-ink py-24 sm:py-32">
      <div className="grid-texture absolute inset-0 opacity-40" aria-hidden />
      <div className="red-glow absolute -right-40 top-0 h-[30rem] w-[30rem] opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker mb-6 flex items-center gap-3 text-red">
                <span className="inline-block h-px w-8 bg-red" />
                Why CrossFit Wirral
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] text-bone">
                Think you&apos;re
                <br />
                not fit enough?
                <br />
                <span className="text-hollow">That&apos;s the point.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={0.1}>
              <p className="text-xl leading-relaxed text-smoke sm:text-2xl">
                You don&apos;t get fit and <span className="text-bone">then</span> start CrossFit.
                CrossFit is <span className="text-bone">how</span> you get fit. Every single workout is
                scaled to exactly where you are today — so a total beginner and a seasoned athlete
                train side by side in the same room, pushed by the same coach.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ash">
                No mirrors to perform for. No machines to figure out alone. No standing around
                guessing. Just one coached hour, a workout that changes every day, and a room full
                of people who&apos;ll learn your name and have your back.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-px border border-steel bg-steel">
              {community.map((c, i) => (
                <Reveal key={c.stat} delay={0.15 + i * 0.08}>
                  <div className="h-full bg-char px-3 py-6 text-center sm:px-5">
                    <div className="font-display text-2xl text-red sm:text-3xl">{c.stat}</div>
                    <div className="mt-2 text-xs leading-snug text-smoke sm:text-sm">{c.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* The hour, broken down */}
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <div className="mb-8 flex items-end justify-between border-b border-steel pb-4">
              <h3 className="font-display text-2xl text-bone sm:text-3xl">What one hour looks like</h3>
              <span className="mono hidden text-xs uppercase tracking-[0.2em] text-ash sm:block">
                60 minutes · fully coached
              </span>
            </div>
          </Reveal>
          <div className="grid gap-px border border-steel bg-steel sm:grid-cols-2 lg:grid-cols-4">
            {classFlow.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="group h-full bg-coal p-7 transition-colors hover:bg-char">
                  <div className="mono mb-5 text-xs uppercase tracking-[0.15em] text-red">{step.time}</div>
                  <div className="font-display text-2xl text-bone">{step.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">{step.desc}</p>
                  <div className="mt-6 h-px w-full bg-steel">
                    <div
                      className="h-px bg-red transition-all duration-500 group-hover:w-full"
                      style={{ width: `${(i + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
