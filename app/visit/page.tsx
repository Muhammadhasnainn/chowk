import type { Metadata } from "next";
import { site } from "@/lib/site";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Address, hours, parking and table bookings for Chowk on Khayaban-e-Bukhari, Phase VI, DHA Karachi.",
};

export default function VisitPage() {
  return (
    <>
      <section className="board text-bg">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow text-marigold">Visit</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.85] tracking-tightest">
            Find the
            <br />
            green door.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-bg/70">
            We are set back from the road behind a neem tree. There is no signboard, only
            the door.
          </p>
        </div>
      </section>

      <section className="shell grid gap-14 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <div className="space-y-10">
          <div>
            <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">Address</h2>
            <address className="mt-5 not-italic text-lg leading-relaxed text-ink/80">
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-4 inline-block border-b border-ink pb-1"
            >
              Open in Maps
            </a>
          </div>

          <div>
            <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">Hours</h2>
            <ul className="mt-5">
              {site.hours.map((row) => (
                <li key={row.days} className="rail border-b border-ink/10 py-3">
                  <span className="text-ink/80">{row.days}</span>
                  <span className="rail__leader" />
                  <span className="rail__price text-ink/70">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow border-b border-ink pb-3 text-ink/50">Getting in</h2>
            <ul className="mt-5 space-y-3 text-ink/75">
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-marigold" />
                Valet from 7 pm. Street parking fills up by 8 on weekends.
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-marigold" />
                Ramp access at the side entrance, ground floor throughout.
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-marigold" />
                Cards and cash both fine. No online ordering, no delivery.
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-marigold" />
                Large groups over eight, call rather than book online.
              </li>
            </ul>
            <p className="mt-6 font-mono text-sm text-ink/70">
              <a className="hover:text-bottle" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
              <br />
              <a className="hover:text-bottle" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <ReservationForm />
      </section>
    </>
  );
}
