"use client";

import { useParams } from "next/navigation";
import { WorkoutDetail } from "@/components/WorkoutDetail";

export default function WorkoutPage() {
  const params = useParams<{ id: string }>();
  return <WorkoutDetail id={params.id} />;
}
