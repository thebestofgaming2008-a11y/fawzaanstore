import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock, Star } from "lucide-react";
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
      { title: "Fawzaan Store — Shemaghs, Niqabs, Gloves & Pure Sidr Honey" },
      { name: "description", content: "Heritage essentials, quietly bold. Hand-loomed shemaghs, niqabs, leather gloves and raw Sidr honey." },
    ],
  }),
  component: Home,
});

const collections = [
  { to: "/shemaghs" as const, name: "Shemaghs", count: "12 styles", img: shemagh },
  { to: "/niqabs" as const, name: "Niqabs", count: "9 styles", img: niqab },
  { to: "/gloves" as const, name: "Gloves", count: "6 styles", img: gloves },
  { to: "/honey" as const, name: "Sidr Honey", count: "3 grades", img: honey },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — full bleed, single product focus, Shopify-style */}
      <section className="relative w-full overflow-hidden bg-cream">
        <div className="relative h-[78vh] min-h-[540px] md:h-[86vh]">
          <img
            src={shemagh}
            alt="Hand-loomed shemagh draped on a studio mannequin"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent md:bg-gradient-to-r md:from-ink/55 md:via-ink/15 md:to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl h-full px-5 md:px-8 flex flex-col justify-end pb-12 md:pb-20">
            <p className="eyebrow text-gold-soft">New Arrivals · Winter Weave</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-ivory max-w-3xl">
              Heritage,<br/>quietly woven.
            </h1>
            <div className="mt-7 flex items-center gap-3">
              <Link
                to="/shemaghs"
                className="inline-flex items-center justify-center rounded-none bg-ivory text-ink px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] hover:bg-gold transition"
              >
                Shop the collection
              </Link>
              <Link
                to="/honey"
                className="hidden sm:inline-flex items-center gap-1.5 text-ivory text-[13px] font-semibold uppercase tracking-[0.18em] border-b border-ivory/60 pb-0.5 hover:text-gold hover:border-gold"
              >
                New honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value bar — Shopify classic */}
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
          {[
            { Icon: Truck, t: "Free shipping", s: "On orders $75+" },
            { Icon: RotateCcw, t: "Easy returns", s: "30 days, no questions" },
            { Icon: ShieldCheck, t: "Authentic", s: "Sourced direct" },
            { Icon: Lock, t: "Secure checkout", s: "256-bit SSL" },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-gold-deep shrink-0" />
              <div className="leading-tight">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink">{t}</p>
                <p className="text-[11px] text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections — Shop by category */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-24 pb-4">
        <div className="text-center mb-8 md:mb-12">
          <p className="eyebrow text-gold-deep">Our Edit</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Shop by collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {collections.map((c) => (
            <Link key={c.to} to={c.to} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/65 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-ivory">
                  <p className="font-display text-2xl md:text-3xl leading-tight">{c.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/80 mt-1">{c.count}</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-ink/70 inline-flex items-center gap-1 group-hover:text-gold-deep">
                Shop now <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <ProductRail heading="Featured pieces" />

      {/* Editorial split — story */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
            <img src={niqab} alt="Niqab styling, studio shot" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <p className="eyebrow text-gold-deep">Our craft</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Made slowly,<br/>worn for years.
            </h2>
            <p className="mt-5 text-lg text-ink/75 max-w-md">
              Every piece is loomed, stitched and inspected in small batches. No mass production — just patient hands and honest materials.
            </p>
            <Link
              to="/shemaghs"
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink border-b border-ink pb-1 hover:text-gold-deep hover:border-gold-deep"
            >
              Discover the craft <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews — Shopify-style social proof */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}
          </div>
          <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-ink/70">Rated 4.9 · 1,200+ reviews</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { q: "The shemagh quality is unreal. Heavy, soft, drapes perfectly.", a: "Yusuf A.", p: "Classic Shemagh" },
            { q: "Best niqab I've owned. Breathable and the stitching is flawless.", a: "Maryam K.", p: "Premium Niqab" },
            { q: "This honey tastes like the ones my grandmother brought from Yemen.", a: "Ahmed S.", p: "Raw Sidr Honey" },
          ].map((r) => (
            <figure key={r.a} className="border border-border p-6 bg-ivory">
              <div className="flex gap-0.5 text-gold mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold" />)}
              </div>
              <blockquote className="font-display text-xl leading-snug text-ink">"{r.q}"</blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-wider text-ink/60">
                {r.a} · <span className="text-gold-deep">{r.p}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-20 text-center">
          <p className="eyebrow text-gold">Join the list</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Early access, no noise.</h2>
          <p className="mt-3 text-ivory/70">New drops, restocks and the occasional 10% off — straight to your inbox.</p>
          <form className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-ivory/30 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold"
            />
            <button className="bg-gold text-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] hover:bg-ivory transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
