# FitLog

FitLog is a dark, focused workout library for choosing a lift, adding it to today’s plan, and tracking progress without clutter.

## Technologies used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React icons
- FitLog API

## Features

1. Responsive navbar with active route styling and live counters
2. Hero banner and anchor-based browse CTA
3. Dynamic workout library loaded from the FitLog API
4. Detailed workout pages with specs, instructions, and action buttons
5. My Plan page with Today’s Plan and Saved tabs, sorting, metrics, and empty state
6. LocalStorage persistence for plan and saved workouts
7. Custom loading and 404 states

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Production build

```bash
npm run build
npm run start
```

## API endpoints used

- https://api.abcz.workers.dev/api/fitlog
- https://api.abcz.workers.dev/api/fitlog/:id
