import Link from "next/link";
import { rupees } from "@/lib/utils";
import type { Dish } from "@/lib/menu";

export default function DishRow({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/menu/${dish.slug}`}
      className="group block border-b border-ink/10 py-6 transition-colors hover:bg-ink/[0.03]"
    >
      <div className="rail">
        <span className="font-display text-2xl tracking-tight md:text-[1.75rem]">
          {dish.name}
        </span>
        <span className="rail__leader" />
        <span className="rail__price">Rs {rupees(dish.price)}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="max-w-2xl text-ink/65">{dish.blurb}</p>
        <span className="eyebrow text-ink/35">{dish.serves}</span>
      </div>
    </Link>
  );
}
