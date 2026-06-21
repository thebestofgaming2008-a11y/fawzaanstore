import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Truck, ShieldCheck } from "lucide-react";
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
      { title: "Fawzaan Store — Heritage Essentials" },
      { name: "description", content: "Shemaghs, niqabs, gloves & raw honey. Crafted with intention." },
      { property: "og:title", content: "Fawzaan Store" },
      { property: "og:description", content: "Heritage essentials, crafted with intention." },
    ],
  }),
  component: Home,
});

const categories = [
  { to: "/shemaghs" as const, name: "Shemaghs", img: shemagh },
  { to: "/niqabs" as const, name: "Niqabs", img: niqab },
  { to: "/gloves" as const, name: "Gloves", img: gloves },
  { to: "/honey" as const, name: "Honey", img: honey },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Hero — instant-buy product card */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-6 md:pt-12 pb-10 md:pb-14">
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-start">
          {/* Image */}
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm bg-cream">
            <img src={shemagh} alt="Classic Shemagh" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute top-3 left-3 bg-ivory text-ink eyebrow px-2.5 py-1 rounded-sm shadow-soft">
              Bestseller
            </span>
          </div>

          {/* Buy panel */}
          <div className="md:pt-4">
            <p className="eyebrow text-gold-deep">Shemagh · Cream / Gold</p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl leading-[1] text-balance">
              Classic Shemagh
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <p className="text-2xl font-semibold text-ink">$48</p>
              <p className="text-sm text-muted-foreground line-through">$60</p>
              <span className="eyebrow text-gold-deep">20% off</span>
            </div>

            {/* Color swatches */}
            <div className="mt-6">
              <p className="eyebrow mb-2">Color</p>
              <div className="flex gap-2">
                {[
                  { c: "bg-cream border-border", label: "Cream" },
                  { c: "bg-gold border-gold-deep", label: "Gold" },
                  { c: "bg-ink border-ink", label: "Ink" },
                ].map((s, i) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    className={`h-9 w-9 rounded-full border ${s.c} ${i === 0 ? "ring-2 ring-offset-2 ring-ink" : ""}`}
                  />
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/shemaghs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ivory px-6 py-4 text-sm font-semibold hover:bg-ink/85 transition"
              >
                Add to cart — $48
              </Link>
              <Link
                to="/shemaghs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink px-6 py-4 text-sm font-semibold hover:bg-gold-soft transition"
              >
                Buy it now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mini trust */}
            <ul className="mt-5 space-y-1.5 text-sm text-ink/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold-deep" /> In stock — ships today</li>
              <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold-deep" /> Free shipping over $75</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold-deep" /> 30-day returns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Browse more */}
      <ProductRail heading="Also browse" />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">Collections</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((c) => (
            <Link key={c.to} to={c.to} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 font-display text-xl md:text-2xl text-ivory">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
