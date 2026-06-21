"use client";

import { useState } from "react";
import { gym, bookingTimes, experienceLevels, hours } from "@/lib/content";

const field =
  "w-full border border-steel bg-coal px-4 py-3 text-bone placeholder:text-ash focus:border-red focus:outline-none transition-colors";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const time = String(data.get("time") || "");
    const exp = String(data.get("experience") || "");
    const msg = String(data.get("message") || "");

    const subject = `Free session booking — ${name || "new enquiry"}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Preferred time: ${time}`,
      `Experience: ${exp}`,
      "",
      msg,
    ].join("\n");

    setSent(true);
    // Open the visitor's mail client with everything pre-filled — no backend needed.
    const mailto = `mailto:${gym.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = mailto;
    }, 150);
  }

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    gym.mapsQuery
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="visit" className="relative border-b border-steel bg-coal py-24 sm:py-32">
      <div className="red-glow absolute -right-40 top-10 h-[28rem] w-[28rem] opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="kicker mb-5 flex items-center gap-3 text-red">
            <span className="inline-block h-px w-8 bg-red" />
            Come in
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-bone">
            Book your <span className="text-hollow-red">free</span> session
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-smoke">
            Drop your details below and we&apos;ll get you booked into a class that suits your week.
            Prefer to talk? WhatsApp is the fastest way to reach us.
          </p>
        </div>

        <div className="grid gap-px border border-steel bg-steel lg:grid-cols-2">
          {/* Left — details + map */}
          <div className="flex flex-col bg-ink">
            <div className="space-y-px bg-steel">
              <a
                href={`https://wa.me/${gym.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-coal p-6 transition-colors hover:bg-char"
              >
                <span>
                  <span className="mono block text-[0.65rem] uppercase tracking-[0.18em] text-ash">
                    WhatsApp / Call
                  </span>
                  <span className="font-display text-2xl text-bone group-hover:text-red">
                    {gym.phoneDisplay}
                  </span>
                </span>
                <span className="text-red">→</span>
              </a>
              <a
                href={`mailto:${gym.email}`}
                className="group flex items-center justify-between bg-coal p-6 transition-colors hover:bg-char"
              >
                <span>
                  <span className="mono block text-[0.65rem] uppercase tracking-[0.18em] text-ash">
                    Email
                  </span>
                  <span className="text-lg text-bone group-hover:text-red">{gym.email}</span>
                </span>
                <span className="text-red">→</span>
              </a>
              <div className="bg-coal p-6">
                <span className="mono block text-[0.65rem] uppercase tracking-[0.18em] text-ash">
                  Find the box
                </span>
                <p className="mt-1 text-lg leading-snug text-bone">
                  {gym.address.line1},<br />
                  {gym.address.line2}, {gym.address.postcode}
                </p>
              </div>
              <div className="bg-coal p-6">
                <span className="mono mb-3 block text-[0.65rem] uppercase tracking-[0.18em] text-ash">
                  Opening hours
                </span>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-smoke">{h.day}</span>
                      <span className="mono text-bone">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full grayscale-[40%]">
              <iframe
                title="CrossFit Wirral location map"
                src={mapSrc}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-char p-7 sm:p-10">
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <div className="font-display text-6xl text-red">✓</div>
                <h3 className="font-display mt-4 text-3xl text-bone">Almost there</h3>
                <p className="mt-3 max-w-sm text-smoke">
                  Your email app should have opened with your details ready to send. Hit send and
                  we&apos;ll be in touch. Prefer instant? Message us on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${gym.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8"
                >
                  Open WhatsApp instead
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                      Name
                    </label>
                    <input name="name" required placeholder="First name" className={field} />
                  </div>
                  <div>
                    <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                      Phone
                    </label>
                    <input name="phone" required placeholder="Mobile number" className={field} />
                  </div>
                </div>
                <div>
                  <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                    Email
                  </label>
                  <input name="email" type="email" placeholder="you@email.com" className={field} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                      Best time to train
                    </label>
                    <select name="time" className={field} defaultValue="">
                      <option value="" disabled>
                        Choose…
                      </option>
                      {bookingTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                      Experience
                    </label>
                    <select name="experience" className={field} defaultValue="">
                      <option value="" disabled>
                        Choose…
                      </option>
                      {experienceLevels.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mono mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                    Anything else? (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Goals, injuries, questions…"
                    className={`${field} resize-none`}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-2">
                  Book my free session
                </button>
                <p className="mono text-center text-[0.6rem] uppercase tracking-[0.12em] text-ash">
                  Free · No commitment · We&apos;ll reply within a day
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
