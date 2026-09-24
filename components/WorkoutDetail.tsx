"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Clock3, Flame, ListPlus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Toast } from "@/components/Toast";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

export function WorkoutDetail({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const { addToPlan, saveWorkout, plan, saved } = usePlan();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Workout not found");
        return response.json() as Promise<Workout>;
      })
      .then((data) => setWorkout(data))
      .catch(() => setWorkout(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center text-sm text-white/60">Loading workout…</main>;
  }

  if (!workout) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="font-display text-5xl font-black uppercase">Workout not found</h1>
        <Link href="/" className="mt-6 inline-block text-lime">Back to library</Link>
      </main>
    );
  }

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    if (plan.length >= 5) {
      setToast("Today’s plan is full");
      return;
    }
    if (inPlan) {
      setToast("Already in today’s plan");
      return;
    }
    addToPlan(workout);
    setToast("Added to today’s plan");
  };

  const handleSave = () => {
    if (isSaved) {
      setToast("Already saved");
      return;
    }
    saveWorkout(workout);
    setToast("Saved for later");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-lime">
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1f1f1f]">
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                {group}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-5xl font-black uppercase leading-[0.9] sm:text-7xl">{workout.name}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/60">{workout.description}</p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", String(workout.sets)],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", String(workout.rating)]
            ].map(([label, value]) => (
              <div key={label} className="bg-ink p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{label}</p>
                <p className="mt-2 text-sm font-bold text-white">{String(value)}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xs font-black uppercase tracking-[0.25em] text-lime">Instructions</h2>
          <ol className="mt-5 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <li key={instruction} className="flex gap-4 text-sm leading-6 text-white/70">
                <span className="font-display text-2xl font-black text-lime">{String(index + 1).padStart(2, "0")}</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink disabled:cursor-not-allowed disabled:opacity-60"
              disabled={inPlan || plan.length >= 5}
            >
              <ListPlus size={17} />
              {inPlan ? "In today’s plan" : "Add to today’s plan"}
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaved}
            >
              <Bookmark size={17} />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}
