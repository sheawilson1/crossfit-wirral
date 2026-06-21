"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, Home, LineChart, User } from "lucide-react";
import { cx } from "./ui";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/book", label: "Book", icon: CalendarDays },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/profile", label: "Profile", icon: User },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="safe-b z-40 grid grid-cols-5 border-t border-line bg-bg">
      {TABS.map((t) => {
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cx(
              "relative flex flex-col items-center gap-1 py-2.5 transition-colors",
              active ? "text-red" : "text-faint hover:text-muted",
            )}
          >
            {active && (
              <span className="absolute inset-x-5 top-0 h-0.5 bg-red" />
            )}
            <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />
            <span className="mono text-[0.58rem] font-bold uppercase tracking-wider">
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
