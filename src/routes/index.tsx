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

      {/* Hero — editorial split, light theme */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-8 md:pt-14 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="order-2 md:order-1">
            <img src={logo.url} alt="" className="h-14 w-14 rounded-full bg-ivory shadow-soft" />
            <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-balance">
              Quietly <span className="italic text-gold-deep">made.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-md">
              Heritage essentials for everyday wear.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link
                to="/shemaghs"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-6 py-3.5 text-sm font-semibold hover:bg-ink/85 transition"
              >
                Shop now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/honey" className="text-sm font-medium underline underline-offset-4 decoration-gold">
                New honey
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-sm bg-cream">
            <img src={shemagh} alt="Featured shemagh" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute top-4 left-4 bg-ivory text-ink eyebrow px-2.5 py-1 rounded-sm shadow-soft">
              Bestseller
            </span>
          </div>
        </div>
      </section>

      {/* Product rail */}
      <ProductRail heading="Shop the drop" />

      {/* Categories — 4 tiles */}
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
