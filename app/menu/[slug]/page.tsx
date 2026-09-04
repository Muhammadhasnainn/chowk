import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { dishes, getDish } from "@/lib/menu";
import { rupees } from "@/lib/utils";
import Plate from "@/components/Plate";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const dish = getDish(params.slug);
  if (!dish) return { title: "Not found" };
  return { title: dish.name, description: dish.blurb };
}

export default function DishPage({ params }: Props) {
  const dish = getDish(params.slug);
  if (!dish) notFound();

  const related = dish.pairs.map(getDish).filter(Boolean);

  return (
    <>
      <article>
        <section className="board text-bg">
          <div className="shell py-14 md:py-20">
            <Link
              href="/menu"
              className="eyebrow inline-flex items-center gap-2 text-bg/50 hover:text-marigold"
            >
              <ArrowLeft size={13} /> Menu
            </Link>

            <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="eyebrow text-marigold">{dish.category}</p>
                <h1 className="mt-4 font-display text-[clamp(2.75rem,9vw,6rem)] leading-[0.85] tracking-tightest">
                  {dish.name}
                </h1>
                <p className="mt-4 text-2xl text-bg/55">{dish.urdu}</p>
              </div>
              <Plate hue={dish.hue} urdu={dish.urdu} className="w-32 justify-self-start md:w-full md:max-w-[15rem]" />
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-bg/20 pt-8 sm:grid-cols-4">
              {[
                { k: "Price", v: `Rs ${rupees(dish.price)}` },
                { k: "Serves", v: dish.serves },
                { k: "Heat", v: dish.heat },
                { k: "Section", v: dish.category },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="eyebrow text-bg/40">{row.k}</dt>
                  <dd className="mt-2 font-mono text-sm text-bg/90">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="shell grid gap-14 py-16 md:grid-cols-[1.25fr_0.75fr] md:py-24">
          <div className="space-y-6 text-lg leading-relaxed text-ink/80">
            {dish.story.map((para, i) => (
              <p key={i} className={i === 0 ? "text-xl text-ink" : undefined}>
                {para}
              </p>
            ))}
          </div>

          <aside>
            <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">What goes in</h2>
            <ul className="mt-5 space-y-3">
              {dish.built.map((item) => (
                <li key={item} className="flex gap-3 text-ink/75">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-marigold" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/15 bg-haze/40">
          <div className="shell py-16 md:py-20">
            <h2 className="font-display text-3xl tracking-tightest md:text-4xl">
              Order it with
            </h2>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d) => (
                <Link key={d!.slug} href={`/menu/${d!.slug}`} className="group">
                  <div className="rail">
                    <span className="font-display text-xl tracking-tight">{d!.name}</span>
                    <span className="rail__leader" />
                    <span className="rail__price">Rs {rupees(d!.price)}</span>
                  </div>
                  <p className="mt-1.5 text-ink/60">{d!.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
