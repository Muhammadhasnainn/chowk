import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Chowk started in a garage in Phase VI with six tables, one cook and a tandoor that still gets lit at four.",
};

const timeline = [
  {
    year: "2019",
    text: "Six tables in a converted garage on Khayaban-e-Bukhari. One cook, one tandoor, four dishes.",
  },
  {
    year: "2021",
    text: "The wall came down and the counter went in, so the kata kat could be cooked in front of the room instead of behind it.",
  },
  {
    year: "2023",
    text: "Sikandari raan added after eleven months of testing. It is the only dish on the menu that needs two days of notice from the kitchen.",
  },
  {
    year: "2026",
    text: "Forty seats, four cooks, twelve dishes. Still closed on Mondays because that is when the tandoor gets rebuilt.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink/15">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow text-ink/50">About</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.87] tracking-tightest">
            We only know how to cook one way.
          </h1>
        </div>
      </section>

      <section className="shell grid gap-14 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          <p className="text-2xl leading-snug text-ink">
            Chowk was started by two cousins who grew up eating on Burns Road and could
            not find the same food anywhere near where they ended up living.
          </p>
          <p>
            The first year was mostly failure. The tandoor cracked twice. The bihari boti
            came out grey until we worked out that the roasted gram flour has to be
            fresh, not the packet that has been open since March. We threw away more
            meat in 2019 than we served.
          </p>
          <p>
            What stayed constant is the rule we opened with: nothing goes on the menu
            unless the kitchen can make it properly at nine on a Saturday night with
            every table full. That rule is why there are twelve dishes and not forty.
          </p>
          <p>
            Meat comes from two suppliers we have used since the first week, both in
            Tando Allahyar. Masala is ground every morning at four, before service, in
            quantities that get used the same day. The tea leaf comes from a blender in
            Lyari that has supplied one family for three generations.
          </p>
          <p>
            We do not deliver. Charcoal food does not survive a motorcycle and we would
            rather you eat it hot in the room it was cooked in.
          </p>
        </div>

        <aside>
          <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">How it went</h2>
          <ol className="mt-6 space-y-8">
            {timeline.map((entry) => (
              <li key={entry.year} className="grid grid-cols-[3.5rem_1fr] gap-4">
                <span className="font-mono text-sm text-marigold">{entry.year}</span>
                <p className="text-ink/75">{entry.text}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="border-t border-ink/15 bg-haze/40">
        <div className="shell grid gap-8 py-16 sm:grid-cols-3 md:py-20">
          {[
            {
              h: "The tandoor",
              p: "Lit at four every afternoon with hardwood, not gas. It takes ninety minutes to reach a temperature the naan will accept.",
            },
            {
              h: "The counter",
              p: "Everything on the tawa is cooked in the open. If you want to watch the kata kat being made, ask for a counter seat when you call.",
            },
            {
              h: "The room",
              p: "Forty seats, hard surfaces, and it gets loud after nine. Come earlier if you need to hear each other.",
            },
          ].map((block) => (
            <div key={block.h}>
              <h3 className="font-display text-2xl tracking-tight">{block.h}</h3>
              <p className="mt-3 text-ink/70">{block.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16 text-center md:py-24">
        <Link
          href="/menu"
          className="eyebrow inline-block bg-ink px-7 py-4 text-bg transition-colors hover:bg-bottle"
        >
          Read the menu
        </Link>
      </section>
    </>
  );
}
