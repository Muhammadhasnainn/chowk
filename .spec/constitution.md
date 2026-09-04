# Chowk — Constitution

## Mission

Give a forty-seat Karachi restaurant a website that reads its menu clearly on a phone
and answers the questions the phone line gets asked all evening.

## Core Principles

1. **The menu is the product.** Every page leads back to a dish. Nothing decorative gets
   in front of a price, a portion size, or a heat level.
2. **Real text only.** No lorem ipsum, no placeholder names, no invented awards. If a
   fact is not decided, it does not ship.
3. **Static where possible.** Menu content lives in typed source, renders at build time,
   and needs no database to be read. Only the chatbot talks to a server.
4. **Answer, do not sell.** Copy states what a dish is and how it is cooked. The chatbot
   says "I don't know, call us" rather than guessing.
5. **Works on a bad connection.** Karachi mobile data is the baseline, not a broadband
   desktop.

## Technical Standards

- Next.js 14 App Router, TypeScript in strict mode, no `any` in application code
- Tailwind CSS with a fixed token set in `tailwind.config.ts`; ad-hoc hex values are a
  review failure
- Server Components by default; `"use client"` only for the nav toggle, menu filter,
  reservation form and chat widget
- Content typed in `lib/menu.ts` and imported, never fetched at runtime
- Backend is FastAPI with typed Pydantic request and response models
- Secrets only in environment variables; the browser never sees an API key

## Design Guidelines

- Palette: `#EFF1E6` pistachio ground, `#16281E` ink, `#1F4535` bottle green,
  `#E8A317` marigold, `#C2506A` rose
- Type: Bricolage Grotesque for display, Newsreader for body, DM Mono for prices and
  labels. Prices are always tabular mono so columns line up
- Signature device: the price rail — dish name, dotted leader, price — repeated on every
  surface that lists food
- Mobile first; every layout is designed at 375px before it is designed wide
- Motion is limited to one staggered hero entrance and hover states, and is disabled
  under `prefers-reduced-motion`
- Focus outlines stay visible; contrast stays above 4.5:1 for body text

## Development Rules

- One task file per unit of work, committed with the task number in the message
- A task is Completed only when its acceptance criteria all pass in the browser
- No console errors or warnings on any route before a task closes
- `npm run build` must pass before pushing
- Both team members review each other's pull requests before merge
