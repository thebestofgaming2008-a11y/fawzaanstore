import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Feather, Shield, Heart, Star } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { TrustBar } from "@/components/brand/TrustBar";
import { StickyBuy } from "@/components/brand/StickyBuy";
import { useCart } from "@/lib/cart";
import hero from "@/assets/hero-niqab.jpg";

export const Route = createFileRoute("/niqabs")({
  head: () => ({
    meta: [
      { title: "Premium Niqabs — Whisper-Soft Modesty | Fawzaan.store" },
      { name: "description", content: "Breathable, opaque niqabs in two-layer chiffon. Stays in place all day. Free worldwide shipping." },
      { property: "og:title", content: "Premium Niqabs — Fawzaan.store" },
      { property: "og:description", content: "Whisper-soft chiffon niqabs that stay put all day." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: NiqabPage,
});

const variants = [
  { id: "half",  name: "Half Niqab", desc: "Single-layer, everyday wear", price: 29 },
  { id: "full",  name: "Full Niqab", desc: "Two-layer chiffon, eye-line cut", price: 39, badge: "Bestseller" },
  { id: "set",   name: "Niqab + Khimar Set", desc: "Matched set, head to waist", price: 59 },
];

function NiqabPage() {
  const { add } = useCart();
  const addVariant = (v: typeof variants[number]) =>
    add({ id: `niqab-${v.id}`, name: v.name, variant: "Black", price: v.price, img: hero });
  const handleFeatured = () => addVariant(variants[1]);

  return (
    <div className="min-h-screen bg-ink text-ivory pb-20 md:pb-0">
      <SiteHeader variant="dark" />

      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img src={hero} alt="Flowing niqab veil" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative w-full px-5 md:px-12 pb-14 md:pb-20 max-w-3xl">
          <p className="eyebrow text-gold animate-fade-up">The Niqab Collection</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Soft as breath.
            <br />
            <span className="italic text-gold">Strong as faith.</span>
          </h1>
          <p className="mt-5 text-ivory/80 text-base md:text-lg max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A two-layer chiffon niqab designed to stay perfectly in place — no slipping,
            no see-through, no compromise.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button onClick={handleFeatured} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink px-8 py-4 font-semibold hover:bg-gold-soft shadow-gold transition">
              <ShoppingBag className="h-4 w-4" /> Shop niqabs — from $29
            </button>
            <div className="flex items-center gap-2 text-sm text-ivory/70">
              <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <span>2,180 five-star reviews</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBar tone="ink" />

      <section className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div className="text-center">
          <p className="eyebrow text-gold">Engineered for daily wear</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">Designed by sisters, for sisters.</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { Icon: Feather, title: "Whisper-soft chiffon", body: "Two breathable layers — opaque coverage that never feels heavy, even in summer heat." },
            { Icon: Shield, title: "Stays where it should", body: "Reinforced nose-bridge stitch and a soft elastic that doesn't pull on your ears." },
            { Icon: Heart, title: "Made to last", body: "Color-fast dye that survives 100+ washes. Won't pill, won't fade, won't quit on you." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-ivory/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-ink to-[#0a0a0a] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center">Three silhouettes.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {variants.map((p) => (
              <article key={p.id} className="relative rounded-sm bg-ink/60 border border-white/10 p-7 hover:border-gold transition group">
                {p.badge && <span className="absolute -top-2 left-7 bg-gold text-ink text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">{p.badge}</span>}
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-ivory/60">{p.desc}</p>
                <div className="mt-6 flex items-end justify-between">
                  <span className="font-display text-3xl text-gold">${p.price}</span>
                  <button onClick={() => addVariant(p)} className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-4 py-2 text-xs font-semibold hover:bg-gold-soft transition">
                    <ShoppingBag className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-28 text-center">
        <p className="font-arabic text-4xl text-gold">”</p>
        <blockquote className="mt-3 font-display text-2xl md:text-3xl leading-snug text-balance">
          The first niqab I've worn that I genuinely forget I'm wearing.
          Light, opaque, and the elastic doesn't bite my ears after an hour.
        </blockquote>
        <p className="mt-5 text-sm text-ivory/60">— Aisha K., verified buyer · Birmingham</p>
      </section>

      <SiteFooter />
      <StickyBuy price="$29" onAdd={handleFeatured} />
    </div>
  );
}
