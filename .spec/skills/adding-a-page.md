# Skill: Adding a page

## Steps

1. Create `app/<route>/page.tsx` as a Server Component.
2. Export `metadata` with a title and a description. The layout template appends the
   restaurant name, so the title is just the page name.
3. Wrap content in `<section>` blocks; use the `.shell` class for the width container
   rather than adding a new max-width.
4. Use only tokens from `tailwind.config.ts`. If a colour is missing, add it to the
   config, not to the page.
5. Add the route to `site.nav` in `lib/site.ts` if it belongs in the header.
6. Add the route to `app/sitemap.ts`.
7. Check the page at 375px before checking it wide.

## Do not

- Add `"use client"` unless the page needs state or an event handler.
- Introduce a new font, a new radius, or a new shadow.
- Duplicate content that already lives in `lib/menu.ts`.
