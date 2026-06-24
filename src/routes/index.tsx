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

      {/* Horizontal product rail tied to editorial category (Niqabs) */}
      <ProductRail
        heading="From The Craft — Niqabs"
        items={products.filter((p) => p.to === "/niqabs").concat(products.filter((p) => p.to !== "/niqabs")).slice(0, 6)}
      />

      {/* Value props — quiet trust bar */}
      <section className="border-y border-ink/10 bg-cream">
        <ul className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, label: "Free shipping", sub: "Orders over $80" },
            { icon: ShieldCheck, label: "Authentic", sub: "Sourced at origin" },
            { icon: Scissors, label: "Hand-finished", sub: "Loomed in small batches" },
            { icon: Leaf, label: "Raw & natural", sub: "Unfiltered Sidr honey" },
          ].map((v) => (
            <li key={v.label} className="flex items-center gap-3">
              <v.icon className="h-5 w-5 text-gold-deep shrink-0" />
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-ink">{v.label}</p>
                <p className="text-[11px] text-ink/55 mt-0.5">{v.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Collections — premium asymmetric editorial grid */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Shop by Category</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">The Edit</h2>
          </div>
          <Link to="/men" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/70 hover:text-ink border-b border-ink/30 pb-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 md:h-[600px]">
          {/* Large feature */}
          <Link to="/shemaghs" className="group relative col-span-2 md:col-span-3 md:row-span-2 overflow-hidden bg-cream">
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

          <Link to="/niqabs" className="group relative col-span-2 md:col-span-3 overflow-hidden bg-cream">
            <img src={niqab} alt="Niqabs" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
            <div className="absolute bottom-5 left-5 text-ivory">
              <h3 className="font-display text-2xl md:text-3xl">Niqabs</h3>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">Shop</span>
            </div>
          </Link>

          <Link to="/gloves" className="group relative overflow-hidden bg-cream md:col-span-2">
            <img src={gloves} alt="Gloves" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition" />
            <div className="absolute bottom-4 left-4 text-ivory">
              <h3 className="font-display text-xl md:text-2xl">Gloves</h3>
            </div>
          </Link>

          <Link to="/honey" className="group relative overflow-hidden bg-cream">
            <img src={honey} alt="Sidr Honey" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition" />
            <div className="absolute bottom-4 left-4 text-ivory">
              <h3 className="font-display text-xl md:text-2xl">Honey</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Editorial quote / origin story */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Origin</p>
          <p className="font-display text-2xl md:text-3xl leading-snug mt-6">
            "We work with weavers, tanners and beekeepers whose craft is older than the brand itself —
            then put their work in your hands, unhurried and unembellished."
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-ivory/60">— The Fawzaan Atelier</p>
        </div>
      </section>

      {/* Reviews — three column */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Loved by 4,000+</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3">What people are saying</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { q: "The shemagh drapes beautifully — proper weight, proper weave.", a: "Yusuf K." },
            { q: "Niqab fabric is unreal. Soft, breathable, no static.", a: "Maryam A." },
            { q: "The Sidr honey tastes like nothing I've had from a supermarket.", a: "Idris R." },
          ].map((r) => (
            <figure key={r.a} className="border border-ink/10 bg-cream p-7">
              <div className="text-gold-deep text-lg tracking-widest">★★★★★</div>
              <blockquote className="font-display text-xl mt-4 leading-snug text-ink">"{r.q}"</blockquote>
              <figcaption className="mt-5 text-[11px] uppercase tracking-[0.22em] text-ink/60">{r.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter — split image + form */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <img src={honey} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-6 md:px-12 py-14 md:py-20 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-deep">The List</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">Early access,<br/>no noise.</h2>
            <p className="mt-4 text-[14px] text-ink/65 max-w-md">
              New drops, restocks and quiet stories from the makers — straight to your inbox.
            </p>
            <form className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
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
            <p className="mt-3 text-[11px] text-ink/45">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>


      <SiteFooter />
    </div>
  );
}
