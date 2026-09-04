"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bg/90 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl font-semibold tracking-tightest md:text-[1.75rem]">
            {site.name}
          </span>
          <span className="eyebrow hidden text-ink/50 sm:inline">Karachi</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "eyebrow border-b py-1 transition-colors",
                  active
                    ? "border-marigold text-ink"
                    : "border-transparent text-ink/60 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="eyebrow bg-ink px-4 py-2.5 text-bg transition-colors hover:bg-bottle"
          >
            Book a table
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 p-2 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 md:hidden">
          <div className="shell flex flex-col py-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/5 py-4 font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="py-4 font-display text-2xl text-bottle"
            >
              Book a table
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
