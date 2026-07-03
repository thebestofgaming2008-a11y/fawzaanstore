import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import {
  ShoppingBag, Truck, ShieldCheck, RotateCcw, Star, Minus, Plus, Heart,
  ChevronDown, Check, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { catalog, getProduct, related } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCurrency } from "@/lib/currency";
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
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { format } = useCurrency();
  const wished = has(product.slug);
  const relatedItems = useMemo(() => related(product.slug, 4), [product.slug]);

  // Cross-collection upsell — "Complete your ritual"
  const complementary = useMemo(() => {
    return catalog
      .filter((p) => p.slug !== product.slug && p.collection !== product.collection)
      .slice(0, 3);
  }, [product.slug]);

  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<"details" | "shipping" | "materials" | null>("details");
  const [addLoading, setAddLoading] = useState(false);
  const [bundlePicks, setBundlePicks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(complementary.slice(0, 1).map((p) => [p.slug, true])),
  );

  // Reset gallery when product changes
  useEffect(() => {
    setImgIdx(0);
    setColor(product.colors?.[0]?.name ?? "");
    setSize(product.sizes?.[0] ?? "");
    setQty(1);
  }, [product.slug]);

  // Sticky bar reveal — only after primary CTA scrolls out of view
  const primaryCtaRef = useRef<HTMLDivElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const el = primaryCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [product.slug]);

  const variant = [color, size].filter(Boolean).join(" · ");
  const price = product.price;

  const handleAdd = (opts?: { silent?: boolean }) => {
    setAddLoading(true);
    add({
      id: `${product.slug}__${color}__${size}`,
      name: product.name,
      variant,
      price,
      img: product.images[0],
      qty,
    });
    // Add bundle picks
    complementary.forEach((p) => {
      if (bundlePicks[p.slug]) {
        add({ id: p.slug, name: p.name, price: p.price, img: p.images[0] });
      }
    });
    if (!opts?.silent) toast.success(`${product.name} added to cart`);
    setTimeout(() => setAddLoading(false), 500);
  };

  const handleBuyNow = () => {
    handleAdd({ silent: true });
    setTimeout(() => { window.location.href = "/checkout"; }, 120);
  };

  const bundleTotal =
    product.price + complementary.reduce((s, p) => s + (bundlePicks[p.slug] ? p.price : 0), 0);
  const bundleCompareTotal =
    (product.compareAt ?? product.price) +
    complementary.reduce((s, p) => s + (bundlePicks[p.slug] ? (p.compareAt ?? p.price) : 0), 0);

  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);
  const prevImg = () => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-5 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.24em] text-ink/45">
          <Link to="/" className="hover:text-ink transition">Home</Link>
          <span className="mx-2 text-ink/25">/</span>
          <Link to={`/${product.collection}` as string} className="hover:text-ink capitalize transition">{product.collection}</Link>
          <span className="mx-2 text-ink/25">/</span>
          <span className="text-ink/70">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pt-4 pb-10 md:py-10 grid md:grid-cols-2 gap-6 md:gap-16">
        {/* ============ Gallery ============ */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream group">
            <img
              key={imgIdx}
              src={product.images[imgIdx]}
              alt={`${product.name} — view ${imgIdx + 1}`}
              className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            />

            {/* Prev / Next — desktop */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  aria-label="Previous image"
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-ivory/85 backdrop-blur text-ink opacity-0 group-hover:opacity-100 hover:bg-ivory transition shadow-soft"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImg}
                  aria-label="Next image"
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-ivory/85 backdrop-blur text-ink opacity-0 group-hover:opacity-100 hover:bg-ivory transition shadow-soft"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.tag && (
                <span className="bg-ivory/95 text-ink text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 shadow-soft">
                  {product.tag}
                </span>
              )}
              {product.compareAt && (
                <span className="bg-ink text-ivory text-[10px] uppercase tracking-[0.22em] px-2.5 py-1">
                  -{Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              onClick={() => { toggle(product.slug); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-ivory/95 backdrop-blur shadow-soft flex items-center justify-center hover:scale-105 active:scale-95 transition"
            >
              <Heart className={`h-4 w-4 transition ${wished ? "fill-red-600 text-red-600" : ""}`} />
            </button>

            {/* Mobile dot indicators */}
            {product.images.length > 1 && (
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-ivory/80 backdrop-blur px-2.5 py-1.5 rounded-full">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-ink" : "w-1.5 bg-ink/25"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails — desktop only */}
          {product.images.length > 1 && (
            <div className="hidden md:grid mt-3 grid-cols-6 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-[4/5] overflow-hidden bg-cream ring-1 transition-all ${
                    i === imgIdx ? "ring-ink ring-2" : "ring-transparent hover:ring-ink/40"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ============ Details ============ */}
        <div className="md:pt-1">
          <p className="eyebrow text-gold-deep capitalize">{product.collection}</p>
          <h1 className="mt-2.5 font-display text-[2rem] md:text-5xl leading-[1.05] text-balance">
            {product.name}
          </h1>

          {/* Rating */}
          <button
            onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-3 flex items-center gap-2 text-sm text-ink/70 hover:text-ink transition"
          >
            <div className="flex text-gold-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="underline underline-offset-4 decoration-ink/20 hover:decoration-ink">
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </button>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl md:text-[2.25rem] leading-none">{format(price * qty)}</span>
            {product.compareAt && (
              <>
                <span className="text-ink/40 line-through text-lg">{format(product.compareAt * qty)}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] bg-gold-soft/70 text-gold-deep px-2 py-1">
                  Save {format((product.compareAt - product.price) * qty)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-ink/50">
            Taxes included · Shipping calculated at checkout
          </p>

          {/* Short pitch */}
          <p className="mt-5 text-ink/75 leading-relaxed text-[15px] max-w-md">{product.short}</p>

          {/* Colour */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-3">
                Colour · <span className="text-ink">{color}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={`relative h-10 w-10 rounded-full border transition-all ${
                      color === c.name
                        ? "border-ink ring-2 ring-ink/15 ring-offset-2 ring-offset-ivory scale-105"
                        : "border-ink/15 hover:border-ink/60 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.swatch ?? "#eee" }}
                  >
                    {color === c.name && (
                      <Check className={`absolute inset-0 m-auto h-4 w-4 ${
                        c.swatch === "#faf6ea" || c.swatch === "#f5f2ea" || c.swatch === "#d8c9a3" || c.swatch === "#FFFFFF"
                          ? "text-ink" : "text-ivory"
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
                  Size · <span className="text-ink">{size}</span>
                </p>
                <Link to="/faq" className="text-[11px] uppercase tracking-[0.22em] text-ink/55 underline underline-offset-2 hover:text-ink transition">
                  Size guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-w-[64px] px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] border transition-all ${
                      size === s
                        ? "bg-ink text-ivory border-ink"
                        : "border-ink/15 hover:border-ink hover:bg-cream/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Primary CTA */}
          <div ref={primaryCtaRef} className="mt-7 space-y-2.5">
            <div className="flex items-stretch gap-2.5">
              <div className="inline-flex items-center border border-ink/15 bg-ivory">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3.5 hover:text-gold-deep transition disabled:opacity-30"
                  disabled={qty <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="p-3.5 hover:text-gold-deep transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => handleAdd()}
                disabled={addLoading}
                className="flex-1 relative overflow-hidden inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] hover:bg-ink/85 active:scale-[0.99] transition disabled:opacity-70"
              >
                {addLoading ? (
                  <>
                    <Check className="h-4 w-4 animate-scale-in" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to cart · {format(price * qty)}
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] hover:bg-gold-deep hover:text-ivory active:scale-[0.99] transition"
            >
              Buy it now
            </button>
          </div>

          {/* Trust bar */}
          <ul className="mt-6 grid grid-cols-3 gap-2 py-4 border-y border-ink/10 text-[10px] uppercase tracking-[0.18em] text-ink/65">
            <li className="flex flex-col items-center text-center gap-1.5">
              <Truck className="h-4 w-4 text-gold-deep" />
              <span>Free over ₹2,000</span>
            </li>
            <li className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-gold-deep" />
              <span>30-day returns</span>
            </li>
            <li className="flex flex-col items-center text-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold-deep" />
              <span>Secure checkout</span>
            </li>
          </ul>

          {/* ============ Complete your ritual — upsell ============ */}
          {complementary.length > 0 && (
            <div className="mt-8 border border-ink/10 bg-cream/40 p-4 md:p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-gold-deep" />
                <p className="text-[11px] uppercase tracking-[0.24em]">Complete your ritual</p>
              </div>
              <ul className="space-y-3">
                {[
                  { slug: product.slug, name: product.name, price: product.price, compareAt: product.compareAt, img: product.images[0], base: true },
                  ...complementary.map((c) => ({ slug: c.slug, name: c.name, price: c.price, compareAt: c.compareAt, img: c.images[0], base: false })),
                ].map((item) => {
                  const isBase = item.base;
                  const checked = isBase ? true : !!bundlePicks[item.slug];
                  return (
                    <li key={item.slug} className="flex items-center gap-3">
                      <button
                        onClick={() => !isBase && setBundlePicks((b) => ({ ...b, [item.slug]: !b[item.slug] }))}
                        aria-pressed={checked}
                        disabled={isBase}
                        className={`h-5 w-5 shrink-0 border flex items-center justify-center transition ${
                          checked ? "bg-ink border-ink text-ivory" : "border-ink/25 hover:border-ink"
                        } ${isBase ? "opacity-90" : ""}`}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </button>
                      <img src={item.img} alt="" className="h-14 w-12 object-cover bg-ivory shrink-0" />
                      <div className="min-w-0 flex-1">
                        {isBase ? (
                          <p className="text-[13px] leading-tight truncate">
                            <span className="text-ink/50">This item · </span>{item.name}
                          </p>
                        ) : (
                          <Link
                            to="/product/$slug"
                            params={{ slug: item.slug }}
                            className="text-[13px] leading-tight truncate hover:text-gold-deep transition block"
                          >
                            {item.name}
                          </Link>
                        )}
                        <div className="mt-0.5 flex items-baseline gap-1.5">
                          <p className="text-[12px] text-ink/70">{format(item.price)}</p>
                          {item.compareAt && (
                            <p className="text-[11px] text-ink/35 line-through">{format(item.compareAt)}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Bundle total</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <p className="font-display text-xl">{format(bundleTotal)}</p>
                    {bundleCompareTotal > bundleTotal && (
                      <p className="text-xs text-ink/40 line-through">{format(bundleCompareTotal)}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd()}
                  className="text-[10px] uppercase tracking-[0.22em] bg-ink text-ivory px-4 py-2.5 hover:bg-gold-deep transition"
                >
                  Add bundle
                </button>
              </div>
            </div>
          )}

          {/* Accordion */}
          <div className="mt-8 border-t border-ink/10">
            {[
              {
                key: "details" as const,
                label: "Details & fit",
                body: (
                  <ul className="space-y-2.5 text-[14px] text-ink/75 leading-relaxed">
                    <li className="text-ink">{product.description}</li>
                    {product.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: "materials" as const,
                label: "Materials & care",
                body: (
                  <div className="text-[14px] text-ink/75 space-y-2.5 leading-relaxed">
                    <p><span className="text-ink font-medium">Materials · </span>{product.materials}</p>
                    <p><span className="text-ink font-medium">Care · </span>{product.care}</p>
                  </div>
                ),
              },
              {
                key: "shipping" as const,
                label: "Shipping & returns",
                body: (
                  <div className="text-[14px] text-ink/75 space-y-2.5 leading-relaxed">
                    <p>Dispatched within 24 hours from our atelier. Free shipping on orders over ₹2,000.</p>
                    <p>30-day returns on unworn items — <Link to="/returns" className="underline underline-offset-2">read the policy</Link>.</p>
                  </div>
                ),
              },
            ].map((a) => (
              <div key={a.key} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenAcc(openAcc === a.key ? null : a.key)}
                  className="w-full flex items-center justify-between py-4 text-[12px] uppercase tracking-[0.24em] hover:text-gold-deep transition"
                  aria-expanded={openAcc === a.key}
                >
                  {a.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openAcc === a.key ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${openAcc === a.key ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-5">{a.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Reviews teaser ============ */}
      <section id="reviews" className="border-t border-ink/10 bg-cream/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow text-gold-deep">Reviews</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">What customers are saying</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex text-gold-deep">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-ink/60">{product.rating}/5 · {product.reviews.toLocaleString()} reviews</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Yusuf R.", city: "London", body: "Quality is exceptional — the weight and drape feel true to tradition. Shipped fast to the UK.", stars: 5 },
              { name: "Amina K.", city: "Toronto", body: "Beautifully finished. Sits softly and holds shape all day. Will be ordering more colours.", stars: 5 },
              { name: "Faisal M.", city: "Dubai", body: "Honest craft. Colour is deep and true to the photos. Recommended for anyone serious about quality.", stars: 4 },
            ].map((r, i) => (
              <article key={i} className="bg-ivory border border-ink/10 p-5 md:p-6 hover:shadow-soft transition">
                <div className="flex text-gold-deep mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-3.5 w-3.5 ${j < r.stars ? "fill-current" : ""}`} />
                  ))}
                </div>
                <p className="text-[14px] leading-relaxed text-ink/80">"{r.body}"</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">{r.name} · {r.city}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Related ============ */}
      {relatedItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow text-gold-deep">You may also like</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">More from the collection</h2>
            </div>
            <Link
              to={`/${product.collection}` as string}
              className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink transition hidden md:inline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {relatedItems.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}

      <SiteFooter />

      {/* ============ Mobile sticky buy — reveals after primary CTA scrolls out ============ */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-ivory/95 backdrop-blur-md shadow-elegant transition-all duration-300 ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <img src={product.images[imgIdx]} alt="" className="h-11 w-10 object-cover bg-cream shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium truncate leading-tight">{product.name}</p>
            <p className="text-[11px] text-ink/55 truncate leading-tight">
              {variant || "Choose options"} · <span className="text-ink">{format(price * qty)}</span>
            </p>
          </div>
          <button
            onClick={() => handleAdd()}
            aria-label="Add to cart"
            disabled={addLoading}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-ink text-ivory px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] rounded-full active:scale-95 hover:bg-gold-deep transition disabled:opacity-70"
          >
            {addLoading ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {addLoading ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
