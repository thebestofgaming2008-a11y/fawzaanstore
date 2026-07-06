import { useCurrency } from "@/lib/currency";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";

const messages = [
  "Dispatched within 24h from our atelier",
  "30-day easy returns / Secure checkout",
  "New: Winter weave Shemaghs - limited run",
];

export function AnnouncementBar() {
  const { format } = useCurrency();
  const loop = [`Free worldwide shipping over ${format(FREE_SHIP_THRESHOLD)}`, ...messages];
  const marquee = [...loop, ...loop];

  return (
    <div className="bg-ink text-ivory overflow-hidden border-b border-white/10">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {marquee.map((m, i) => (
          <span key={i} className="eyebrow px-6 text-ivory/90">
            <span className="text-gold mr-2">*</span>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
