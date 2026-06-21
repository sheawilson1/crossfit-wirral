import Image from "next/image";
import { Reveal } from "./Reveal";
import { freeSteps, gym } from "@/lib/content";

export function FreeSession() {
  return (
    <section id="free" className="relative overflow-hidden border-b border-steel bg-ink py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.12]">
        <Image src="/gym/p08.jpg" alt="" fill sizes="100vw" className="object-cover grayscale" />
      </div>
      <div className="red-glow absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="kicker mb-6 text-red">No card. No commitment. No catch.</p>
            <h2 className="font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.85] text-bone">
              Your first hour
              <br />
              is <span className="text-hollow-red">on us</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-smoke">
              Come and try a real class, fully coached and scaled to you. If it&apos;s not for you,
              no hard feelings. If it is — and it usually is — we&apos;ll sort your membership after.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px border border-steel bg-steel sm:grid-cols-3">
          {freeSteps.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.1}>
              <div className="h-full bg-coal p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl text-red">{s.no}</span>
                  <span className="h-px flex-1 bg-steel" />
                </div>
                <h3 className="font-display mt-5 text-2xl text-bone">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#visit" className="btn btn-primary">
              Claim your free session
            </a>
            <a
              href={`https://wa.me/${gym.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp {gym.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
