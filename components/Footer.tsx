import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-9 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink">
            <Dumbbell size={18} />
          </span>
          <span className="font-display text-xl font-black uppercase tracking-wider">FITLOG</span>
        </div>

        <p className="text-xs text-white/40">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
