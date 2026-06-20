import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Landing Directions" },
      { name: "description", content: "Four landing page directions." },
    ],
  }),
  component: Hub,
});

const variants = [
  { to: "/v1" as const, label: "Editorial", note: "Split + index list", img: shemagh },
  { to: "/v2" as const, label: "Cinematic", note: "Dark, full-bleed", img: niqab },
  { to: "/v3" as const, label: "Bento", note: "Grid composition", img: gloves },
  { to: "/v4" as const, label: "Minimal", note: "Product-first", img: honey },
];

function Hub() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-10 md:pt-16 pb-6 text-center">
        <img src={logo.url} alt="" className="mx-auto h-16 w-16 rounded-full shadow-soft" />
        <p className="mt-6 eyebrow text-gold-deep">Pick a direction</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight">Four landings.<br /><span className="italic">One brand.</span></h1>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {variants.map((v, i) => (
            <Link key={v.to} to={v.to} className="group relative aspect-[4/3] overflow-hidden rounded-sm">
              <img src={v.img} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-ivory flex items-end justify-between">
                <div>
                  <p className="eyebrow text-gold">0{i + 1} · {v.note}</p>
                  <h3 className="mt-1 font-display text-3xl md:text-5xl">{v.label}</h3>
                </div>
                <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8 group-hover:rotate-45 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
