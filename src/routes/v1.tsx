import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v1")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Editorial" },
      { name: "description", content: "Heritage essentials. Quietly made." },
    ],
  }),
  component: V1,
});

const items = [
  { to: "/shemaghs" as const, name: "Shemagh", img: shemagh, no: "01" },
  { to: "/niqabs" as const, name: "Niqab", img: niqab, no: "02" },
  { to: "/gloves" as const, name: "Gloves", img: gloves, no: "03" },
  { to: "/honey" as const, name: "Honey", img: honey, no: "04" },
];

function V1() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="grid md:grid-cols-2 min-h-[88vh]">
        <div className="flex flex-col justify-between p-8 md:p-16 order-2 md:order-1">
          <p className="eyebrow text-gold-deep">Fawzaan — 2026</p>
          <div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
              Quietly<br /><span className="italic">made.</span>
            </h1>
            <Link to="/shemaghs" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold border-b border-ink pb-1 hover:gap-3 transition-all">
              Enter shop <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="font-arabic text-2xl text-gold-deep">فوزان</p>
        </div>
        <div className="relative order-1 md:order-2 min-h-[50vh]">
          <img src={shemagh} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-t border-ink/10">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="group grid grid-cols-[60px_1fr_auto] md:grid-cols-[100px_1fr_200px_auto] items-center gap-4 md:gap-8 px-5 md:px-16 py-6 md:py-8 border-b border-ink/10 hover:bg-cream transition-colors">
            <span className="font-display text-xl md:text-2xl text-gold-deep">{it.no}</span>
            <span className="font-display text-3xl md:text-5xl">{it.name}</span>
            <img src={it.img} alt="" className="hidden md:block h-20 w-full object-cover rounded-sm" />
            <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7 group-hover:rotate-45 transition-transform" />
          </Link>
        ))}
      </section>
      <SiteFooter />
    </div>
  );
}
