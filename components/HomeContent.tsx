"use client";

import { ArrowDownRight, LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

type SortOption = "default" | "name" | "rating" | "duration" | "calories";

export function HomeContent() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const filteredWorkouts = workouts
    .filter((workout) =>
      `${workout.name} ${workout.muscleGroups.join(" ")}`.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((first, second) => {
      switch (sort) {
        case "name":
          return first.name.localeCompare(second.name);
        case "rating":
          return second.rating - first.rating;
        case "duration":
          return first.duration - second.duration;
        case "calories":
          return second.caloriesBurned - first.caloriesBurned;
        default:
          return 0;
      }
    });

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json() as Promise<Workout[]>;
      })
      .then((data) => setWorkouts(data))
      .catch(() => setError("We could not load the library. Please refresh and try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
        <div>
          <p className="mb-5 text-xs font-bold tracking-[0.28em] text-lime">WORKOUT LIBRARY</p>
          <h1 className="max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-[6.1rem]">
            Train with intent.<br />
            Log every set.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/60">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:bg-white">
            Browse workouts <ArrowDownRight size={18} />
          </a>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
            alt="Athlete training"
            className="relative w-full max-w-[520px] rounded-[2rem] border border-white/10 object-cover shadow-2xl"
          />
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-lime">12 MOVEMENTS</p>
            <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-6xl">The library</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/50">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <label className="flex max-w-md flex-1 items-center gap-3 rounded-full border border-white/15 px-4 py-3 text-white/50 focus-within:border-lime">
            <Search size={16} className="shrink-0 text-lime" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search workouts or muscle groups" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40" />
          </label>
          <label className="flex items-center gap-3 rounded-full border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/50 focus-within:border-lime">
            <span className="whitespace-nowrap">Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="w-full cursor-pointer bg-transparent text-xs font-bold uppercase tracking-[0.12em] text-white outline-none">
              <option value="default" className="bg-ink">Featured</option>
              <option value="name" className="bg-ink">Name</option>
              <option value="rating" className="bg-ink">Rating</option>
              <option value="duration" className="bg-ink">Shortest duration</option>
              <option value="calories" className="bg-ink">Most calories</option>
            </select>
          </label>
        </div>

        {loading && (
          <div className="flex min-h-[200px] items-center justify-center gap-3 text-sm text-white/60">
            <LoaderCircle className="animate-spin text-lime" size={18} />
            Loading workouts…
          </div>
        )}

        {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
            {!filteredWorkouts.length && <p className="col-span-full py-12 text-center text-sm text-white/50">No workouts match that search.</p>}
          </div>
        )}
      </section>
    </>
  );
}
