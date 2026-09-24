"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink shadow-2xl">
      <Check size={16} strokeWidth={3} />
      {message}
    </div>
  );
}
