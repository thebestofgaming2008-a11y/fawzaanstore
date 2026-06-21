import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductRail } from "@/components/brand/ProductRail";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Cinematic" },
      { name: "description", content: "Heritage essentials, cinematically presented." },
    ],
  }),
  component: V2,
});

const tiles = [
  { to: "/shemaghs" as const, name: "Shemaghs", img: shemagh },
  { to: "/niqabs" as const, name: "Niqabs", img: niqab },
  { to: "/gloves" as const, name: "Gloves", img: gloves },
  { to: "/honey" as const, name: "Honey", img: honey },
];

function V2() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Full-bleed cinematic hero — light theme */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={shemagh}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Light gold-to-ivory overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/10 to-ivory" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-ivory/20 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl h-full px-5 md:px-8 flex flex-col justify-end pb-14 md:pb-20">
          <p className="eyebrow text-gold-deep">Heritage Essentials</p>
          <h1 className="mt-3 font-display text-6xl sm:text-7xl md:text-[8rem] leading-[0.9] italic text-ink text-balance max-w-4xl">
            Quietly bold.
          </h1>
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

      {/* 4 category tiles — gold-tint hover */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-20 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/90 via-ivory/10 to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 font-display text-xl md:text-2xl text-ink">
                {t.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Product rail */}
      <ProductRail heading="Featured" />

      {/* Trust strip */}
      <section className="bg-cream border-y border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 grid grid-cols-3 gap-4 text-center">
          {["Free shipping $75+", "30-day returns", "Secure checkout"].map((t) => (
            <p key={t} className="eyebrow text-ink/70">
              <span className="text-gold-deep mr-1">✦</span> {t}
            </p>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
