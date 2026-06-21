"use client";

import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { GYM } from "@/lib/seed";
import { asset } from "@/lib/asset";

export function Welcome() {
  const { signIn } = useStore();

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#08090a] text-[#f1eee7]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset("/gym/p03.jpg")})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,10,0.55) 0%, rgba(8,9,10,0.72) 45%, rgba(8,9,10,0.96) 100%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-end px-6 pb-10 pt-16">
        <p className="kicker mb-4 text-red">
          {GYM.town} · Est. {GYM.est}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/brand/logo-wordmark.png")}
          alt="CrossFit Wirral"
          className="mb-5 w-[78%] max-w-[300px]"
        />

        <h1 className="font-display mb-3 text-5xl leading-[0.9]">
          The best hour
          <br />
          of your <span className="text-red">day</span>.
        </h1>
        <p className="mb-8 max-w-sm text-[#c9c6bf]">
          Book your class, hit the workout, log the score. Your whole training
          life in one place — finally with a dark mode.
        </p>

        <button onClick={signIn} className="btn btn-primary btn-block">
          Enter the box <ArrowRight size={18} />
        </button>
        <p className="mono mt-4 text-center text-[0.62rem] uppercase tracking-wider text-[#6b7078]">
          Demo · everything saves on this device
        </p>
      </div>
    </div>
  );
}
