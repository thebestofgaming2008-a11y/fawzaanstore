import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import shemagh from "@/assets/hero-shemagh.jpg";
import niqab from "@/assets/hero-niqab.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Cinematic" },
      { name: "description", content: "Heritage essentials." },
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
    <div className="min-h-screen bg-ink text-ivory">
      <SiteHeader variant="dark" />
      <section className="relative h-[92vh] overflow-hidden">
        <img src={niqab} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-arabic text-3xl text-gold">فوزان</p>
          <h1 className="mt-6 font-display text-6xl md:text-9xl leading-none italic shimmer-gold">Fawzaan</h1>
          <p className="mt-4 eyebrow text-ivory/70">Heritage · Essentials</p>
          <Link to="/shemaghs" className="mt-10 rounded-full bg-gold text-ink px-8 py-4 text-sm font-semibold tracking-wide hover:bg-gold-soft shadow-elegant transition">
            Explore
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="group relative aspect-square overflow-hidden">
            <img src={t.img} alt="" className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/10 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-2xl md:text-4xl">{t.name}</span>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </div>
  );
}
