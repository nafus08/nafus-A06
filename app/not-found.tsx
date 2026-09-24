import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
      <p className="text-xs font-bold tracking-[0.25em] text-lime">404 / OFF THE MAP</p>
      <h1 className="mt-5 font-display text-5xl font-black uppercase leading-none sm:text-7xl">No reps here.</h1>
      <p className="mt-5 max-w-md text-sm text-white/60">That page does not exist. Head back to the library and pick your next lift.</p>
      <Link href="/" className="mt-8 inline-flex w-fit rounded-full bg-lime px-5 py-3 text-xs font-black uppercase tracking-wider text-ink">
        Back to workouts
      </Link>
    </main>
  );
}
