import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Star, ShoppingBag, Truck } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { TrustBar } from "@/components/brand/TrustBar";
import { StickyBuy } from "@/components/brand/StickyBuy";
import { useCart } from "@/lib/cart";
import hero from "@/assets/hero-shemagh.jpg";

export const Route = createFileRoute("/shemaghs")({
  head: () => ({
    meta: [
      { title: "Premium Shemaghs — Authentic Keffiyeh | Fawzaan Store" },
      { name: "description", content: "Hand-woven shemaghs in heritage patterns. 100% cotton, fringed by hand. Ships worldwide in 48 hours." },
      { property: "og:title", content: "Premium Shemaghs — Fawzaan Store" },
      { property: "og:description", content: "Hand-woven keffiyeh in heritage patterns. 100% cotton." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: ShemaghPage,
});

const colors = ["Classic B&W", "Desert Sand", "Ink Black", "Olive", "Bordeaux"];
const reviews = [
  { name: "Yusuf A.", text: "Heaviest cotton I've found online. Drapes beautifully — feels handmade.", stars: 5 },
  { name: "Hamza R.", text: "Pattern is crisp, fringe is even, shipping was 3 days. Buying another.", stars: 5 },
  { name: "Idris M.", text: "Looks twice the price. The black is a proper deep black, not faded grey.", stars: 5 },
];

function ShemaghPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink pb-20 md:pb-0">
      <SiteHeader />

      {/* EDITORIAL HERO — split */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-square md:aspect-auto md:min-h-[640px] order-1">
          <img src={hero} alt="Hand-woven shemagh" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute top-4 left-4 bg-ivory/95 text-ink text-xs px-3 py-1.5 rounded-full font-medium shadow-soft">
            New · Winter weave
          </span>
        </div>
        <div className="flex flex-col justify-center px-5 md:px-12 lg:px-16 py-10 md:py-16 bg-gradient-cream">
          <p className="eyebrow text-gold-deep">The Shemagh Collection</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            The keffiyeh, <span className="italic text-gold-deep">honest as ever.</span>
          </h1>
          <p className="mt-5 text-ink/70 text-base md:text-lg max-w-lg">
            Hand-loomed in 100% combed cotton. Tight herringbone weave, knotted tassels,
            and a generous 130×130 cm cut that wraps without slipping.
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <div className="flex text-gold-deep">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <span className="text-ink/60">4.9 · 1,240 reviews</span>
          </div>

          <div className="mt-7">
            <p className="text-xs uppercase tracking-wider text-ink/50 mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <button key={c} className={`px-3 py-1.5 text-xs rounded-full border ${i === 0 ? "bg-ink text-ivory border-ink" : "border-border hover:border-gold"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-4xl">$39</span>
            <span className="text-ink/40 line-through">$56</span>
            <span className="text-xs bg-gold-soft/60 text-gold-deep px-2 py-1 rounded">Save 30%</span>
          </div>

          <button className="mt-6 hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ivory px-8 py-4 font-semibold hover:bg-ink/85 shadow-elegant transition">
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>

          <div className="mt-5 flex items-center gap-2 text-xs text-ink/60">
            <Truck className="h-4 w-4 text-gold-deep" /> Free shipping on orders over $75 · Dispatched in 24h
          </div>
        </div>
      </section>

      <TrustBar tone="ink" />

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep text-center">Why it's different</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl text-center text-balance">A scarf, made the old way.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "Heritage weave", body: "Loomed by third-generation weavers using a traditional jacquard pattern that holds its shape wash after wash." },
            { title: "Honest cotton", body: "100% long-staple combed cotton. Breathable in summer, warm enough for winter desert nights." },
            { title: "Hand-knotted fringe", body: "Every tassel tied by hand — uneven on purpose, even when machine-imitations try." },
          ].map((f) => (
            <article key={f.title} className="rounded-sm border border-border bg-card p-7 hover:border-gold transition">
              <Check className="h-5 w-5 text-gold-deep" />
              <h3 className="mt-4 font-display text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center">
            <p className="eyebrow text-gold-deep">Real reviews</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Worn by 12,000+ customers.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-sm bg-ivory p-6 shadow-soft border border-border">
                <div className="flex text-gold-deep">{Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">"{r.text}"</blockquote>
                <figcaption className="mt-4 text-xs font-medium text-ink/60">— {r.name}, verified buyer</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-ink text-ivory py-20 md:py-28 text-center px-5">
        <p className="eyebrow text-gold">Limited winter run</p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">Wear it once, you'll understand.</h2>
        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-ink px-8 py-4 font-semibold hover:bg-gold-soft shadow-gold transition">
          Shop the shemagh — $39 <ShoppingBag className="h-4 w-4" />
        </button>
      </section>

      <SiteFooter />
      <StickyBuy price="$39" />
    </div>
  );
}
