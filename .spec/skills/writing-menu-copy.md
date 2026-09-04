# Skill: Writing menu copy

Applies whenever a dish is added or edited in `lib/menu.ts` or `backend/data/knowledge.json`.

## Rules

- Lead with what the thing is, not how good it is. "Chicken thigh in cream and green
  chilli" beats "our signature creamy delight".
- One concrete detail per dish that a customer could not guess: a cooking time, a source,
  a temperature, a season.
- Never claim an award, a ranking, or a chef's history that has not been agreed with the
  owner.
- Blurbs stay under fifteen words because they sit on a single rail line at 375px.
- The `story` array is two or three short paragraphs. First paragraph carries the fact
  that makes the dish different.
- Heat levels are None, Mild, Medium or Hot and must match the kitchen's own answer.
- Prices are integers in rupees, no decimals, formatted through `rupees()`.

## Checklist before commit

- [ ] Blurb under fifteen words
- [ ] Slug is lowercase and hyphenated and matches the knowledge base entry
- [ ] `pairs` references three or fewer existing slugs
- [ ] A matching document exists in `backend/data/knowledge.json`
- [ ] `ingest.py` re-run so the chatbot knows about the change
