"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./Reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-b border-steel bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="kicker mb-5 flex items-center gap-3 text-red">
                <span className="inline-block h-px w-8 bg-red" />
                Good questions
              </p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-bone">
                Before you
                <br />
                <span className="text-hollow">walk in</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-smoke">
                Still unsure? That&apos;s normal. Message us on WhatsApp and a real human (usually
                Chris) will answer.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-steel">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-steel">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="mono text-[0.7rem] text-red">0{i + 1}</span>
                        <span
                          className={`text-lg font-semibold transition-colors sm:text-xl ${
                            isOpen ? "text-red" : "text-bone"
                          }`}
                        >
                          {f.q}
                        </span>
                      </span>
                      <span
                        className={`relative flex h-7 w-7 flex-shrink-0 items-center justify-center border border-steel transition-colors ${
                          isOpen ? "bg-red" : ""
                        }`}
                      >
                        <span className={`absolute h-px w-3 ${isOpen ? "bg-ink" : "bg-bone"}`} />
                        <span
                          className={`absolute h-3 w-px transition-transform ${
                            isOpen ? "rotate-90 bg-ink" : "bg-bone"
                          }`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-8 pr-4 text-base leading-relaxed text-smoke">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
