import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: "Fawzaan — Adorn the Sunnah" },
      { name: "description", content: "Heritage shemaghs, niqabs, kufis and raw Sidr honey for the student of knowledge. Quiet, considered, sunnah-inspired." },
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
};

const sections: CollectionSection[] = [
  { key: "shemaghs", title: "Shemaghs", eyebrow: "The Signature", blurb: "Hand-loomed in Yemen. The heritage keffiyeh, wrapped without slipping.", banner: shemagh, href: "/shemaghs" },
  { key: "niqabs",   title: "Niqabs",   eyebrow: "For Her",       blurb: "Two-layer chiffon. Featherlight, opaque, quietly premium.",                banner: niqabTile, href: "/niqabs" },
  { key: "honey",    title: "Raw Sidr Honey", eyebrow: "The Harvest", blurb: "Unfiltered, unheated and traceable to a single Kashmiri highland origin.", banner: honey, href: "/honey" },
  { key: "kufis",    title: "Kufis",    eyebrow: "Everyday",      blurb: "Breathable openwork, hand-finished. Sits softly, holds shape.",           banner: kufi,  href: "/kufis" },
  { key: "gloves",   title: "Leather Gloves", eyebrow: "Heritage", blurb: "Full-grain leather, silk-lined. Cut to move, warm without bulk.",         banner: gloves, href: "/gloves" },
];

const categories = [
  { title: "Shemaghs", img: shemagh, href: "/shemaghs" },
  { title: "Niqabs",   img: niqabTile, href: "/niqabs" },
  { title: "Kufis",    img: kufi, href: "/kufis" },
  { title: "Gloves",   img: gloves, href: "/gloves" },
  { title: "Honey",    img: honey, href: "/honey" },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — cream studio background, minimal typography */}
      <section className="relative w-full overflow-hidden bg-cream">
        {/* soft honey-studio backdrop */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#FFF6DE_0%,#FAF8F2_55%,#F1EBDA_100%)]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_30%,#F4B400_0,transparent_40%),radial-gradient(circle_at_80%_70%,#C99700_0,transparent_45%)]" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold-deep font-semibold">فوزان · Fawzaan</p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl mt-5 leading-[0.95] tracking-tight text-ink">
            Adorn the Sunnah
          </h1>
          <p className="mt-5 text-[14px] md:text-[15px] text-ink/65 max-w-lg mx-auto">
            Heritage essentials for the seeker — hand-loomed, honestly sourced.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/men"
              className="w-56 sm:w-auto px-10 py-3.5 rounded-full bg-ink text-ivory text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-gold hover:text-ink transition"
            >
              Shop Men
            </Link>
            <Link
              to="/women"
              className="w-56 sm:w-auto px-10 py-3.5 rounded-full border border-ink/80 text-ink text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-ink hover:text-ivory transition"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Browse Categories (Shopify-style grid) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-gold-deep">Shop by category</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Browse the House</h2>
          </div>
          <Link to="/search" className="hidden md:inline text-[11px] uppercase tracking-[0.24em] text-ink/60 hover:text-ink">View all →</Link>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((c) => (
            <li key={c.title}>
              <Link to={c.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#FFF6DE_0%,#FAF8F2_60%,#EFE8D6_100%)]" />
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="relative z-10 h-full w-full object-cover mix-blend-multiply group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-ink/5" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.22em] text-ink">{c.title}</p>
                  <ArrowRight className="h-3.5 w-3.5 text-ink/50 group-hover:text-gold-deep group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Per-collection sections — cream banner + rail (honey-style) */}
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

      <JoinTheHouse />

      <SiteFooter />
    </div>
  );
}

function CollectionSection({ section }: { section: CollectionSection }) {
  const items = byCollection(section.key).slice(0, 8);

  return (
    <section className="bg-ivory">
      {/* Cream studio banner (matches honey aesthetic) */}
      <div className="relative w-full overflow-hidden bg-cream">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#FFF6DE_0%,#FAF8F2_55%,#EFE8D6_100%)]" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fade-up order-2 md:order-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-deep font-semibold">{section.eyebrow}</p>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1] text-ink">{section.title}</h2>
            <p className="mt-4 text-[14px] text-ink/65 max-w-sm">{section.blurb}</p>
            <Link
              to={section.href}
              className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink border-b border-ink pb-1 hover:text-gold-deep hover:border-gold-deep transition"
            >
              Shop {section.title} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="order-1 md:order-2 relative aspect-[5/4] md:aspect-[4/5] max-h-[420px] w-full mx-auto">
            <img
              src={section.banner}
              alt={section.title}
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      {/* Product rail */}
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
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
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
