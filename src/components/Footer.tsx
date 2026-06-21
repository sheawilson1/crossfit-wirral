import Image from "next/image";
import { gym, nav } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-steel pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/brand/logo-wordmark.png"
              alt="CrossFit Wirral"
              width={1030}
              height={196}
              className="h-7 w-auto"
            />
            <p className="font-display mt-6 text-4xl leading-[0.95] text-bone sm:text-5xl">
              The best hour
              <br />
              of your <span className="text-hollow-red">day.</span>
            </p>
            <a href="#visit" className="btn btn-primary mt-8">
              Book free session
            </a>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="mono mb-5 text-[0.65rem] uppercase tracking-[0.2em] text-ash">Explore</h3>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-sweep text-smoke transition-colors hover:text-bone">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mono mb-5 text-[0.65rem] uppercase tracking-[0.2em] text-ash">Find us</h3>
            <address className="space-y-3 not-italic text-smoke">
              <p className="leading-snug">
                {gym.address.line1},<br />
                {gym.address.line2},<br />
                {gym.address.postcode}
              </p>
              <p>
                <a href={`tel:${gym.phoneIntl}`} className="link-sweep hover:text-bone">
                  {gym.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${gym.email}`} className="link-sweep hover:text-bone">
                  {gym.email}
                </a>
              </p>
            </address>
            <div className="mt-5 flex gap-3">
              <a
                href={gym.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-steel text-smoke transition-colors hover:border-red hover:text-red"
                aria-label="CrossFit Wirral on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={gym.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-steel text-smoke transition-colors hover:border-red hover:text-red"
                aria-label="CrossFit Wirral on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
            © {year} {gym.name} · CrossFit® affiliate since {gym.established}
          </p>
          <p className="mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
            Birkenhead · Wirral · CH41 9HH
          </p>
        </div>
      </div>

      {/* Oversized watermark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="font-display whitespace-nowrap text-center text-[18vw] leading-[0.8] text-char">
          CFW
        </div>
      </div>
    </footer>
  );
}
