import { useCurrency } from "@/lib/currency";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";

export function AnnouncementBar() {
  const { format } = useCurrency();

  return (
    <div className="border-b border-white/10 bg-ink px-4 py-2 text-center text-ivory">
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ivory/86 md:text-[11px]">
        <span className="text-gold">Fawzaan</span>
        <span className="mx-2 text-ivory/35">/</span>
        <span className="hidden min-[460px]:inline">
          Worldwide shipping over {format(FREE_SHIP_THRESHOLD)}
        </span>
        <span className="min-[460px]:hidden">Worldwide shipping</span>
      </p>
    </div>
  );
}
