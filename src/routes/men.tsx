import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { products } from "@/components/brand/ProductRail";
import { useCart } from "@/lib/cart";
import shemagh from "@/assets/hero-shemagh.jpg";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men — Fawzaan Store" },
      { name: "description", content: "Shemaghs, leather gloves and heritage essentials for men." },
    ],
  }),
  component: MenPage,
});

function MenPage() {
  const { add } = useCart();
  const items = products.filter((p) => p.to === "/shemaghs" || p.to === "/gloves");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <section className="relative h-[44vh] min-h-[280px] overflow-hidden bg-cream">
        <img src={shemagh} alt="Men's collection" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-ivory">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/85">Collection</p>
            <h1 className="font-display text-5xl md:text-7xl mt-3">Men</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {items.map((p) => (
            <li key={p.id} className="group">
              <Link to={p.to} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <button
                    aria-label={`Quick add ${p.name}`}
                    onClick={(e) => { e.preventDefault(); add({ id: p.id, name: p.name, price: p.price, img: p.img }); }}
                    className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-ivory text-ink shadow-elegant flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-gold"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </Link>
              <div className="mt-4 text-center">
                <p className="text-[13px] uppercase tracking-[0.14em] text-ink">{p.name}</p>
                <p className="text-[12px] text-ink/60 mt-1">${p.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
