import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import { dishes, categories } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Twelve dishes: coals, karahi, bread and rice, sides, sweet and chai. Prices in rupees, portions as served.",
};

export default function MenuPage() {
  return (
    <>
      <section className="border-b border-ink/15">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow text-ink/50">Twelve dishes · prices include tax</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.85] tracking-tightest">
            The menu
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Everything here is cooked to order except the raan, which takes two days.
            Tell the floor staff about allergies before you order, not after.
          </p>
        </div>
      </section>

      <MenuBrowser dishes={dishes} categories={categories} />
    </>
  );
}
