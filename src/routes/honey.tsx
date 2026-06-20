import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Star, Leaf, Award, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { TrustBar } from "@/components/brand/TrustBar";
import { StickyBuy } from "@/components/brand/StickyBuy";
import hero from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/honey")({
  head: () => ({
    meta: [
      { title: "Raw Sidr Honey — Unfiltered & Pure | Fawzaan Store" },
      { name: "description", content: "Single-origin raw honey from highland beekeepers. Unheated, unfiltered, lab-tested pure. Free shipping over $75." },
      { property: "og:title", content: "Raw Honey — Fawzaan Store" },
      { property: "og:description", content: "Single-origin raw honey, unheated & unfiltered." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: HoneyPage,
});

function HoneyPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink pb-20 md:pb-0">
      <SiteHeader />

      {/* BENTO HERO */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="grid grid-cols-6 grid-rows-[auto_auto] md:grid-rows-2 gap-3 md:gap-4 md:h-[640px]">
          {/* main image */}
          <div className="col-span-6 md:col-span-4 row-span-2 relative rounded-sm overflow-hidden bg-cream aspect-[4/3] md:aspect-auto">
            <img src={hero} alt="Raw honey with honeycomb" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 bg-gradient-to-t from-ink/85 to-transparent text-ivory">
              <p className="eyebrow text-gold">Pure Honey · Single origin</p>
              <h1 className="mt-2 font-display text-4xl md:text-6xl lg:text-7xl leading-[1] text-balance">
                Honey, the way <em className="text-gold">the bees made it.</em>
              </h1>
            </div>
          </div>

          {/* Highlight 1 */}
          <div className="col-span-3 md:col-span-2 rounded-sm bg-gradient-to-br from-gold-soft/60 to-gold/30 p-5 md:p-7 flex flex-col justify-between min-h-[180px]">
            <Leaf className="h-6 w-6 text-gold-deep" />
            <div>
              <h3 className="font-display text-xl md:text-2xl leading-tight">Raw & unheated</h3>
              <p className="mt-1 text-xs md:text-sm text-ink/70">Never above 35°C — enzymes intact.</p>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="col-span-3 md:col-span-2 rounded-sm bg-ink text-ivory p-5 md:p-7 flex flex-col justify-between min-h-[180px]">
            <Award className="h-6 w-6 text-gold" />
            <div>
              <h3 className="font-display text-xl md:text-2xl leading-tight">Lab-tested pure</h3>
              <p className="mt-1 text-xs md:text-sm text-ivory/70">Zero added sugar. C4 verified.</p>
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-ink/60">From highland apiaries, in your kitchen in 3 days.</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex text-gold-deep">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <span className="text-sm text-ink/70">4.9 · 640 reviews</span>
            </div>
          </div>
          <button className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ivory px-7 py-4 font-semibold hover:bg-ink/85 shadow-elegant transition">
            <ShoppingBag className="h-4 w-4" /> Shop honey — from $18
          </button>
        </div>
      </section>

      <TrustBar />

      {/* JARS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-gold-deep">The collection</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">Three jars. Three altitudes.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { name: "Wildflower Honey", origin: "Anatolian plateau", size: "350g", price: "$18" },
            { name: "Sidr Honey", origin: "Yemeni highlands", size: "250g", price: "$54", badge: "Rare" },
            { name: "Black Seed Honey", origin: "Atlas mountains", size: "300g", price: "$32" },
          ].map((j) => (
            <article key={j.name} className="group relative rounded-sm border border-border bg-card p-7 hover:border-gold hover:shadow-soft transition">
              {j.badge && <span className="absolute top-5 right-5 bg-ink text-gold text-[10px] uppercase tracking-wider px-2 py-1 rounded">{j.badge}</span>}
              <div className="aspect-square rounded-sm bg-gradient-to-br from-gold-soft/40 to-gold/20 flex items-center justify-center text-7xl">
                🍯
              </div>
              <h3 className="mt-5 font-display text-2xl">{j.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-ink/60"><MapPin className="h-3 w-3" /> {j.origin} · {j.size}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-2xl text-gold-deep">{j.price}</span>
                <button className="rounded-full bg-ink text-ivory px-4 py-2 text-xs font-semibold hover:bg-ink/85 transition">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="bg-gradient-to-b from-cream to-ivory py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <p className="font-arabic text-3xl text-gold-deep">عسل</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-balance">
            From the hive to your jar — nothing in between.
          </h2>
          <p className="mt-5 text-ink/70 leading-relaxed text-base md:text-lg">
            We work directly with three families of beekeepers across the Anatolian plateau,
            the Yemeni highlands and the Moroccan Atlas. No middlemen. No blending. No heat.
            Just raw, single-origin honey jarred within days of harvest.
          </p>
        </div>
      </section>

      <SiteFooter />
      <StickyBuy price="$18" />
    </div>
  );
}
