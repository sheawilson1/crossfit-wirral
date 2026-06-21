import Image from "next/image";
import { Reveal } from "./Reveal";
import { gym } from "@/lib/content";

const creds = ["CrossFit Level 2 Trainer", "Founder & Head Coach", `Coaching since ${gym.established}`];

export function Coach() {
  return (
    <section id="coach" className="relative overflow-hidden border-b border-steel bg-coal py-24 sm:py-32">
      <div className="red-glow absolute -left-40 bottom-0 h-[30rem] w-[30rem] opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-stretch gap-px border border-steel bg-steel lg:grid-cols-12">
          {/* Image */}
          <div className="relative min-h-[28rem] overflow-hidden bg-char lg:col-span-5">
            <Image
              src="/gym/p04.jpg"
              alt="Inside the box at CrossFit Wirral"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-char/90 via-transparent to-char/30" />
            <div className="absolute bottom-6 left-6">
              <Image src="/brand/logo-mark.png" alt="" width={70} height={66} className="h-14 w-auto opacity-90" />
            </div>
            <span className="mono absolute right-5 top-5 rotate-90 origin-right text-[0.6rem] uppercase tracking-[0.3em] text-bone/70">
              The Coach
            </span>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center bg-ink p-8 sm:p-12 lg:col-span-7">
            <Reveal>
              <p className="kicker mb-6 text-red">Meet the coach</p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-bone">
                Chris Lawler
              </h2>
              <p className="mono mt-2 text-sm uppercase tracking-[0.18em] text-smoke">
                Founder · CrossFit Level&nbsp;2 Trainer
              </p>

              <p className="mt-7 text-lg leading-relaxed text-smoke">
                Chris opened CrossFit Wirral in {gym.established} and has coached the box ever since.
                He&apos;s the reason people who &quot;don&apos;t do gyms&quot; end up training four
                times a week — patient with beginners, sharp on technique, and genuinely invested in
                every member who walks through the door.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ash">
                You&apos;re not buying a swipe card here. You&apos;re getting a coach who knows your
                name, your goals and exactly when to tell you to add another plate.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {creds.map((c) => (
                  <span
                    key={c}
                    className="mono border border-steel bg-char px-3 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-bone"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <blockquote className="mt-9 border-l-2 border-red pl-5">
                <p className="font-display text-2xl leading-tight text-bone sm:text-3xl">
                  &ldquo;Give me an hour and I&apos;ll give you the best one of your day.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
