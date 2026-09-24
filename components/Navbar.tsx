"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isHome = pathname === "/";
  const isPlan = pathname.startsWith("/my-plan");

  return (
    <header className="border-b border-white/10 bg-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="FitLog home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-ink">
            <Dumbbell size={20} />
          </span>
          <span className="font-display text-2xl font-black uppercase tracking-tight">FITLOG</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition ${
              isHome ? "bg-lime text-ink" : "text-white/70 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition ${
              isPlan ? "bg-lime text-ink" : "text-white/70 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="flex items-center gap-2 rounded-full bg-lime px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-ink">
            <span>Plan</span>
            <span className="rounded-full bg-ink/10 px-1.5 py-0.5 text-[10px]">{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
            <span>Saved</span>
            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px]">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
