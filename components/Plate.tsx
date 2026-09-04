import { cn } from "@/lib/utils";

export default function Plate({
  hue,
  urdu,
  className,
}: {
  hue: string;
  urdu: string;
  className?: string;
}) {
  return (
    <div
      className={cn("plate flex aspect-square items-center justify-center", className)}
      style={{ backgroundColor: hue }}
      aria-hidden="true"
    >
      <span className="select-none text-lg text-white/70 md:text-2xl">{urdu}</span>
    </div>
  );
}
