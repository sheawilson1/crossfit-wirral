import Image from "next/image";
import { Reveal } from "./Reveal";
import { programs } from "@/lib/content";

export function Programs() {
  return (
    <section id="classes" className="relative border-b border-steel bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker mb-5 flex items-center gap-3 text-red">
                <span className="inline-block h-px w-8 bg-red" />
                Ways to train
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-bone">
                Pick your <span className="text-hollow-red">start</span> line
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-smoke">
              Whether you&apos;ve never touched a barbell or you&apos;re chasing a PR, there&apos;s a
              way in. Every route is coached, scalable and built around you.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px border border-steel bg-steel md:grid-cols-2">
          {programs.map((p, i) => (
            <Reveal key={p.no} delay={(i % 2) * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden bg-char">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-char via-char/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span className="font-display text-3xl text-red">{p.no}</span>
                    <span className="mono bg-ink/70 px-2 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-bone backdrop-blur">
                      {p.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl text-bone transition-colors group-hover:text-red sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-smoke">{p.desc}</p>
                  <ul className="mt-6 flex flex-col gap-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm text-bone">
                        <span className="text-red">›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#visit"
                    className="mono mt-7 inline-flex items-center gap-2 self-start text-[0.72rem] uppercase tracking-[0.16em] text-bone link-sweep"
                  >
                    Start here <span className="text-red">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
