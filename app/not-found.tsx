import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow text-ink/50">404</p>
      <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-tightest">
        Nothing on this table.
      </h1>
      <p className="mt-5 max-w-md text-lg text-ink/70">
        That page is not on the menu. The twelve dishes we do have are one link away.
      </p>
      <div className="mt-8 flex gap-6">
        <Link href="/menu" className="eyebrow bg-ink px-6 py-3.5 text-bg">
          See the menu
        </Link>
        <Link href="/" className="eyebrow self-center border-b border-ink pb-1">
          Back home
        </Link>
      </div>
    </section>
  );
}
