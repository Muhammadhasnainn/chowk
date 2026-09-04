import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featured, dishes } from "@/lib/menu";
import { site } from "@/lib/site";
import { rupees } from "@/lib/utils";
import Plate from "@/components/Plate";

export default function HomePage() {
  const tonight = dishes.filter((d) =>
    ["sikandari-raan", "kata-kat", "white-karahi", "roghni-naan"].includes(d.slug)
  );

  return (
    <>
      <section className="board relative overflow-hidden text-bg">
        <div className="shell grid gap-14 py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-28">
          <div>
            <p className="eyebrow lift text-marigold" style={{ animationDelay: "0.05s" }}>
              Khayaban-e-Bukhari · since 2019
            </p>
            <h1
              className="lift mt-6 font-display text-[clamp(3.5rem,13vw,9rem)] leading-[0.82] tracking-tightest"
              style={{ animationDelay: "0.12s" }}
            >
              Everything
              <br />
              tastes of
              <br />
              <span className="text-marigold">smoke.</span>
            </h1>
            <p
              className="lift mt-8 max-w-md text-lg text-bg/70"
              style={{ animationDelay: "0.22s" }}
            >
              Charcoal, karahi, and eleven-minute chai. One room, forty seats, and a
              menu that has changed twice in seven years.
            </p>
            <div
              className="lift mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/menu"
                className="eyebrow inline-flex items-center gap-2 bg-marigold px-6 py-3.5 text-ink transition-transform hover:-translate-y-0.5"
              >
                See the menu <ArrowRight size={14} />
              </Link>
              <Link href="/visit" className="eyebrow border-b border-bg/40 pb-1 hover:border-marigold">
                Book a table
              </Link>
            </div>
          </div>

          <div className="lift self-end" style={{ animationDelay: "0.36s" }}>
            <p className="eyebrow border-b border-bg/20 pb-3 text-bg/50">On the fire tonight</p>
            <ul className="mt-1">
              {tonight.map((d) => (
                <li key={d.slug} className="border-b border-bg/10 py-3.5">
                  <Link href={`/menu/${d.slug}`} className="rail text-bg/90 hover:text-marigold">
                    <span className="text-lg">{d.name}</span>
                    <span className="rail__leader" />
                    <span className="rail__price">Rs {rupees(d.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-bg/45">
              Halwa returns in December when the red carrots come in.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-6">
          <h2 className="font-display text-4xl tracking-tightest md:text-5xl">
            Six things worth
            <br />
            crossing town for
          </h2>
          <Link href="/menu" className="eyebrow text-ink/60 hover:text-ink">
            All twelve dishes →
          </Link>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish) => (
            <Link key={dish.slug} href={`/menu/${dish.slug}`} className="group">
              <Plate
                hue={dish.hue}
                urdu={dish.urdu}
                className="w-28 transition-transform duration-300 group-hover:scale-105 md:w-32"
              />
              <div className="rail mt-6">
                <h3 className="font-display text-2xl tracking-tight">{dish.name}</h3>
                <span className="rail__leader" />
                <span className="rail__price">Rs {rupees(dish.price)}</span>
              </div>
              <p className="mt-2 text-ink/65">{dish.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/15 bg-haze/40">
        <div className="shell grid gap-10 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <h2 className="font-display text-4xl tracking-tightest md:text-5xl">
            A counter, a tandoor,
            <br />
            and no reservations
            <br />
            before seven.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              Chowk opened in a converted bungalow garage in 2019 with six tables and one
              cook. There are more tables now and four cooks, but the tandoor is the
              same one and it still gets lit at four in the afternoon.
            </p>
            <p>
              We buy meat from the same two suppliers we started with, grind masala every
              morning, and refuse to put anything on the menu we cannot make properly on a
              busy Saturday.
            </p>
            <Link href="/about" className="eyebrow inline-block border-b border-ink pb-1">
              Read the whole story
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-20 text-center md:py-28">
        <p className="eyebrow text-ink/50">Tuesday to Sunday, from six</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-tightest">
          Come hungry, come late, bring people.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="eyebrow bg-ink px-7 py-4 text-bg transition-colors hover:bg-bottle"
          >
            Call {site.phone}
          </a>
          <Link href="/visit" className="eyebrow border-b border-ink pb-1">
            Directions and hours
          </Link>
        </div>
      </section>
    </>
  );
}
