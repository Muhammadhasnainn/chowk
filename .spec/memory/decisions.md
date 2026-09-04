# Decision log

## Twelve dishes, not a full menu
A restaurant page with sixty items becomes a scroll. Twelve fits the constitution's rule
that everything must be makeable on a busy Saturday, and it keeps the vector store small
enough that retrieval stays accurate on the free Qdrant tier.

## Serif body, grotesque display
The obvious pairing for a restaurant is a display serif over a sans body. Inverting it —
Bricolage Grotesque for headings, Newsreader for reading text — gave the site a voice
that does not look like every other restaurant template, and Newsreader is easier to read
at 17px on a phone than a geometric sans.

## No photography
The client had no shoot budget at build time. Rather than fill the site with stock food
photos that belong to no one, each dish gets a plate motif built from CSS gradients in a
colour drawn from the dish itself. Photos can be dropped into `public/images` later and
swapped into `Plate` without touching layout.

## Chat calls a Next.js route, not FastAPI directly
Routing through `app/api/chat/route.ts` keeps `CHAT_API_URL` server-side, avoids CORS
problems in the browser, and lets the frontend deploy to Vercel while the backend lives
elsewhere.

## History sent from the client, stored on the server
The widget sends the last six turns so the model has context without a database read on
every request. Neon still records every turn for later review, so the transcript endpoint
stays useful without slowing down answers.

## Rejected: streaming responses
Server-sent events would have made answers feel faster, but the widget already returns in
two to three seconds and streaming would have added a second failure mode to debug before
the deadline. Left out deliberately.
