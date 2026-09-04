# Chowk — a Karachi kitchen

A restaurant website for a forty-seat charcoal grill in Phase VI, DHA Karachi, with a
retrieval-augmented chatbot that answers questions about the menu, hours and how dishes
are cooked.

Built with Next.js 14, TypeScript and Tailwind CSS on the front, FastAPI with OpenAI,
Qdrant and Neon Postgres on the back. Planned and documented with Spec-Kit Plus.

**Live site:** _add your Vercel URL here_
**Demo video:** _add your YouTube or Drive link here_

---

## Features

- Twelve dishes, each with its own statically generated page, ingredients and pairings
- Menu listing with a sticky category filter across six sections
- Table booking form with client-side validation and a confirmation state
- RAG chatbot: Qdrant retrieval, OpenAI generation, chat history stored in Neon Postgres
- Chat widget with typing indicator, quick questions, session reset and error handling
- Responsive from 375px, keyboard navigable, honours `prefers-reduced-motion`
- Per-page metadata, sitemap and a custom 404

## Technology stack

**Frontend**

- Next.js 14.2 (App Router)
- React 18
- TypeScript 5.6 (strict)
- Tailwind CSS 3.4
- lucide-react, clsx, tailwind-merge, class-variance-authority

**Backend**

- FastAPI + Uvicorn
- OpenAI (`gpt-4o-mini` for answers, `text-embedding-3-small` for embeddings)
- Qdrant Cloud, free tier, for vector storage
- Neon Serverless Postgres for chat history

**Deployment**

- Vercel for the frontend
- Render or Railway for the FastAPI service

---

## Running locally

### 1. Frontend

```bash
git clone <your-repo-url>
cd chowk
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000. Every page except the chatbot works without any
API keys.

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # fill in your keys
python ingest.py                   # embeds the knowledge base into Qdrant
uvicorn main:app --reload --port 8000
```

`ingest.py` only needs re-running when `backend/data/knowledge.json` changes.

Check it is up:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"query":"What is in the white karahi?","session_id":"test"}'
```

---

## API setup

**OpenAI** — create a key at https://platform.openai.com. Both the chat model and the
embedding model use the same key.

**Qdrant Cloud** — create a free cluster at https://cloud.qdrant.io, then copy the
cluster URL and an API key. `ingest.py` creates the collection itself with 1536
dimensions and cosine distance, matching `text-embedding-3-small`.

**Neon** — create a project at https://neon.tech and copy the pooled connection string.
The `chat_messages` table is created automatically when the FastAPI app starts.

## Environment variables

**Frontend — `.env.local`**

| Variable | Purpose |
| --- | --- |
| `CHAT_API_URL` | Base URL of the FastAPI service. Defaults to `http://127.0.0.1:8000` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by the sitemap |

**Backend — `backend/.env`**

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI key |
| `OPENAI_CHAT_MODEL` | Defaults to `gpt-4o-mini` |
| `OPENAI_EMBED_MODEL` | Defaults to `text-embedding-3-small` |
| `QDRANT_URL` | Qdrant Cloud cluster URL |
| `QDRANT_API_KEY` | Qdrant API key |
| `QDRANT_COLLECTION` | Defaults to `chowk_knowledge` |
| `DATABASE_URL` | Neon Postgres connection string |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed by CORS |

No key is ever sent to the browser. The widget calls `/api/chat`, a Next.js route
handler that forwards the request to FastAPI server-side.

---

## API reference

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/chat` | Takes `query`, `session_id` and optional `history`; returns `answer` and `sources` |
| `GET` | `/chat/{session_id}` | Returns the stored transcript for a session |
| `GET` | `/health` | Liveness check |

How a question is answered:

1. The query is embedded with `text-embedding-3-small`.
2. Qdrant returns the four closest knowledge passages.
3. Those passages plus the last six turns go to `gpt-4o-mini` with a system prompt that
   forbids inventing prices, dishes or hours.
4. Both turns are written to `chat_messages` in Neon.
5. If nothing relevant is retrieved, the assistant returns the restaurant's phone number
   instead of guessing.

---

## Deployment

### Frontend on Vercel

1. Push the repository to GitHub.
2. Import it at https://vercel.com/new. Vercel detects Next.js on its own.
3. Add `CHAT_API_URL` (your deployed backend URL) and `NEXT_PUBLIC_SITE_URL` under
   Settings → Environment Variables.
4. Deploy.

### Backend on Render

1. New → Web Service, pointed at the same repository.
2. Root directory `backend`.
3. Build command `pip install -r requirements.txt`.
4. Start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Add every variable from `backend/.env`, and set `ALLOWED_ORIGINS` to your Vercel
   domain.
6. Run `python ingest.py` once from the Render shell to load Qdrant.

---

## Project structure

```
chowk/
├── .spec/                    Spec-Kit Plus documentation
│   ├── constitution.md       Mission, principles, technical and design standards
│   ├── plan.md               Five phases, stack, checklist, timeline
│   ├── tasks/                Nine task files with acceptance criteria
│   ├── skills/               Working rules for menu copy and adding pages
│   └── memory/               Decision log, including what was deliberately left out
├── app/
│   ├── layout.tsx            Fonts, metadata, shared shell
│   ├── page.tsx              Homepage
│   ├── menu/page.tsx         Menu listing
│   ├── menu/[slug]/page.tsx  Dish detail, statically generated
│   ├── about/page.tsx
│   ├── visit/page.tsx        Hours, access, booking form
│   ├── api/chat/route.ts     Proxy to FastAPI
│   ├── sitemap.ts
│   └── not-found.tsx
├── components/               Navbar, Footer, MenuBrowser, DishRow, Plate,
│                             ReservationForm, ChatWidget
├── lib/                      menu.ts, site.ts, utils.ts
├── backend/
│   ├── main.py               FastAPI app and CORS
│   ├── config.py             Settings from environment
│   ├── models.py             Request and response models
│   ├── ingest.py             Embeds and loads the knowledge base
│   ├── routers/chat.py
│   ├── services/             llm.py, vectorstore.py, db.py
│   └── data/knowledge.json   Eighteen source documents
└── public/images/            Drop dish photography here
```

## Adding photography

Every dish currently renders a plate motif generated from its own colour. To use real
photos, add files to `public/images`, add an `image` field to the `Dish` type in
`lib/menu.ts`, and render `next/image` inside `components/Plate.tsx`. No layout changes
are needed.

## Editing the menu

Menu content lives in one place: `lib/menu.ts`. Add or change a dish there, mirror the
change in `backend/data/knowledge.json`, and re-run `python ingest.py` so the chatbot
stays accurate. The rules for writing entries are in `.spec/skills/writing-menu-copy.md`.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `python backend/ingest.py` | Rebuild the vector store |

## Screenshots

_Add screenshots of the homepage, menu, a dish page and the chatbot here before
submitting._

## Team

| Name | Contribution |
| --- | --- |
| _Member 1_ | _e.g. frontend pages, design system, deployment_ |
| _Member 2_ | _e.g. RAG backend, knowledge base, chat widget_ |
