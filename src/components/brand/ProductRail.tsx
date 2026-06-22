import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";
import { useCart } from "@/lib/cart";

export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  to: "/shemaghs" | "/niqabs" | "/gloves" | "/honey";
  tag?: string;
};

export const products: Product[] = [
  { id: "shemagh-classic", name: "Classic Shemagh", price: 48, img: shemagh, to: "/shemaghs", tag: "Bestseller" },
  { id: "niqab-premium",   name: "Premium Niqab",   price: 36, img: niqab,   to: "/niqabs",   tag: "New" },
  { id: "gloves-leather",  name: "Leather Gloves",  price: 62, img: gloves,  to: "/gloves" },
  { id: "honey-sidr",      name: "Raw Sidr Honey",  price: 28, img: honey,   to: "/honey",    tag: "Limited" },
  { id: "shemagh-cream",   name: "Cream Shemagh",   price: 48, img: shemagh, to: "/shemaghs" },
  { id: "niqab-silk",      name: "Silk Niqab",      price: 44, img: niqab,   to: "/niqabs" },
];

export function ProductRail({ heading, items = products }: { heading?: string; items?: Product[] }) {
  const { add } = useCart();

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
          {items.map((p) => (
            <li key={p.id} className="snap-start shrink-0 w-[62vw] sm:w-64 md:w-72">
              <div className="group block">
                <Link to={p.to} className="block">
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
                    <button
                      aria-label={`Quick add ${p.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        add({ id: p.id, name: p.name, price: p.price, img: p.img });
                      }}
                      className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-ivory text-ink shadow-elegant flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition hover:bg-gold hover:text-ink"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                  <p className="text-sm font-semibold text-gold-deep shrink-0 ml-2">${p.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
