import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="board mt-24 text-bg/85">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-4xl tracking-tightest text-bg">{site.name}</p>
          <p className="mt-3 max-w-xs text-bg/70">{site.description}</p>
        </div>

        <div>
          <p className="eyebrow text-marigold">Find us</p>
          <address className="mt-4 not-italic leading-relaxed text-bg/75">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            <a className="hover:text-marigold" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              {site.phone}
            </a>
            <br />
            <a className="hover:text-marigold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
        </div>

        <div>
          <p className="eyebrow text-marigold">Pages</p>
          <ul className="mt-4 space-y-2 text-bg/75">
            <li>
              <Link className="hover:text-marigold" href="/">
                Home
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-marigold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-bg/15">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-bg/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Chowk Restaurant, Karachi</span>
          <span className="font-mono">Closed Mondays</span>
        </div>
      </div>
    </footer>
  );
}
