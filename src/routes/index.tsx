import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { catalog, byGender } from "@/lib/products";
import shemagh from "@/assets/shemagh-red-head.jpg";
import shemaghIvory from "@/assets/shemagh-red-front.jpg";
import niqabTile from "@/assets/niqab-khadija-2.jpg";
import niqabRed from "@/assets/niqab-red-front.jpg";
import honey from "@/assets/hero-honey.jpg";
import honeyTile from "@/assets/honey-kashmir-multiflora.jpg";
import kufi from "@/assets/kufi-white-front.jpg";
import bannerBrothers from "@/assets/banner-brothers.jpg";
import bannerNisaa from "@/assets/banner-nisaa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Heritage Shemaghs, Niqabs & Kashmir Honey" },
      { name: "description", content: "Hand-loomed shemaghs, chiffon niqabs and raw Kashmir honey. Quietly bold heritage essentials." },
    ],
  }),
  component: Home,
});

const collectionTiles = [
  { to: "/shemaghs", name: "Shemaghs", img: shemagh },
  { to: "/niqabs", name: "Niqabs", img: niqabTile },
  { to: "/kufis", name: "Kufis", img: kufi },
  { to: "/honey", name: "Honey", img: honeyTile },
];

function Home() {
  const [tab, setTab] = useState<"women" | "men">("women");
  const items = byGender(tab).slice(0, 4);
  const menItems = catalog.filter((p) => p.gender === "men").slice(0, 8);
  const womenItems = catalog.filter((p) => p.gender === "women").slice(0, 8);
  const honeyItems = catalog.filter((p) => p.collection === "honey");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-cream -mt-px">
        <div className="relative h-[88svh] min-h-[600px] md:h-[96svh] md:min-h-[720px]">
          <img
            src={shemagh}
            alt="Heritage Yemeni shemagh, hand-loomed"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 md:pb-24 px-5">
            <div className="text-center text-ivory max-w-2xl animate-fade-up">
              <p className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] shimmer-gold font-semibold">New Collection</p>
              <div className="mt-3 flex justify-center" aria-hidden>
                <svg viewBox="0 0 120 12" className="h-3 w-28 text-gold" fill="currentColor">
                  <path d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                  <circle cx="60" cy="6" r="1.6"/>
                </svg>
              </div>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl mt-3 leading-[0.95] tracking-tight text-ivory drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
                Heritage
              </h1>

              <div className="mt-8 inline-flex items-stretch p-1 rounded-full bg-ivory/95 backdrop-blur-sm border border-gold/40 shadow-elegant relative">
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-gold/20" />
                <Link to="/women" className="relative px-7 md:px-10 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-gold hover:text-ink transition-all">
                  Women
                </Link>
                <span aria-hidden className="w-px my-2 bg-gold/40" />
                <Link to="/men" className="relative px-7 md:px-10 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-ink hover:text-gold transition-all">
                  Men
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE COLLECTIONS — horizontal, sharp squares, title only */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-5xl leading-none">Browse Collections</h2>
            <span aria-hidden className="hidden md:block h-px flex-1 mx-8 bg-ink/15" />
            <Link to="/shemaghs" className="hidden md:inline-flex text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">All →</Link>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <ul className="flex gap-3 md:gap-4 px-4 md:px-8 max-w-7xl mx-auto">
            {collectionTiles.map((c) => (
              <li key={c.to} className="snap-start shrink-0 w-[70vw] sm:w-72 md:w-80">
                <Link to={c.to} className="group block relative aspect-square overflow-hidden bg-cream">
                  <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-0 noise-overlay" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-ivory flex items-end justify-between">
                    <h3 className="font-display text-2xl md:text-3xl">{c.name}</h3>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Our Best Sellers</p>
          <div className="mt-6 inline-flex relative rounded-full border border-ink/10 bg-cream p-1">
            <span aria-hidden className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]" style={{ transform: tab === "women" ? "translateX(0)" : "translateX(100%)" }} />
            {(["women", "men"] as const).map((k) => (
              <button key={k} onClick={() => setTab(k)} className={`relative z-10 px-8 md:px-12 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-500 ${tab === k ? "text-gold" : "text-ink/60 hover:text-ink"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>

        <div key={tab} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 animate-fade-up">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 2} />)}
        </div>
      </section>

      {/* Brothers banner + men rail */}
      <CollectionBanner
        img={bannerBrothers}
        eyebrow="The Brothers Collection"
        title={<>For the men<br/>of the house.</>}
        blurb="Hand-loomed shemaghs, ivory embroidery, breathable kufis."
        to="/men"
        align="left"
      />
      <ProductRailSection title="Shop Men" to="/men" items={menItems} />

      {/* Nisaa' banner + women rail */}
      <CollectionBanner
        img={bannerNisaa}
        eyebrow="The Nisaa' Collection"
        title={<>For the women<br/>of the house.</>}
        blurb="Two-layer chiffon niqabs — quiet, opaque, and softly draped."
        to="/women"
        align="right"
      />
      <ProductRailSection title="Shop Women" to="/women" items={womenItems} />

      {/* Honey banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[64vh] min-h-[440px]">
          <img src={honey} alt="Raw Kashmir honey" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className="text-ivory max-w-md animate-fade-up">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Harvest</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">Raw Kashmir honey,<br/>straight from the hive.</h2>
              <p className="mt-4 text-[14px] text-ivory/80 max-w-sm">Unfiltered, unheated, and traceable to a single highland origin.</p>
              <Link to="/honey" className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold transition">
                Shop honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductRailSection title="Shop Honey" to="/honey" items={honeyItems} />

      {/* Guarantee */}
      <section className="border-y border-ink/10 bg-cream">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-12">
          <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
            {[
              { icon: Truck, label: "Free shipping", sub: "On orders over $75" },
              { icon: RotateCcw, label: "30-day returns", sub: "Easy & no questions" },
              { icon: ShieldCheck, label: "Authentic", sub: "Sourced at origin" },
              { icon: Lock, label: "Secure checkout", sub: "Encrypted payments" },
            ].map((v) => (
              <li key={v.label} className="flex items-center justify-center gap-3 px-3 py-4 md:py-2 text-center md:text-left">
                <v.icon className="h-5 w-5 text-gold-deep shrink-0" />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-ink leading-tight">{v.label}</p>
                  <p className="text-[11px] text-ink/55 mt-0.5">{v.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function CollectionBanner({ img, eyebrow, title, blurb, to, align }: {
  img: string; eyebrow: string; title: React.ReactNode; blurb: string; to: string; align: "left" | "right";
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[70vh] min-h-[480px] md:h-[80vh]">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 ${align === "left" ? "bg-gradient-to-r from-ink/10 via-transparent to-ink/50" : "bg-gradient-to-l from-ink/10 via-transparent to-ink/50"}`} />
        <span aria-hidden className="absolute inset-0 noise-overlay opacity-40" />
        <div className={`relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center ${align === "right" ? "justify-end text-right" : ""}`}>
          <div className="text-ivory max-w-md animate-fade-up">
            <p className="text-[11px] uppercase tracking-[0.3em] shimmer-gold font-semibold">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-6xl mt-4 leading-[0.95] drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">{title}</h2>
            <p className="mt-4 text-[14px] text-ivory/85 max-w-sm ml-auto">{blurb}</p>
            <Link to={to} className={`mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold transition`}>
              Shop the edit <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductRailSection({ title, to, items }: { title: string; to: string; items: typeof catalog }) {
  if (!items.length) return null;
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-16 flex items-end justify-between">
        <h3 className="font-display text-2xl md:text-3xl text-ink">{title}</h3>
        <Link to={to} className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">View all →</Link>
      </div>
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <ul className="flex gap-3 md:gap-4 px-4 md:px-8 py-8 max-w-7xl mx-auto">
          {items.map((p) => (
            <li key={p.slug} className="snap-start shrink-0 w-[62vw] sm:w-56 md:w-64">
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
