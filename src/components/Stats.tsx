"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { stats } from "@/lib/content";

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Years (e.g. 2012) shouldn't count up from zero — show them straight away.
  const isYear = to >= 1000;
  const [val, setVal] = useState(isYear ? to : 0);

  useEffect(() => {
    if (!inView || isYear) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, isYear]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-b border-steel bg-coal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`group relative px-5 py-10 sm:px-8 sm:py-14 ${
              i !== 0 ? "border-l border-steel" : ""
            } ${i === 2 ? "border-l lg:border-l" : ""} ${i >= 2 ? "border-t border-steel lg:border-t-0" : ""}`}
          >
            <div className="font-display text-5xl text-bone transition-colors group-hover:text-red sm:text-6xl">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-3 max-w-[18ch] text-sm leading-snug text-smoke">{s.label}</p>
            <span className="absolute right-5 top-6 mono text-[0.7rem] text-steel-2">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
