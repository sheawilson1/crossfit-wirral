"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useStore } from "@/lib/store";

const TITLES: Record<string, string> = {
  "/book": "Book a class",
  "/workout": "Workout",
  "/progress": "Progress",
  "/profile": "Profile",
};

function ThemeToggle() {
  const { theme, setTheme } = useStore();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:text-fg"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const title = TITLES[pathname] ?? "";

  return (
    <header className="safe-t z-40 flex items-center justify-between border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
      {isHome ? (
        <div className="flex items-center gap-2">
          <span className="block h-5 w-1.5 bg-red" />
          <span className="font-display text-xl leading-none">
            CrossFit Wirral
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="block h-5 w-1.5 bg-red" />
          <h1 className="font-display text-xl leading-none">{title}</h1>
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
