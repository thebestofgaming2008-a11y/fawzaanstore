import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductRail } from "@/components/brand/ProductRail";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan.store — Shemaghs, Niqabs, Gloves & Pure Sidr Honey" },
      { name: "description", content: "Heritage essentials, quietly bold. Hand-loomed shemaghs, whisper-soft niqabs, leather gloves and raw Sidr honey." },
    ],
  }),
  component: Home,
});

const tiles = [
  { to: "/shemaghs" as const, name: "Shemaghs", from: "$39", img: shemagh },
  { to: "/niqabs"   as const, name: "Niqabs",   from: "$29", img: niqab },
  { to: "/gloves"   as const, name: "Gloves",   from: "$48", img: gloves },
  { to: "/honey"    as const, name: "Honey",    from: "$28", img: honey },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Cinematic hero — light themed in brand gold */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={shemagh}
          alt="Hand-loomed shemagh on mannequin"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-ivory/10 to-ivory" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/80 via-ivory/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl h-full px-5 md:px-8 flex flex-col justify-end pb-14 md:pb-20">
          <p className="eyebrow text-gold-deep">Heritage Essentials</p>
          <h1 className="mt-3 font-display text-6xl sm:text-7xl md:text-[8rem] leading-[0.9] italic text-ink text-balance max-w-4xl">
            Quietly bold.
          </h1>
          <p className="mt-4 max-w-md text-ink/70 text-base md:text-lg">
            Loomed by hand. Worn for life.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <Link
              to="/shemaghs"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-7 py-3.5 text-sm font-semibold hover:bg-ink/85 transition shadow-soft"
            >
              Shop the edit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/honey" className="text-sm font-semibold text-ink underline underline-offset-4 decoration-gold">
              New honey
            </Link>
          </div>
        </div>
      </section>

      {/* 4 category tiles — Shopify-style with price-from */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-20 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/90 via-ivory/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <span className="font-display text-xl md:text-2xl text-ink leading-none">{t.name}</span>
                <span className="text-xs font-semibold text-gold-deep">from {t.from}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Product rail with quick-add */}
      <ProductRail heading="Featured" />

      {/* Trust strip */}
      <section className="bg-cream border-y border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Truck, t: "Free shipping $75+" },
            { Icon: RotateCcw, t: "30-day returns" },
            { Icon: ShieldCheck, t: "Authentic guarantee" },
            { Icon: Lock, t: "Secure checkout" },
          ].map(({ Icon, t }) => (
            <div key={t} className="flex items-center gap-2 justify-center md:justify-start">
              <Icon className="h-4 w-4 text-gold-deep" />
              <p className="eyebrow text-ink/70">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
