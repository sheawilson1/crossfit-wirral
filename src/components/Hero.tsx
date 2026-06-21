"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { gym } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/gym/p11.jpg"
          alt="Athletes training on the floor at CrossFit Wirral"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-transparent" />
        <div className="grid-texture absolute inset-0 opacity-50" />
        <div className="red-glow absolute -left-32 bottom-10 h-[34rem] w-[34rem] opacity-70" />
      </div>

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute left-0 right-0 top-[72px] z-10 hidden border-y border-steel/60 sm:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
          <span className="kicker text-smoke">Birkenhead · Wirral</span>
          <span className="kicker text-smoke">Affiliated CrossFit since 2012</span>
          <span className="kicker text-red">● Coaching today</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="kicker mb-6 flex items-center gap-3 text-bone"
        >
          <span className="inline-block h-px w-10 bg-red" />
          Wirral&apos;s original CrossFit box
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,13vw,12rem)] text-bone">
          {["THE BEST", "HOUR OF", "YOUR DAY"].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.12 }}
              className="block"
            >
              {line === "HOUR OF" ? (
                <>
                  <span className="text-hollow-red">HOUR</span> OF
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-lg leading-relaxed text-smoke">
            Coached CrossFit classes for <span className="text-bone">every</span> level — first-timers
            to competitors — in one gritty Birkenhead box. No experience needed.
            Your first hour is on us.
          </p>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-3">
              <a href="#visit" className="btn btn-primary">
                Book free session
              </a>
              <a href="#timetable" className="btn btn-ghost">
                See timetable
              </a>
            </div>
            <a
              href={`https://wa.me/${gym.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-[0.72rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
            >
              or message us on WhatsApp →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mx-auto hidden w-full max-w-7xl px-8 pb-6 sm:block">
        <div className="flex items-center gap-3 text-ash">
          <span className="mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-px bg-red"
            style={{ maxWidth: 60 }}
          />
        </div>
      </div>
    </section>
  );
}
