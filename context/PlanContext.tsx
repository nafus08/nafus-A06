"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Workout } from "@/types/workout";

type PlanContextValue = {
  plan: Workout[];
  saved: Workout[];
  completed: number[];
  addToPlan: (workout: Workout) => boolean;
  saveWorkout: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = (key: string) => {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    };
    setPlan(read("fitlog-plan"));
    setSaved(read("fitlog-saved"));
    setCompleted(read("fitlog-completed"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [hydrated, plan]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [hydrated, saved]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("fitlog-completed", JSON.stringify(completed));
  }, [completed, hydrated]);

  const value = useMemo<PlanContextValue>(() => ({
    plan,
    saved,
    completed,
    addToPlan: (workout) => {
      if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) return false;
      setPlan((current) => [...current, workout]);
      return true;
    },
    saveWorkout: (workout) => {
      if (saved.some((item) => item.id === workout.id)) return false;
      setSaved((current) => [...current, workout]);
      return true;
    },
    removeFromPlan: (id) => {
      setPlan((current) => current.filter((item) => item.id !== id));
    },
    removeSaved: (id) => {
      setSaved((current) => current.filter((item) => item.id !== id));
    },
    markDone: (id) => {
      setCompleted((current) => (current.includes(id) ? current : [...current, id]));
    }
  }), [plan, saved, completed]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
