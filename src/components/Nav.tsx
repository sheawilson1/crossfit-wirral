"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, gym } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-steel"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="relative z-50 flex items-center gap-3" aria-label="CrossFit Wirral home">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={40}
              height={38}
              className="h-9 w-auto"
              priority
            />
            <Image
              src="/brand/logo-wordmark.png"
              alt="CrossFit Wirral"
              width={1030}
              height={196}
              className="hidden h-[18px] w-auto sm:block"
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-sweep mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-smoke transition-colors hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#visit" className="btn btn-primary hidden sm:inline-flex">
              Book free session
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-steel bg-char/60 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`h-[2px] w-5 bg-bone transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-bone transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 bg-bone transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink transition-all duration-400 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="grid-texture absolute inset-0 opacity-60" aria-hidden />
        <div className="red-glow absolute -right-40 top-20 h-96 w-96" aria-hidden />
        <nav className="relative mt-28 flex flex-col gap-1 px-6">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-steel py-5 text-4xl text-bone transition-colors hover:text-red"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mono mr-4 align-middle text-xs text-red">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="relative mt-auto px-6 pb-10">
          <a href="#visit" onClick={() => setOpen(false)} className="btn btn-primary btn-block mb-3">
            Book free session
          </a>
          <a href={`tel:${gym.phoneIntl}`} className="btn btn-ghost btn-block">
            Call {gym.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
