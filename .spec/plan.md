# Development Plan

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge, class-variance-authority |
| Chat backend | FastAPI + Uvicorn |
| LLM | OpenAI (gpt-4o-mini, text-embedding-3-small) |
| Vector store | Qdrant Cloud, free tier |
| Chat history | Neon Serverless Postgres |
| Hosting | Vercel (frontend), Render or Railway (backend) |

## Phase 1 — Setup (Day 1)

- Initialise Next.js with TypeScript, Tailwind and App Router
- Add design tokens to `tailwind.config.ts` and `app/globals.css`
- Wire the three Google fonts through `next/font`
- Create the folder structure and commit the `.spec/` directory

## Phase 2 — Content and core pages (Day 2–3)

- Write `lib/menu.ts` with twelve typed dishes and `lib/site.ts` with contact details
- Build Navbar, Footer, Plate and DishRow
- Homepage: board hero, tonight list, six featured dishes, about block, closing call
- Menu listing with category filter, dish detail route with `generateStaticParams`

## Phase 3 — Remaining pages and forms (Day 4)

- About page with the timeline
- Visit page with hours, access notes and the reservation form
- 404 page and sitemap
- Responsive pass at 375px, 768px and 1440px

## Phase 4 — RAG chatbot (Day 5)

- FastAPI app with `/chat`, `/chat/{session_id}` and `/health`
- Knowledge base JSON, embed and load into Qdrant via `ingest.py`
- Neon Postgres schema and message persistence
- Chat widget with typing indicator, quick questions, reset and error states
- Next.js route handler proxying to FastAPI so the backend URL stays server-side

## Phase 5 — Testing and deployment (Day 6)

- Manual pass on every route: no console errors, keyboard navigation, reduced motion
- Lighthouse check on the homepage and a dish page
- Deploy the frontend to Vercel, the backend to Render, set environment variables
- Record the demo video and finish the README

## Feature Checklist

- [x] Five or more pages
- [x] Responsive on mobile and desktop
- [x] Twelve dishes with individual pages
- [x] Category filter on the menu
- [x] Reservation form with validation
- [x] RAG chatbot with retrieval, generation and stored history
- [x] Loading and error states in the chat widget
- [x] Sitemap and per-page metadata
- [x] `.spec/` documentation complete

## Timeline

| Phase | Estimate |
| --- | --- |
| 1 | 3 hours |
| 2 | 10 hours |
| 3 | 6 hours |
| 4 | 8 hours |
| 5 | 5 hours |

## File Structure

```
chowk/
├── .spec/
│   ├── constitution.md
│   ├── plan.md
│   ├── tasks/
│   ├── skills/
│   └── memory/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── visit/page.tsx
│   ├── menu/page.tsx
│   ├── menu/[slug]/page.tsx
│   ├── api/chat/route.ts
│   ├── sitemap.ts
│   └── not-found.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MenuBrowser.tsx
│   ├── DishRow.tsx
│   ├── Plate.tsx
│   ├── ReservationForm.tsx
│   └── ChatWidget.tsx
├── lib/
│   ├── menu.ts
│   ├── site.ts
│   └── utils.ts
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── models.py
│   ├── ingest.py
│   ├── routers/chat.py
│   ├── services/{llm,vectorstore,db}.py
│   └── data/knowledge.json
└── README.md
```
