import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { Marquee } from "@/components/brand/Marquee";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v4")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Minimal" },
      { name: "description", content: "Less, but better." },
    ],
  }),
  component: V4,
});

const cards = [
  { to: "/shemaghs" as const, name: "Shemaghs", price: "from $48", img: shemagh },
  { to: "/niqabs" as const, name: "Niqabs", price: "from $32", img: niqab },
  { to: "/gloves" as const, name: "Gloves", price: "from $28", img: gloves },
  { to: "/honey" as const, name: "Honey", price: "from $18", img: honey },
];

function V4() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-10 md:pt-20 pb-8 text-center">
        <p className="eyebrow text-gold-deep">New season</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1]">Less, <span className="italic">but better.</span></h1>
        <Link to="/shemaghs" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-7 py-4 text-sm font-semibold hover:bg-ink/85 transition">
          Shop now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <Marquee items={["Free shipping $75+", "30-day returns", "Worldwide", "Crafted with intention"]} />

      <section className="mx-auto max-w-6xl px-5 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {cards.map((c) => (
            <Link key={c.to} to={c.to} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
                <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="font-display text-lg md:text-xl">{c.name}</h3>
                <span className="text-xs text-ink/60">{c.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
