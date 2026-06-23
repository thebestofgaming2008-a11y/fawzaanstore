import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { products } from "@/components/brand/ProductRail";
import { useCart } from "@/lib/cart";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Heritage Shemaghs, Niqabs & Sidr Honey" },
      { name: "description", content: "Hand-loomed shemaghs, niqabs, leather gloves and raw Sidr honey. Quietly bold heritage essentials." },
    ],
  }),
  component: Home,
});

const tabs = [
  { key: "shemaghs", label: "Shemaghs", to: "/shemaghs" as const },
  { key: "niqabs", label: "Niqabs", to: "/niqabs" as const },
];

function Home() {
  const { add } = useCart();
  const [tab, setTab] = useState<"shemaghs" | "niqabs">("shemaghs");
  const filtered = products.filter((p) => p.to === `/${tab}`).slice(0, 4);
  // ensure 4 cards always
  const display = [...filtered, ...products.filter((p) => !filtered.includes(p))].slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — Prestige-style: full-bleed image + centered overlay card */}
      <section className="relative w-full overflow-hidden bg-cream">
        <div className="relative h-[88vh] min-h-[600px]">
          <img
            src={shemagh}
            alt="Hand-loomed shemagh on mannequin"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />

          <div className="relative z-10 h-full flex items-center justify-center px-5">
            <div className="text-center text-ivory max-w-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/90">New Collection</p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl mt-4 leading-none tracking-wide">
                HERITAGE
              </h1>
              <div className="mt-6 flex items-center justify-center gap-0">
                <Link
                  to="/shemaghs"
                  className="bg-ivory text-ink px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold transition"
                >
                  Shemaghs
                </Link>
                <Link
                  to="/niqabs"
                  className="bg-ink text-ivory px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
                >
                  Niqabs
                </Link>
              </div>
            </div>
          </div>

          {/* scroll dot */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="h-9 w-9 rounded-full border border-ivory/70 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS — tabbed grid */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Our Best Sellers</p>
          <div className="mt-5 inline-flex items-center gap-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as "shemaghs" | "niqabs")}
                className={`font-display text-3xl md:text-4xl pb-1 transition ${
                  tab === t.key ? "text-ink border-b-2 border-gold-deep" : "text-ink/40 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {display.map((p, i) => (
            <li key={p.id + i} className="group">
              <Link to={p.to} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  {i === 3 && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.22em] text-ink/70">
                      Best Seller
                    </span>
                  )}
                  {(i === 0 || i === 1) && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.22em] text-ink/70">
                      New
                    </span>
                  )}
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    aria-label={`Quick add ${p.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      add({ id: p.id, name: p.name, price: p.price, img: p.img });
                    }}
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

        <div className="mt-12 text-center">
          <Link
            to={tab === "shemaghs" ? "/shemaghs" : "/niqabs"}
            className="inline-flex items-center bg-ink text-ivory px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
          >
            All {tab === "shemaghs" ? "Shemaghs" : "Niqabs"}
          </Link>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[70vh] min-h-[480px]">
          <img src={niqab} alt="The craft of Fawzaan" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className="text-ivory max-w-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Craft</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
                Made slowly,<br/>worn for years.
              </h2>
              <Link
                to="/shemaghs"
                className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold"
              >
                Discover <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections — Shop by category, simple grid */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Shop by Category</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">The Edit</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { to: "/shemaghs" as const, name: "Shemaghs", img: shemagh },
            { to: "/niqabs" as const, name: "Niqabs", img: niqab },
            { to: "/gloves" as const, name: "Gloves", img: gloves },
            { to: "/honey" as const, name: "Sidr Honey", img: honey },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group block">
              <div className="relative aspect-square overflow-hidden bg-cream">
                <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="mt-3 text-center text-[12px] uppercase tracking-[0.22em] text-ink">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter — minimal */}
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-5 md:px-8 py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Newsletter</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3">Stay in the loop.</h2>
          <form className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Email address"
              className="flex-1 bg-ivory border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold-deep"
            />
            <button className="bg-ink text-ivory px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
