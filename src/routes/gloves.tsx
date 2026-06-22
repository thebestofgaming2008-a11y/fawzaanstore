import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Star, ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { TrustBar } from "@/components/brand/TrustBar";
import { StickyBuy } from "@/components/brand/StickyBuy";
import { useCart } from "@/lib/cart";
import hero from "@/assets/hero-gloves.jpg";

export const Route = createFileRoute("/gloves")({
  head: () => ({
    meta: [
      { title: "Modest Gloves — Refined Coverage | Fawzaan.store" },
      { name: "description", content: "Lightweight, breathable modest gloves with touchscreen fingertips. Pairs of one, made to outlast." },
      { property: "og:title", content: "Modest Gloves — Fawzaan.store" },
      { property: "og:description", content: "Lightweight gloves with touchscreen fingertips." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: GlovesPage,
});

const sizes = ["S", "M", "L"];
const faqs = [
  { q: "Are they touchscreen-friendly?", a: "Yes — conductive thread on the thumb and index lets you use your phone without taking them off." },
  { q: "What sizes do you carry?", a: "S, M, L. Our size chart is based on UK women's glove sizing — runs true." },
  { q: "Will they shrink in the wash?", a: "Hand wash cold, lay flat. They'll hold their shape for years if treated kindly." },
  { q: "Shipping time?", a: "Dispatched in 24 hours from our UK warehouse. 2–5 days worldwide, tracked." },
];

function GlovesPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const price = 24;
  const handleAdd = () => add({ id: `gloves-${size}`, name: "Bamboo Modest Gloves", variant: `Size ${size}`, price, img: hero, qty });

  return (
    <div className="min-h-screen bg-ivory text-ink pb-20 md:pb-0">
      <SiteHeader />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <span className="inline-block bg-gold/15 text-gold-deep text-xs font-semibold px-3 py-1.5 rounded-full">★ Bestseller · 1,800+ sold</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-balance">
              Coverage that <span className="italic text-gold-deep">disappears</span> on your hands.
            </h1>
            <p className="mt-5 text-ink/70 text-base md:text-lg max-w-lg">
              Featherlight bamboo-blend gloves with touchscreen fingertips. Wear them through
              salah, the school run, and your morning coffee — without ever taking them off.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              {["Touchscreen-compatible thumb & index", "Bamboo-blend, breathable & quick-dry", "Seamless cuff — never digs in", "Machine washable, holds shape"].map((u) => (
                <li key={u} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-deep flex-shrink-0" />
                  <span className="text-ink/80">{u}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="text-xs uppercase tracking-wider text-ink/50 mb-2">Size · {size}</p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 w-11 rounded-full border text-sm font-medium transition ${s === size ? "bg-ink text-ivory border-ink" : "border-border hover:border-gold"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-ink/50 mb-2">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-full bg-ivory">
                <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 hover:text-gold-deep"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="p-2.5 hover:text-gold-deep"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl">${price * qty}</span>
                  <span className="text-ink/40 line-through text-sm">${32 * qty}</span>
                </div>
                <p className="text-xs text-gold-deep mt-0.5">or 2 pairs for $42</p>
              </div>
              <button onClick={handleAdd} className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-7 py-4 font-semibold hover:bg-ink/85 shadow-elegant transition">
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm">
              <div className="flex text-gold-deep">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <span className="text-ink/60">4.8 · 890 reviews</span>
            </div>
          </div>

          <div className="md:col-span-6 order-1 md:order-2">
            <div className="relative rounded-sm overflow-hidden shadow-elegant aspect-[4/5]">
              <img src={hero} alt="Modest black gloves" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="mx-auto max-w-5xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep text-center">Fawzaan vs the rest</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-center">Why these, and not those.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-sm border border-border bg-card p-7">
            <h3 className="font-display text-2xl text-ink/40 line-through">Generic modest gloves</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li>· Synthetic, traps heat</li>
              <li>· Loses shape after 3 washes</li>
              <li>· Can't use your phone</li>
              <li>· Cuff digs in by midday</li>
            </ul>
          </div>
          <div className="rounded-sm border-2 border-gold bg-gradient-to-br from-ivory to-gold-soft/30 p-7 relative shadow-soft">
            <span className="absolute -top-3 left-7 bg-ink text-ivory text-[10px] uppercase tracking-wider px-2 py-1 rounded">Fawzaan</span>
            <h3 className="font-display text-2xl">Our gloves</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✓ Bamboo blend, breathes all day</li>
              <li>✓ Holds shape for 100+ washes</li>
              <li>✓ Touchscreen thumb & index</li>
              <li>✓ Seamless soft cuff</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center">Questions, answered.</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-base md:text-lg">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gold-deep transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="pb-5 text-sm text-ink/70 leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <StickyBuy price={`$${price * qty}`} onAdd={handleAdd} />
    </div>
  );
}
