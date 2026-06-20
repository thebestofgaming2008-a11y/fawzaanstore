import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v3")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Bento" },
      { name: "description", content: "Four edits, one house." },
    ],
  }),
  component: V3,
});

function V3() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-4 grid-rows-[auto_auto_auto] md:grid-rows-2 gap-3 md:gap-4 md:h-[85vh]">
          {/* Brand tile */}
          <div className="col-span-4 md:col-span-2 md:row-span-1 rounded-2xl bg-ink text-ivory p-8 md:p-12 flex flex-col justify-between min-h-[240px]">
            <img src={logo.url} alt="" className="h-14 w-14 rounded-full" />
            <div>
              <p className="font-arabic text-2xl text-gold">فوزان</p>
              <h1 className="mt-2 font-display text-4xl md:text-6xl leading-tight">Heritage,<br /><span className="italic text-gold">curated.</span></h1>
            </div>
          </div>

          <Link to="/shemaghs" className="col-span-2 md:col-span-2 md:row-span-1 group relative rounded-2xl overflow-hidden min-h-[200px]">
            <img src={shemagh} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-ivory">
              <h3 className="font-display text-2xl md:text-4xl">Shemaghs</h3>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>

          <Link to="/niqabs" className="col-span-2 md:col-span-1 group relative rounded-2xl overflow-hidden min-h-[200px]">
            <img src={niqab} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <h3 className="absolute bottom-4 left-4 font-display text-2xl text-ivory">Niqabs</h3>
          </Link>

          <Link to="/gloves" className="col-span-2 md:col-span-1 group relative rounded-2xl overflow-hidden min-h-[200px]">
            <img src={gloves} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <h3 className="absolute bottom-4 left-4 font-display text-2xl text-ivory">Gloves</h3>
          </Link>

          <Link to="/honey" className="col-span-4 md:col-span-2 group relative rounded-2xl overflow-hidden min-h-[200px]">
            <img src={honey} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-ivory">
              <h3 className="font-display text-2xl md:text-4xl italic">Raw Honey</h3>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
