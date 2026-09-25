# FitLog

> **Train with intent. Log every set.**
>
> FitLog is a dark, focused workout companion: browse lifts, build today’s plan, save workouts for later, and track completed sessions.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## Built with

| Technology | Role |
| --- | --- |
| Next.js App Router | Application pages and navigation |
| React + TypeScript | Typed, interactive user interface |
| Tailwind CSS | Responsive styling |
| Lucide React | Interface icons |
| FitLog API | Workout library and detail data |

## Features

1. Responsive navigation with active-page styling and live Plan/Saved counters.
2. Hero banner linking directly to an API-powered workout library.
3. Search workouts by name or muscle group, with responsive workout cards and stats.
4. Dedicated workout detail pages with specs, instructions, and add/save actions.
5. My Plan and Saved tabs with exercise, time, and calorie metrics.
6. Sort the current list by duration, calories, or rating; mark workouts done or remove them with toast feedback.
7. Persist plan, saved workouts, and completion state in `localStorage`, with a five-workout daily cap.
8. Loading states, responsive empty states, and a custom 404 page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run start
```

## Workout API

- Library: `https://api.abcz.workers.dev/api/fitlog`
- Workout detail: `https://api.abcz.workers.dev/api/fitlog/:id`
