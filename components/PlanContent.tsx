"use client";

import Link from "next/link";
import { Check, Clock3, Flame, LoaderCircle, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Toast } from "@/components/Toast";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

type SortKey = "duration" | "calories" | "rating";

function PlanCard({ workout, savedTab, onToast }: { workout: Workout; savedTab: boolean; onToast: (message: string) => void }) {
  const { removeFromPlan, removeSaved, markDone, completed } = usePlan();
  const done = completed.includes(workout.id);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center">
      <img src={workout.image} alt={workout.name} className="h-28 w-full rounded-xl object-cover sm:w-36" />

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-3xl font-black uppercase leading-none">{workout.name}</h3>
        <p className="mt-2 text-sm text-white/50">{workout.equipment}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1"><Clock3 size={14} className="text-lime" /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame size={14} className="text-lime" /> {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><Star size={14} className="fill-lime text-lime" /> {workout.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link href={`/workouts/${workout.id}`} className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white hover:border-lime hover:text-lime">
          View Details
        </Link>

        {!savedTab && (
          <button
            onClick={() => {
              markDone(workout.id);
              onToast("Workout marked as done");
            }}
            className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${
              done ? "bg-lime text-ink" : "border border-lime text-lime"
            }`}
          >
            <Check size={13} className="mr-1 inline" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={() => {
            if (savedTab) {
              removeSaved(workout.id);
              onToast("Removed from saved");
            } else {
              removeFromPlan(workout.id);
              onToast("Removed from today’s plan");
            }
          }}
          aria-label={`Remove ${workout.name}`}
          className="rounded-full border border-white/20 p-2 text-white/60 hover:border-red-300 hover:text-red-300"
        >
          <X size={16} />
        </button>
      </div>
    </article>
  );
}

export function PlanContent() {
  const { plan, saved } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sort, setSort] = useState<SortKey>("duration");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, []);

  const items = useMemo(() => {
    const source = tab === "plan" ? plan : saved;
    return [...source].sort((a, b) => {
      if (sort === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sort === "rating") return b.rating - a.rating;
      return b.duration - a.duration;
    });
  }, [plan, saved, sort, tab]);

  const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const calories = plan.reduce((sum, item) => sum + item.caloriesBurned, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
      <p className="mb-4 text-xs font-bold tracking-[0.25em] text-lime">YOUR WORKOUTS</p>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl font-black uppercase leading-none sm:text-7xl">My plan</h1>
          <p className="mt-4 text-sm text-white/50">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="flex rounded-full border border-white/10 bg-white/[0.02] p-1">
          <button onClick={() => setTab("plan")} className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${tab === "plan" ? "bg-lime text-ink" : "text-white/50"}`}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setTab("saved")} className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${tab === "saved" ? "bg-lime text-ink" : "text-white/50"}`}>
            Saved
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Exercises</p>
          <p className="mt-2 font-display text-4xl font-black">{plan.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Minutes</p>
          <p className="mt-2 font-display text-4xl font-black">{minutes}</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Calories</p>
          <p className="mt-2 font-display text-4xl font-black">{calories}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
          Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="rounded-full border border-white/20 bg-[#121212] px-3 py-2 text-white">
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center gap-3 text-sm text-white/60">
            <LoaderCircle className="animate-spin text-lime" size={18} />
            Loading workouts…
          </div>
        ) : items.length ? (
          items.map((workout) => (
            <PlanCard key={workout.id} workout={workout} savedTab={tab === "saved"} onToast={setToast} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 px-6 py-16 text-center">
            <h2 className="font-display text-4xl font-black uppercase">Nothing here yet</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="mt-6 inline-block rounded-full bg-lime px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink">
              Go to workouts
            </Link>
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}
