import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workouts/${workout.id}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-200 hover:-translate-y-1 hover:border-lime/70">
      <div className="relative h-60 overflow-hidden bg-[#1f1f1f]">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
              {group}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-black uppercase leading-none text-white">{workout.name}</h3>
        <p className="mt-3 text-sm text-white/50">{workout.equipment}</p>

        <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/60">
          <span className="flex items-center gap-1"><Clock3 size={14} className="text-lime" /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame size={14} className="text-lime" /> {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><Star size={14} className="fill-lime text-lime" /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
