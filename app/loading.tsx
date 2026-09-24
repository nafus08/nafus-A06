import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center gap-3 text-sm text-white/60">
      <LoaderCircle className="animate-spin text-lime" size={20} />
      Loading FitLog…
    </div>
  );
}
