import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Leaf, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { byCollection, type Collection } from "@/lib/products";
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
  { key: "shemaghs", title: "Shemaghs", eyebrow: "The Signature", blurb: "Hand-loomed in Yemen. The heritage keffiyeh, wrapped without slipping.", banner: shemagh, href: "/shemaghs", align: "left" },
  { key: "niqabs", title: "Niqabs", eyebrow: "For Her", blurb: "Two-layer chiffon. Featherlight, opaque, quietly premium.", banner: niqabTile, href: "/niqabs", align: "right" },
  { key: "honey", title: "Raw Sidr Honey", eyebrow: "The Harvest", blurb: "Unfiltered, unheated and traceable to a single Kashmiri highland origin.", banner: honey, href: "/honey", align: "left" },
  { key: "kufis", title: "Kufis", eyebrow: "Everyday", blurb: "Breathable openwork, hand-finished. Sits softly, holds shape.", banner: kufi, href: "/kufis", align: "right" },
  { key: "gloves", title: "Leather Gloves", eyebrow: "Heritage", blurb: "Full-grain leather, silk-lined. Cut to move, warm without bulk.", banner: gloves, href: "/gloves", align: "left" },
];

const categories: { label: string; href: string; img: string }[] = [
  { label: "Shemaghs", href: "/shemaghs", img: shemagh },
  { label: "Niqabs", href: "/niqabs", img: niqabTile },
  { label: "Honey", href: "/honey", img: honey },
  { label: "Kufis", href: "/kufis", img: kufi },
  { label: "Gloves", href: "/gloves", img: gloves },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — minimal, high-conversion CTA */}
      <section className="relative w-full overflow-hidden bg-fade-cream">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,180,0,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <span className="eyebrow text-gold-deep">Est. Heritage · Fawzaan</span>
          <h1 className="font-display text-[3.4rem] sm:text-7xl md:text-[6rem] leading-[0.92] tracking-tight mt-5 text-balance max-w-4xl">
            Wear the <em className="not-italic text-gold-deep">heritage.</em>
          </h1>
          <p className="mt-6 text-[15px] md:text-base text-ink/60 max-w-md">
            Choose your edit.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/women"
              className="min-w-[190px] rounded-full bg-ink text-ivory px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.28em] hover:bg-gold hover:text-ink transition-colors shadow-soft"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="min-w-[190px] rounded-full bg-gold text-ink px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.28em] hover:bg-ink hover:text-gold transition-colors shadow-soft"
            >
              Shop Men
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink/50">
            <span className="h-px w-8 bg-gold" /> Free worldwide shipping over $75 <span className="h-px w-8 bg-gold" />
          </div>
        </div>
        {/* smooth fade into next section */}
        <div aria-hidden className="h-16 bg-gradient-to-b from-transparent to-ivory" />
      </section>

      {/* BROWSE CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-gold-deep">Explore</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Browse Categories</h2>
          <div className="mt-4 flex justify-center"><span className="divider-gold text-xs">✦</span></div>
        </div>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {categories.map((c) => (
            <Link
              key={c.href}
              to={c.href}
              className="group relative block overflow-hidden rounded-2xl aspect-[4/5] bg-gold-soft"
            >
              <img src={c.img} alt={c.label} className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-center justify-between">
                <span className="text-ivory font-display text-xl md:text-2xl">{c.label}</span>
                <span className="h-8 w-8 rounded-full bg-ivory/95 text-ink flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Per-collection sections */}
      {sections.map((s) => (
        <CollectionSection key={s.key} section={s} />
      ))}

      {/* PREMIUM TRUST SECTION — replaces old guarantee strip */}
      <section className="relative bg-fade-gold-down overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,180,0,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-gold-deep">The Fawzaan Promise</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">
              Made with intention. <em className="not-italic text-gold-deep">Delivered with care.</em>
            </h2>
            <p className="mt-5 text-ink/65 text-[15px]">
              Every piece is sourced at origin, inspected by hand, and packaged like a gift — because heritage deserves nothing less.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: Leaf, title: "Sourced at Origin", sub: "Yemen · Kashmir · Turkey. Traceable to the loom, the hive and the tanner." },
              { icon: Sparkles, title: "Hand-Inspected", sub: "Every piece passes our atelier check before it ships." },
              { icon: Truck, title: "Free Worldwide", sub: "Complimentary express shipping on orders over $75." },
              { icon: ShieldCheck, title: "30-Day Returns", sub: "If it isn't right, send it back. No questions, no fuss." },
            ].map((v) => (
              <div key={v.title} className="relative rounded-2xl bg-ivory/80 backdrop-blur-sm border border-gold/25 p-6 md:p-7 shadow-soft hover:shadow-gold transition-shadow">
                <div className="h-11 w-11 rounded-full bg-gradient-gold text-ink flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">{v.sub}</p>
              </div>
            ))}
          </div>

          {/* Testimonial strip */}
          <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6">
            {[
              { q: "The wrap sits like it was made for me. Worth every rupee.", a: "Yusuf A." },
              { q: "The honey tastes like a Kashmiri summer. Nothing compares.", a: "Amina R." },
              { q: "Packaging alone felt like a gift. My niqab is featherlight.", a: "Layla S." },
            ].map((t) => (
              <figure key={t.a} className="rounded-2xl bg-ivory border border-gold/20 p-6 md:p-7">
                <div aria-hidden className="text-gold text-2xl leading-none">★★★★★</div>
                <blockquote className="mt-3 font-display text-lg text-ink/85 leading-snug">"{t.q}"</blockquote>
                <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">— {t.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL — gold fade closer */}
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
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[52vh] min-h-[360px] md:h-[60vh] bg-gold-soft">
          <img src={section.banner} alt={section.title} className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-95" />
          <div className={`absolute inset-0 ${alignRight ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-ink/60 via-ink/25 to-transparent`} />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className={`text-ivory max-w-md animate-fade-up ${alignRight ? "ml-auto text-right" : ""}`}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">{section.eyebrow}</p>
              <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">{section.title}</h2>
              <p className="mt-4 text-[14px] text-ivory/85 max-w-sm">{section.blurb}</p>
              <Link
                to={section.href}
                className={`mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-gold pb-1 text-gold hover:text-ivory hover:border-ivory transition ${alignRight ? "flex-row-reverse" : ""}`}
              >
                Shop {section.title} <ArrowRight className={`h-3.5 w-3.5 ${alignRight ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </div>

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
    <section aria-label="Join the House" className="relative overflow-hidden bg-fade-gold-down">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,222,128,0.5),transparent_60%)]" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32 text-center text-ink">
        <p className="font-arabic text-4xl md:text-5xl text-gold-deep">فوزان</p>
        <p className="eyebrow mt-4 text-gold-deep">The House Letter</p>
        <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight text-balance">
          Enter the house. <em className="not-italic text-gold-deep">Receive the harvest first.</em>
        </h2>
        <p className="mt-4 text-[14px] text-ink/65 max-w-md mx-auto">
          Quiet dispatches on new looms, single-origin honey harvests, and members-only editions.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-ivory border border-gold/40 px-4 py-3 text-[13px] text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold rounded-full"
          />
          <button
            type="submit"
            className="bg-ink text-ivory px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold hover:text-ink transition rounded-full"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
