# CrossFit Wirral — Member App (concept redesign)

A ground-up redesign of the member-facing gym app (a reimagining of the
"Wodboard" experience) for **CrossFit Wirral**, Birkenhead. Dark-mode-first,
mobile-first, and built around the workflow members actually use day to day.

> This is a clickable **prototype**. There's no real backend — everything runs
> on realistic demo data saved in your browser (`localStorage`). Reset it any
> time from **Profile → Reset demo data**.

## What changed vs. the old app

The old layout scattered things across six tabs (including a nutrition tab
nobody used). This collapses to **five purposeful tabs** built around the real
workflow:

| Tab | What it does |
| --- | --- |
| **Home** | Today at a glance — are you booked, what's the WOD, your consistency streak, upcoming bookings, community feed |
| **Book** | The most-used feature, front and centre: week strip, live spots-left (max 20), book/cancel, real opening hours |
| **Workout** | The day's programming as clean cards (Warm-up · Strength/Skill · WOD) with an Rx/Scaled toggle — **plus the whiteboard and score logging on the same screen** |
| **Progress** | Training log, PRs (lifts, benchmarks, gymnastics) with sparklines, and a bodyweight chart |
| **Profile** | Membership, booking history, theme (System / Light / Dark), gym info, sign out |

Other highlights:

- **Light + dark mode** with an instant top-bar toggle (dark by default).
- **Real opening hours baked in:** Mon–Fri 06:00–20:00 (with a midday gap, no
  early-afternoon classes), Sat 07:00–11:45, **closed Sundays** (rest-day state).
- **Whiteboard merged with the workout** — log your score and see the leaderboard
  in one place, Rx ranked above Scaled.

## Brand

Industrial / forged aesthetic from the CFW identity — near-black surfaces, one
disciplined brand red, `Anton` display type, `Space Mono` for numbers/timers,
`Archivo` for body. The wordmark and gym photography are the gym's own.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4,
`lucide-react`, and `motion`.
