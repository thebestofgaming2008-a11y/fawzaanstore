import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { TrustBar } from "@/components/brand/TrustBar";
import { Marquee } from "@/components/brand/Marquee";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan Store — Heritage Essentials for the Modern Muslim" },
      { name: "description", content: "Discover Fawzaan Store's curated collections: shemaghs, niqabs, modest gloves and raw honey. Crafted with intention, delivered worldwide." },
      { property: "og:title", content: "Fawzaan Store" },
      { property: "og:description", content: "Heritage essentials — shemaghs, niqabs, gloves and pure honey." },
    ],
  }),
  component: Home,
});

const collections = [
  { to: "/shemaghs" as const, name: "Shemaghs", tagline: "Woven heritage", img: shemagh, count: "12 styles" },
  { to: "/niqabs" as const, name: "Niqabs", tagline: "Whisper-soft modesty", img: niqab, count: "8 styles" },
  { to: "/gloves" as const, name: "Gloves", tagline: "Quiet refinement", img: gloves, count: "6 pairs" },
  { to: "/honey" as const, name: "Pure Honey", tagline: "Raw & unfiltered", img: honey, count: "3 jars" },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-cream">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-24 pb-16 md:pb-28 text-center">
          <img src={logo.url} alt="Fawzaan" width={120} height={120} className="mx-auto h-24 w-24 md:h-32 md:w-32 rounded-full shadow-elegant animate-fade-up" />
          <p className="mt-8 divider-gold eyebrow animate-fade-up" style={{ animationDelay: "0.1s" }}>Est. heritage · Worldwide</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Heritage essentials,
            <br />
            <span className="italic shimmer-gold">woven with intention.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-ink/70 text-balance animate-fade-up" style={{ animationDelay: "0.25s" }}>
            Fawzaan Store crafts the everyday essentials of the modern Muslim — shemaghs, niqabs,
            modest gloves and pure honey — each piece chosen for its quiet, lasting quality.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <Link to="/shemaghs" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ivory px-7 py-4 text-sm font-semibold tracking-wide hover:bg-ink/85 shadow-elegant transition">
              Shop the collections <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/honey" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-sm font-semibold hover:border-gold hover:text-gold-deep transition">
              <Sparkles className="h-4 w-4" /> Try our honey
            </Link>
          </div>
        </div>
      </section>

      <Marquee items={["Free worldwide shipping over $75", "Loved by 12,000+ customers", "Crafted with intention", "30-day returns", "Authentic heritage"]} />

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-28">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="eyebrow text-gold-deep">Collections</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Four edits. One philosophy.</h2>
          </div>
          <p className="hidden md:block max-w-sm text-sm text-ink/60 text-right">
            Every piece is selected to last — beyond a season, beyond a trend.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative overflow-hidden rounded-sm bg-cream aspect-[3/4] shadow-soft hover:shadow-elegant transition-all"
            >
              <img
                src={c.img}
                alt={c.name}
                loading={i > 1 ? "lazy" : undefined}
                width={800}
                height={1067}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-ivory">
                <p className="eyebrow text-gold">{c.tagline}</p>
                <div className="mt-1 flex items-end justify-between">
                  <h3 className="font-display text-2xl md:text-3xl">{c.name}</h3>
                  <span className="text-xs text-ivory/70">{c.count}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold-soft group-hover:gap-3 transition-all">
                  Discover <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TrustBar />

      {/* BRAND STORY */}
      <section className="mx-auto max-w-4xl px-5 md:px-8 py-20 md:py-28 text-center">
        <p className="font-arabic text-3xl md:text-4xl text-gold-deep">فوزان</p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl text-balance">
          A small house, a singular standard.
        </h2>
        <p className="mt-6 text-ink/70 leading-relaxed text-base md:text-lg text-balance">
          Fawzaan began with a simple frustration — finding everyday essentials that felt
          considered. From the keffiyeh on your shoulder to the honey on your spoon, we work
          directly with weavers, makers and beekeepers who care about the details we do.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
