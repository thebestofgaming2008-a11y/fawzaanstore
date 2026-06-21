import { Link } from "@tanstack/react-router";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export type Product = {
  name: string;
  price: string;
  img: string;
  to: "/shemaghs" | "/niqabs" | "/gloves" | "/honey";
  tag?: string;
};

export const products: Product[] = [
  { name: "Classic Shemagh", price: "$48", img: shemagh, to: "/shemaghs", tag: "Bestseller" },
  { name: "Premium Niqab", price: "$36", img: niqab, to: "/niqabs", tag: "New" },
  { name: "Leather Gloves", price: "$62", img: gloves, to: "/gloves" },
  { name: "Raw Sidr Honey", price: "$28", img: honey, to: "/honey", tag: "Limited" },
  { name: "Cream Shemagh", price: "$48", img: shemagh, to: "/shemaghs" },
  { name: "Silk Niqab", price: "$44", img: niqab, to: "/niqabs" },
];

export function ProductRail({ heading, items = products }: { heading?: string; items?: Product[] }) {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-16">
        {heading && (
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-3xl md:text-4xl text-ink">{heading}</h2>
            <span className="eyebrow text-gold-deep hidden sm:block">Swipe →</span>
          </div>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <ul className="flex gap-3 md:gap-5 px-5 md:px-8 pb-12 md:pb-16 max-w-7xl mx-auto">
          {items.map((p, i) => (
            <li key={i} className="snap-start shrink-0 w-[68vw] sm:w-72 md:w-80">
              <Link to={p.to} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {p.tag && (
                    <span className="absolute top-3 left-3 bg-ivory text-ink eyebrow px-2.5 py-1 rounded-sm shadow-soft">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                  <p className="text-sm font-semibold text-gold-deep shrink-0 ml-2">{p.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{scrollbar-width:none}`}</style>
    </section>
  );
}
