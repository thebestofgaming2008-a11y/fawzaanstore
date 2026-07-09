import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { catalog, byCollection, type Collection } from "@/lib/products";
import shemagh from "@/assets/shemagh-red-head.jpg";
import niqabTile from "@/assets/niqab-khadija-2.jpg";
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

type CollectionSection = {
  key: Collection;
  title: string;
  eyebrow: string;
  blurb: string;
  banner: string;
  href: string;
  align?: "left" | "right";
};

const sections: CollectionSection[] = [
  {
    key: "shemaghs",
    title: "Shemaghs",
    eyebrow: "The Signature",
    blurb: "Hand-loomed in Yemen. The heritage keffiyeh, wrapped without slipping.",
    banner: shemagh,
    href: "/shemaghs",
    align: "left",
  },
  {
    key: "niqabs",
    title: "Niqabs",
    eyebrow: "For Her",
    blurb: "Two-layer chiffon. Featherlight, opaque, quietly premium.",
    banner: niqabTile,
    href: "/niqabs",
    align: "right",
  },
  {
    key: "honey",
    title: "Raw Sidr Honey",
    eyebrow: "The Harvest",
    blurb: "Unfiltered, unheated and traceable to a single Kashmiri highland origin.",
    banner: honey,
    href: "/honey",
    align: "left",
  },
  {
    key: "kufis",
    title: "Kufis",
    eyebrow: "Everyday",
    blurb: "Breathable openwork, hand-finished. Sits softly, holds shape.",
    banner: kufi,
    href: "/kufis",
    align: "right",
  },
  {
    key: "gloves",
    title: "Leather Gloves",
    eyebrow: "Heritage",
    blurb: "Full-grain leather, silk-lined. Cut to move, warm without bulk.",
    banner: gloves,
    href: "/gloves",
    align: "left",
  },
];

function Home() {
  const newArrivals = catalog.filter((p) => p.tag === "New" || p.tag === "Bestseller").slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — banner with men / women selector */}
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
              <p className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] shimmer-gold font-semibold">Est. Heritage</p>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl mt-3 leading-[0.95] tracking-tight text-ivory drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
                Choose your house
              </h1>
              <p className="mt-4 text-[13px] md:text-[14px] text-ivory/80 max-w-md mx-auto">
                Two edits, one heritage. Enter the collection made for you.
              </p>

              <div className="mt-8 inline-flex items-stretch rounded-full bg-ivory/95 backdrop-blur-sm border border-gold/40 shadow-elegant overflow-hidden">
                <Link
                  to="/women"
                  className="px-8 md:px-12 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-gold transition-colors"
                >
                  Women
                </Link>
                <span aria-hidden className="w-px my-2 bg-gold/40" />
                <Link
                  to="/men"
                  className="px-8 md:px-12 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink hover:bg-ink hover:text-gold transition-colors"
                >
                  Men
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second section — New Arrivals editorial grid (Shopify-style, minimal) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-gold-deep">Just Landed</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">New Arrivals</h2>
          <div className="mt-4 flex justify-center">
            <span className="divider-gold text-xs">✦</span>
          </div>
        </div>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {newArrivals.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 2} />)}
        </div>
      </section>

      {/* Per-collection sections — banner + rail (repeated) */}
      {sections.map((s) => (
        <CollectionSection key={s.key} section={s} />
      ))}

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

      {/* FINAL — Join the House · color-shifting gold gradient */}
      <JoinTheHouse />

      <SiteFooter />
    </div>
  );
}

function CollectionSection({ section }: { section: CollectionSection }) {
  const items = byCollection(section.key).slice(0, 8);
  const alignRight = section.align === "right";

  return (
    <section className="bg-ivory">
      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[52vh] min-h-[360px] md:h-[60vh]">
          <img src={section.banner} alt={section.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className={`absolute inset-0 ${alignRight ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-ink/60 via-ink/25 to-transparent`} />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className={`text-ivory max-w-md animate-fade-up ${alignRight ? "ml-auto text-right" : ""}`}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">{section.eyebrow}</p>
              <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">{section.title}</h2>
              <p className="mt-4 text-[14px] text-ivory/80 max-w-sm">{section.blurb}</p>
              <Link
                to={section.href}
                className={`mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold transition ${alignRight ? "flex-row-reverse" : ""}`}
              >
                Shop {section.title} <ArrowRight className={`h-3.5 w-3.5 ${alignRight ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rail */}
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <ul className="flex gap-3 md:gap-4 px-4 md:px-8 py-10 md:py-14 max-w-7xl mx-auto">
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

function JoinTheHouse() {
  return (
    <section aria-label="Join the House" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 animate-hue-shift" />
      <div aria-hidden className="absolute inset-0 bg-ink/40" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32 text-center text-ivory">
        <p className="font-arabic text-3xl md:text-4xl shimmer-gold">فوزان</p>
        <p className="eyebrow mt-4 text-gold-soft">The House Letter</p>
        <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight text-balance">
          Enter the house.<br className="hidden md:block" /> Receive the harvest first.
        </h2>
        <p className="mt-4 text-[14px] text-ivory/75 max-w-md mx-auto">
          Quiet dispatches on new looms, single-origin honey harvests, and members-only editions.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-ivory/10 border border-gold/40 backdrop-blur-sm px-4 py-3 text-[13px] text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-gold rounded-full"
          />
          <button
            type="submit"
            className="bg-gold text-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-ivory transition rounded-full"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
