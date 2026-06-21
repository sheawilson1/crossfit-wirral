const WORDS = [
  "Squat",
  "Press",
  "Deadlift",
  "Pull-up",
  "Row",
  "Run",
  "Clean",
  "Snatch",
  "Box Jump",
  "Wall Ball",
  "Burpee",
  "Thrust",
];

export function Ticker() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee-group relative overflow-hidden border-y border-blood bg-red py-4 select-none">
      <div className="marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-6 text-3xl text-ink sm:text-4xl">{w}</span>
            <span className="text-ink/55">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
