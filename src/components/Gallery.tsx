import Image from "next/image";
import { Reveal } from "./Reveal";
import { gallery } from "@/lib/content";

function span(s: string) {
  if (s === "wide") return "sm:col-span-2";
  if (s === "tall") return "sm:row-span-2";
  return "";
}

export function Gallery() {
  return (
    <section id="gallery" className="relative border-b border-steel bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-bone">
              Inside <span className="text-hollow-red">the box</span>
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-smoke">
              No frills, no fancy machines. Barbells, rigs, rowers and a community that shows up.
              This is where the work happens.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 0.06} className={`${span(g.span)} group relative overflow-hidden`}>
              <div className="relative h-full w-full overflow-hidden bg-char">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <span className="mono absolute bottom-3 left-3 right-3 translate-y-2 text-[0.62rem] uppercase tracking-[0.12em] text-bone opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
