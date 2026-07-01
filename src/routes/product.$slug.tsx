import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import type { Product } from "@/lib/products";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw, Star, Minus, Plus, Heart, ChevronDown, Check } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { getProduct, related } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) return { meta: [{ title: "Product — Fawzaan.store" }] };
    return {
      meta: [
        { title: `${p.name} — Fawzaan.store` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Fawzaan.store` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <p className="eyebrow text-ink/50">404</p>
        <h1 className="font-display text-4xl mt-2">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-sm underline underline-offset-4">Back home</Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, open: openCart } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.slug);
  const relatedItems = useMemo(() => related(product.slug, 4), [product.slug]);

  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<"details" | "shipping" | "materials" | null>("details");

  const variant = [color, size].filter(Boolean).join(" · ");
  const price = product.price;

  const handleAdd = () => {
    add({
      id: `${product.slug}__${color}__${size}`,
      name: product.name,
      variant,
      price,
      img: product.images[0],
      qty,
    });
    toast.success(`${product.name} added to cart`);
  };
  const handleBuyNow = () => {
    handleAdd();
    setTimeout(() => { window.location.href = "/checkout"; }, 120);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink pb-24 md:pb-0">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-4 md:pt-6">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-ink/50">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/${product.collection}` as string} className="hover:text-ink capitalize">{product.collection}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink/80">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10 grid md:grid-cols-2 gap-8 md:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <img
              key={imgIdx}
              src={product.images[imgIdx]}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover animate-fade-up"
            />
            <button
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => { toggle(product.slug); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-ivory/95 shadow-soft flex items-center justify-center hover:bg-ivory transition"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-red-600 text-red-600" : ""}`} />
            </button>
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-6 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-[4/5] overflow-hidden bg-cream ring-1 transition ${
                    i === imgIdx ? "ring-ink" : "ring-transparent hover:ring-ink/30"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:pt-2">
          <p className="eyebrow text-gold-deep capitalize">{product.collection}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05] text-balance">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex text-gold-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-ink/60">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl">${(price * qty).toFixed(2)}</span>
            {product.compareAt && (
              <>
                <span className="text-ink/40 line-through">${(product.compareAt * qty).toFixed(2)}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] bg-gold-soft/60 text-gold-deep px-2 py-1">
                  Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-ink/70 leading-relaxed max-w-md">{product.short}</p>

          {product.colors && (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-3">Colour · <span className="text-ink">{color}</span></p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={`relative h-9 w-9 rounded-full border transition ${
                      color === c.name ? "border-ink ring-2 ring-ink/10 ring-offset-2" : "border-ink/15 hover:border-ink/50"
                    }`}
                    style={{ backgroundColor: c.swatch ?? "#eee" }}
                  >
                    {color === c.name && (
                      <Check className={`absolute inset-0 m-auto h-4 w-4 ${c.swatch === "#faf6ea" || c.swatch === "#f5f2ea" || c.swatch === "#d8c9a3" ? "text-ink" : "text-ivory"}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 1 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Size · <span className="text-ink">{size}</span></p>
                <Link to="/faq" className="text-[11px] uppercase tracking-[0.22em] text-ink/55 underline underline-offset-2">Size guide</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-w-[64px] px-4 py-2.5 text-xs uppercase tracking-widest border transition ${
                      size === s ? "bg-ink text-ivory border-ink" : "border-ink/15 hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center border border-ink/15">
              <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-gold-deep"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-gold-deep"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] hover:bg-ink/85 transition"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep hover:text-ivory transition"
          >
            Buy it now
          </button>

          <ul className="mt-5 grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/70">
            <li className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-gold-deep" /> Free $75+</li>
            <li className="flex items-center gap-1.5"><RotateCcw className="h-3.5 w-3.5 text-gold-deep" /> 30-day returns</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-gold-deep" /> Secure pay</li>
          </ul>

          {/* Accordion */}
          <div className="mt-8 border-t border-ink/10">
            {[
              { key: "details" as const, label: "Details & fit", body: (
                <ul className="space-y-2 text-sm text-ink/75">
                  {product.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />{f}</li>)}
                </ul>
              ) },
              { key: "materials" as const, label: "Materials & care", body: (
                <div className="text-sm text-ink/75 space-y-2">
                  <p><span className="text-ink">Materials · </span>{product.materials}</p>
                  <p><span className="text-ink">Care · </span>{product.care}</p>
                </div>
              ) },
              { key: "shipping" as const, label: "Shipping & returns", body: (
                <div className="text-sm text-ink/75 space-y-2">
                  <p>Dispatched within 24h. Free worldwide shipping on orders over $75.</p>
                  <p>30-day returns — <Link to="/returns" className="underline">read policy</Link>.</p>
                </div>
              ) },
            ].map((a) => (
              <div key={a.key} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenAcc(openAcc === a.key ? null : a.key)}
                  className="w-full flex items-center justify-between py-4 text-[13px] uppercase tracking-[0.18em]"
                  aria-expanded={openAcc === a.key}
                >
                  {a.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openAcc === a.key ? "rotate-180" : ""}`} />
                </button>
                {openAcc === a.key && <div className="pb-5 animate-fade-up">{a.body}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-3xl md:text-4xl">You may also like</h2>
            <Link to={`/${product.collection}` as string} className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {relatedItems.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}

      <SiteFooter />

      {/* Mobile sticky bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-ivory/95 backdrop-blur px-4 py-3 shadow-elegant">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs text-ink/55 truncate">{variant || product.name}</p>
            <p className="font-display text-lg leading-none mt-0.5">${(price * qty).toFixed(2)}</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-ivory px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] active:scale-[0.99] transition"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
