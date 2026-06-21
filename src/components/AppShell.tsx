"use client";

import { useStore } from "@/lib/store";
import { TopBar } from "./TopBar";
import { TabBar } from "./TabBar";
import { Welcome } from "./Welcome";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { hydrated, signedIn } = useStore();

  if (!hydrated) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-bg">
        <span className="block h-7 w-2 animate-pulse bg-red" />
      </div>
    );
  }

  if (!signedIn) return <Welcome />;

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar />
      <main className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
      <TabBar />
    </div>
  );
}
