import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Plus, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { products } from "@/components/brand/ProductRail";
import { useCart } from "@/lib/cart";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";
import kufi from "@/assets/hero-kufi.jpg";

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
  { key: "women", label: "Women", to: "/women" as const, filter: ["/niqabs"] },
  { key: "men", label: "Men", to: "/men" as const, filter: ["/shemaghs", "/gloves"] },
] as const;

function Home() {
  const { add } = useCart();
  const [tab, setTab] = useState<"women" | "men">("women");
  const active = tabs.find((t) => t.key === tab)!;
  const filtered = products.filter((p) => (active.filter as readonly string[]).includes(p.to));
  const display = [...filtered, ...products.filter((p) => !filtered.includes(p))].slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — Prestige-style: full-bleed image + centered overlay card */}
      <section className="relative w-full overflow-hidden bg-cream">
        <div className="relative h-[88vh] min-h-[600px]">
          <img
            src={shemagh}
            alt="Heritage collection on mannequin"
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
                  to="/women"
                  className="bg-ivory text-ink px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold transition"
                >
                  Women
                </Link>
                <Link
                  to="/men"
                  className="bg-ink text-ivory px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
                >
                  Men
                </Link>
              </div>
            </div>
          </div>

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
                onClick={() => setTab(t.key)}
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
            to={active.to}
            className="inline-flex items-center bg-ink text-ivory px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
          >
            All {active.label}
          </Link>
        </div>
      </section>

      {/* Editorial banner — Honey */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[70vh] min-h-[480px]">
          <img src={honey} alt="Raw Sidr honey from origin" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className="text-ivory max-w-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Harvest</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
                Raw Sidr honey,<br/>straight from the hive.
              </h2>
              <p className="mt-4 text-[14px] text-ivory/80 max-w-sm">
                Unfiltered, unheated and traceable to a single highland origin.
              </p>
              <Link
                to="/honey"
                className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold"
              >
                Shop honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Collections — stylish grid so customers can pick any category */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Shop by Collection</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Explore the House</h2>
          <p className="mt-4 text-[14px] text-ink/60 max-w-md mx-auto">
            Five quietly considered collections — choose your entry point.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {/* Shemaghs — large feature */}
          <Link to="/shemaghs" className="group relative col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px] overflow-hidden bg-cream">
            <img src={shemagh} alt="Shemaghs" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-ivory">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/80">Signature</p>
              <h3 className="font-display text-3xl md:text-4xl mt-1">Shemaghs</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">
                Shop <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Niqabs */}
          <Link to="/niqabs" className="group relative col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px] overflow-hidden bg-cream">
            <img src={niqab} alt="Niqabs" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-ivory">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/80">For Her</p>
              <h3 className="font-display text-3xl md:text-4xl mt-1">Niqabs</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">
                Shop <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Honey */}
          <Link to="/honey" className="group relative col-span-2 md:col-span-2 aspect-square md:aspect-auto md:h-[340px] overflow-hidden bg-cream">
            <img src={honey} alt="Sidr Honey" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-ivory">
              <h3 className="font-display text-2xl md:text-3xl">Honey</h3>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">Shop</span>
            </div>
          </Link>

          {/* Gloves */}
          <Link to="/gloves" className="group relative col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[340px] overflow-hidden bg-cream">
            <img src={gloves} alt="Gloves" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-ivory">
              <h3 className="font-display text-2xl md:text-3xl">Gloves</h3>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">Shop</span>
            </div>
          </Link>

          {/* Kufis */}
          <Link to="/men" className="group relative col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[340px] overflow-hidden bg-cream">
            <img src={kufi} alt="Kufis" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-ivory">
              <h3 className="font-display text-2xl md:text-3xl">Kufis</h3>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">Shop</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Guarantee section — end of page */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-deep">Our Promise</p>
            <h2 className="font-display text-3xl md:text-4xl mt-3">The Fawzaan Guarantee</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { icon: Truck, label: "Free worldwide shipping", sub: "On every order over $80, tracked door to door." },
              { icon: RotateCcw, label: "30-day returns", sub: "Not in love with it? Send it back, no questions." },
              { icon: ShieldCheck, label: "Authenticity assured", sub: "Sourced at origin, signed by the maker." },
              { icon: Lock, label: "Secure checkout", sub: "Encrypted payments — your details stay yours." },
            ].map((v) => (
              <li key={v.label} className="text-center flex flex-col items-center">
                <span className="h-12 w-12 rounded-full bg-ivory border border-ink/10 flex items-center justify-center">
                  <v.icon className="h-5 w-5 text-gold-deep" />
                </span>
                <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-ink">{v.label}</p>
                <p className="mt-2 text-[13px] text-ink/60 max-w-[230px] leading-relaxed">{v.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
