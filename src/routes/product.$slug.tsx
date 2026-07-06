import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Heart,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { getProduct, related } from "@/lib/products";
import { getProductBySlug, useCatalogProduct } from "@/services/productService";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCurrency } from "@/lib/currency";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) return { meta: [{ title: "Product - Fawzaan.store" }] };
    return {
      meta: [
        { title: `${p.name} - Fawzaan.store` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} - Fawzaan.store` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  loader: async ({ params }) => {
    const product = getProduct(params.slug) ?? (await getProductBySlug(params.slug));
    if (!product) throw notFound();
    return { product, slug: params.slug };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <p className="eyebrow text-ink/50">404</p>
        <h1 className="font-display text-4xl mt-2">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-sm underline underline-offset-4">
          Back home
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: initialProduct, slug } = Route.useLoaderData() as {
    product: Product;
    slug: string;
  };
  const product = useCatalogProduct(slug, initialProduct) ?? initialProduct;
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { format } = useCurrency();
  const wished = has(product.slug);
  const relatedItems = useMemo(() => related(product.slug, 4), [product.slug]);

  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<"details" | "shipping" | "materials" | null>("details");
  const [addLoading, setAddLoading] = useState(false);

  // Reset gallery when product changes
  useEffect(() => {
    setImgIdx(0);
    setColor(product.colors?.[0]?.name ?? "");
    setSize(product.sizes?.[0] ?? "");
    setQty(1);
  }, [product.colors, product.sizes, product.slug]);

  // Sticky bar reveal - only after primary CTA scrolls out of view
  const primaryCtaRef = useRef<HTMLDivElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const el = primaryCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [product.slug]);

  const variant = [color, size].filter(Boolean).join(" / ");
  const price = product.price;

  const handleAdd = (opts?: { silent?: boolean }) => {
    setAddLoading(true);
    add({
      id: `${product.slug}__${color}__${size}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variant,
      price,
      img: product.images[0],
      qty,
    });
    if (!opts?.silent) toast.success(`${product.name} added to cart`);
    setTimeout(() => setAddLoading(false), 500);
  };

  const handleBuyNow = () => {
    handleAdd({ silent: true });
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 120);
  };

  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);
  const prevImg = () => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-5 md:pt-8">
        <nav aria-label="Breadcrumb" className="font-sans-ui text-xs font-medium text-ink/60">
          <Link to="/" className="hover:text-ink transition">
            Home
          </Link>
          <span className="mx-2 text-ink/25">/</span>
          <Link
            to={`/${product.collection}` as string}
            className="hover:text-ink capitalize transition"
          >
            {product.collection}
          </Link>
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
              alt={`${product.name} - view ${imgIdx + 1}`}
              className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            />

            {/* Prev / Next - desktop */}
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
                <span className="bg-ivory/92 text-ink text-[10px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 shadow-soft">
                  {product.tag}
                </span>
              )}
              {product.compareAt && (
                <span className="bg-gold/92 text-ink text-[10px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5">
                  Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              onClick={() => {
                toggle(product.slug);
                toast(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-ivory/95 backdrop-blur shadow-soft flex items-center justify-center hover:scale-105 active:scale-95 transition"
            >
              <Heart
                className={`h-4 w-4 transition ${wished ? "fill-red-600 text-red-600" : ""}`}
              />
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

          {/* Thumbnails - desktop only */}
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
        <div className="md:pt-1 font-sans-ui">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/65 capitalize">
            {product.collection}
          </p>
          <h1 className="mt-2.5 max-w-xl text-3xl font-semibold leading-tight text-ink text-balance md:text-5xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold leading-none text-ink md:text-4xl">
              {format(price * qty)}
            </span>
            {product.compareAt && (
              <>
                <span className="text-lg font-medium text-ink/50 line-through">
                  {format(product.compareAt * qty)}
                </span>
                <span className="text-xs font-semibold bg-gold-soft/70 text-ink px-2.5 py-1">
                  Save {format((product.compareAt - product.price) * qty)}
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-sm text-ink/55">
            India shipping included. International shipping confirmed on WhatsApp.
          </p>

          {/* Short pitch */}
          <p className="mt-6 max-w-xl border-y border-ink/10 py-5 text-base leading-7 text-ink/76">
            {product.short}
          </p>

          {/* Colour */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-ink">
                Colour / <span className="text-ink">{color}</span>
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
                      <Check
                        className={`absolute inset-0 m-auto h-4 w-4 ${
                          c.swatch === "#faf6ea" ||
                          c.swatch === "#f5f2ea" ||
                          c.swatch === "#d8c9a3" ||
                          c.swatch === "#FFFFFF"
                            ? "text-ink"
                            : "text-ivory"
                        }`}
                      />
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
                <p className="text-sm font-semibold text-ink">
                  Size / <span className="text-ink">{size}</span>
                </p>
                <Link
                  to="/faq"
                  className="text-sm font-medium text-ink/60 underline underline-offset-2 hover:text-ink transition"
                >
                  Size guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-w-[64px] px-4 py-2.5 text-sm font-semibold border transition-all ${
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
                className="flex-1 relative overflow-hidden inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 text-sm font-semibold hover:bg-ink/85 active:scale-[0.99] transition disabled:opacity-70"
              >
                {addLoading ? (
                  <>
                    <Check className="h-4 w-4 animate-scale-in" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to cart / {format(price * qty)}
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full inline-flex items-center justify-center gap-2 border border-ink/20 bg-ivory text-ink px-6 py-4 text-sm font-semibold hover:border-ink hover:bg-cream active:scale-[0.99] transition"
            >
              Buy it now
            </button>
          </div>

          {/* Trust bar */}
          <ul className="mt-6 grid grid-cols-3 gap-2 py-4 border-y border-ink/10 text-xs font-medium leading-snug text-ink/70">
            <li className="flex flex-col items-center text-center gap-1.5">
              <Truck className="h-4 w-4 text-gold-deep" />
              <span>Free over {format(FREE_SHIP_THRESHOLD)}</span>
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

          {/* Accordion */}
          <div className="mt-8 border-t border-ink/10">
            {[
              {
                key: "details" as const,
                label: "Details & fit",
                body: (
                  <ul className="space-y-2.5 text-base text-ink/80 leading-7">
                    <li className="text-ink">{product.description}</li>
                    {product.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: "materials" as const,
                label: "Materials & care",
                body: (
                  <div className="text-base text-ink/80 space-y-2.5 leading-7">
                    <p>
                      <span className="text-ink font-medium">Materials / </span>
                      {product.materials}
                    </p>
                    <p>
                      <span className="text-ink font-medium">Care / </span>
                      {product.care}
                    </p>
                  </div>
                ),
              },
              {
                key: "shipping" as const,
                label: "Shipping & returns",
                body: (
                  <div className="text-base text-ink/80 space-y-2.5 leading-7">
                    <p>
                      Dispatched within 24 hours from our atelier. Free shipping on orders over{" "}
                      {format(FREE_SHIP_THRESHOLD)}.
                    </p>
                    <p>
                      30-day returns on unworn items -{" "}
                      <Link to="/returns" className="underline underline-offset-2">
                        read the policy
                      </Link>
                      .
                    </p>
                  </div>
                ),
              },
            ].map((a) => (
              <div key={a.key} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenAcc(openAcc === a.key ? null : a.key)}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-ink hover:text-ink/70 transition"
                  aria-expanded={openAcc === a.key}
                >
                  {a.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${openAcc === a.key ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${openAcc === a.key ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5">{a.body}</div>
                  </div>
                </div>
              </div>
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
              <h2 className="mt-2 font-sans-ui text-2xl font-semibold md:text-3xl">More from the collection</h2>
            </div>
            <Link
              to={`/${product.collection}` as string}
              className="hidden text-sm font-semibold text-ink/65 hover:text-ink transition md:inline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {relatedItems.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />

      {/* ============ Mobile sticky buy - reveals after primary CTA scrolls out ============ */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-ivory/95 backdrop-blur-md shadow-elegant transition-all duration-300 ${
          showStickyBar
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <img
            src={product.images[imgIdx]}
            alt=""
            className="h-11 w-10 object-cover bg-cream shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate leading-tight">{product.name}</p>
            <p className="text-xs font-medium text-ink/65 truncate leading-tight">
              {variant || "Choose options"} /{" "}
              <span className="text-ink">{format(price * qty)}</span>
            </p>
          </div>
          <button
            onClick={() => handleAdd()}
            aria-label="Add to cart"
            disabled={addLoading}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-ink text-ivory px-5 py-3 text-sm font-semibold rounded-full active:scale-95 hover:bg-gold-deep transition disabled:opacity-70"
          >
            {addLoading ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {addLoading ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
