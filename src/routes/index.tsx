import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { catalog, byGender } from "@/lib/products";
import shemagh from "@/assets/shemagh-red-head.jpg";
import niqabTile from "@/assets/niqab-khadija-2.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";
import honeyTile from "@/assets/honey-kashmir-multiflora.jpg";
import kufi from "@/assets/kufi-white-front.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Heritage Shemaghs, Niqabs & Sidr Honey" },
      { name: "description", content: "Hand-loomed shemaghs, niqabs, leather gloves and raw Sidr honey. Quietly bold heritage essentials." },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<"women" | "men">("women");
  const items = byGender(tab).slice(0, 4);
  const honeyItems = catalog.filter((p) => p.collection === "honey");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — full-bleed, editorial (mannequin close-up, exactly as reference) */}
      <section className="relative w-full overflow-hidden bg-cream -mt-px">
        <div className="relative h-[88svh] min-h-[600px] md:h-[96svh] md:min-h-[720px]">
          <img
            src={shemagh}
            alt="Heritage Yemeni shemagh, hand-loomed"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] md:object-[center_15%] scale-[1.08] animate-ken-burns"
          />
          {/* Warm ink vignette for title readability */}
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

              {/* Refined Women / Men selector — segmented pill with gold ring */}
              <div className="mt-8 inline-flex items-stretch p-1 rounded-full bg-ivory/95 backdrop-blur-sm border border-gold/40 shadow-elegant relative">
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-gold/20" />
                <Link
                  to="/women"
                  className="relative px-7 md:px-10 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-gold hover:text-ink transition-all group"
                >
                  <span className="relative">Women</span>
                </Link>
                <span aria-hidden className="w-px my-2 bg-gold/40" />
                <Link
                  to="/men"
                  className="relative px-7 md:px-10 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-ink hover:text-gold transition-all"
                >
                  <span className="relative">Men</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Our Best Sellers</p>
          <div className="mt-5 inline-flex items-center gap-8">
            {(["women", "men"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`font-display text-3xl md:text-4xl pb-1 transition capitalize ${tab === k ? "text-ink border-b-2 border-gold-deep" : "text-ink/40 hover:text-ink"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 2} />)}
        </div>

        <div className="mt-12 text-center">
          <Link to={tab === "women" ? "/women" : "/men"} className="inline-flex items-center bg-ink text-ivory px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
            All {tab === "women" ? "Women" : "Men"}
          </Link>
        </div>
      </section>

      {/* Honey banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[64vh] min-h-[440px]">
          <img src={honey} alt="Raw Sidr honey" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className="text-ivory max-w-md animate-fade-up">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Harvest</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">Raw Sidr honey,<br/>straight from the hive.</h2>
              <p className="mt-4 text-[14px] text-ivory/80 max-w-sm">Unfiltered, unheated and traceable to a single highland origin.</p>
              <Link to="/honey" className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold transition">
                Shop honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honey rail */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-16 flex items-end justify-between">
          <h3 className="font-display text-2xl md:text-3xl text-ink">Shop honey</h3>
          <Link to="/honey" className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">View all →</Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <ul className="flex gap-3 md:gap-4 px-4 md:px-8 py-8 max-w-7xl mx-auto">
            {honeyItems.map((p) => (
              <li key={p.slug} className="snap-start shrink-0 w-[62vw] sm:w-56 md:w-64">
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Collections grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Shop by Collection</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Explore the House</h2>
          <p className="mt-4 text-[14px] text-ink/60 max-w-md mx-auto">Five quietly considered collections — choose your entry point.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          <CollectionTile to="/shemaghs" name="Shemaghs" img={shemagh} eyebrow="Signature" className="col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px]" size="lg" />
          <CollectionTile to="/niqabs" name="Niqabs" img={niqabTile} eyebrow="For Her" className="col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px]" size="lg" />
          <CollectionTile to="/honey" name="Honey" img={honeyTile} className="col-span-2 md:col-span-2 aspect-square md:aspect-auto md:h-[340px]" size="sm" />
          <CollectionTile to="/gloves" name="Gloves" img={gloves} className="col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[340px]" size="sm" />
          <CollectionTile to="/kufis" name="Kufis" img={kufi} className="col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[340px]" size="sm" />
        </div>
      </section>

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

function CollectionTile({ to, name, img, eyebrow, className, size }: {
  to: string; name: string; img: string; eyebrow?: string; className: string; size: "lg" | "sm";
}) {
  return (
    <Link to={to} className={`group relative overflow-hidden bg-cream ${className}`}>
      <img src={img} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className={`absolute ${size === "lg" ? "bottom-5 left-5 right-5" : "bottom-4 left-4 right-4"} text-ivory transition-transform duration-500 group-hover:-translate-y-1`}>
        {eyebrow && <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/80">{eyebrow}</p>}
        <h3 className={`font-display ${size === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} mt-1`}>{name}</h3>
        <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-ivory pb-0.5">
          Shop <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
