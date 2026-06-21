import { Reveal } from "./Reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="relative border-b border-steel bg-coal py-24 sm:py-32">
      <div className="grid-texture absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-5 flex items-center gap-3 text-red">
            <span className="inline-block h-px w-8 bg-red" />
            From the community
          </p>
          <h2 className="font-display mb-14 text-[clamp(2.5rem,6vw,5rem)] text-bone">
            People who <span className="text-hollow">stayed</span>
          </h2>
        </Reveal>

        <div className="grid gap-px border border-steel bg-steel md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between bg-char p-8">
                <div>
                  <div className="font-display text-5xl leading-none text-red">&ldquo;</div>
                  <blockquote className="-mt-3 text-lg leading-relaxed text-bone">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-steel pt-5">
                  <span className="flex h-10 w-10 items-center justify-center bg-red font-display text-lg text-ink">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-bone">{t.name}</span>
                    <span className="mono block text-[0.65rem] uppercase tracking-[0.12em] text-ash">
                      {t.meta}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
