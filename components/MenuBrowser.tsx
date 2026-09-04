"use client";

import { useMemo, useState } from "react";
import DishRow from "@/components/DishRow";
import type { Category, Dish } from "@/lib/menu";
import { cn } from "@/lib/utils";

export default function MenuBrowser({
  dishes,
  categories,
}: {
  dishes: Dish[];
  categories: Category[];
}) {
  const [active, setActive] = useState<Category | "All">("All");

  const groups = useMemo(() => {
    const shown = active === "All" ? categories : [active];
    return shown
      .map((c) => ({ category: c, items: dishes.filter((d) => d.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [active, categories, dishes]);

  return (
    <div className="shell py-14 md:py-16">
      <div className="sticky top-16 z-30 -mx-6 flex gap-2 overflow-x-auto bg-bg/95 px-6 py-4 backdrop-blur md:top-20 md:-mx-10 md:px-10">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "eyebrow whitespace-nowrap border px-4 py-2.5 transition-colors",
              active === c
                ? "border-ink bg-ink text-bg"
                : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-16">
        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">{group.category}</h2>
            <div>
              {group.items.map((dish) => (
                <DishRow key={dish.slug} dish={dish} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
