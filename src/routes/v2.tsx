import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductRail } from "@/components/brand/ProductRail";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Showcase" },
      { name: "description", content: "Heritage essentials." },
    ],
  }),
  component: V2,
});

const cats = [
  { to: "/shemaghs" as const, name: "Shemaghs", img: shemagh },
  { to: "/niqabs" as const, name: "Niqabs", img: niqab },
  { to: "/gloves" as const, name: "Gloves", img: gloves },
  { to: "/honey" as const, name: "Honey", img: honey },
];

function V2() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Centered light hero */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 md:px-8 pt-12 md:pt-20 pb-8 text-center">
          <img src={logo.url} alt="" className="mx-auto h-16 w-16 rounded-full bg-ivory shadow-soft" />
          <p className="mt-6 font-arabic text-2xl text-gold-deep">فوزان</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] italic text-balance">
            Fawzaan
          </h1>
          <p className="mt-4 eyebrow text-gold-deep">Heritage · Essentials</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/shemaghs"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-7 py-3.5 text-sm font-semibold hover:bg-ink/85 transition shadow-soft"
            >
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Featured large image with gold corner */}
        <div className="mx-auto max-w-5xl px-5 md:px-8 pb-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-cream">
            <img src={niqab} alt="Featured" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5 md:p-8 flex items-end justify-between">
              <div>
                <p className="eyebrow text-gold">New</p>
                <h3 className="font-display text-2xl md:text-4xl text-ivory">The Niqab Edit</h3>
              </div>
              <Link to="/niqabs" className="rounded-full bg-gold text-ink px-5 py-2.5 text-sm font-semibold hover:bg-gold-soft transition">
                Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product rail */}
      <ProductRail heading="Featured" />

      {/* Category strip — horizontal scroll on mobile */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
          <h2 className="font-display text-3xl md:text-4xl mb-6">Shop by category</h2>
          <div className="overflow-x-auto scrollbar-hide -mx-5 md:mx-0">
            <ul className="flex gap-3 md:gap-5 px-5 md:px-0">
              {cats.map((c) => (
                <li key={c.to} className="shrink-0 w-[42vw] sm:w-56 md:flex-1">
                  <Link to={c.to} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-full bg-ivory">
                      <img
                        src={c.img}
                        alt={c.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <p className="mt-3 text-center text-sm font-medium">{c.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-ivory border-y border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 grid grid-cols-3 gap-4 text-center">
          {["Free shipping $75+", "30-day returns", "Secure checkout"].map((t) => (
            <p key={t} className="eyebrow text-ink/70">
              <span className="text-gold mr-1">✦</span> {t}
            </p>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
