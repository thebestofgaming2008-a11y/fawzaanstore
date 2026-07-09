import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
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
import { getProductBySlug } from "@/services/productService";
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
  loader: async ({ params }) => {
    const p = await getProductBySlug(params.slug);
    if (!p) throw notFound();
    return { product: p };
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
  const { product } = Route.useLoaderData() as { product: Product };
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
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImgIdx(0);
    setColor(product.colors?.[0]?.name ?? "");
    setSize(product.sizes?.[0] ?? "");
    setQty(1);
  }, [product.slug]);

  const variant = [color, size].filter(Boolean).join(" · ");
  const price = product.price;

  const handleAdd = () => {
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
    toast.success(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);
  const prevImg = () => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* ============ Sticky Buy Bar — pinned directly under header, always visible ============ */}
      <div className="sticky top-[57px] md:top-[73px] z-30 bg-ivory/95 backdrop-blur-md border-b border-ink/10 shadow-soft animate-fade-in">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-2.5 md:py-3 flex items-center gap-3">
          <img
            src={product.images[imgIdx]}
            alt=""
            className="h-11 w-10 md:h-12 md:w-11 object-cover bg-cream shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] md:text-sm font-medium truncate leading-tight">
              {product.name}
            </p>
            <p className="text-[11px] text-ink/55 truncate leading-tight tabular-nums">
              <span className="text-ink font-semibold">{format(price * qty)}</span>
              {product.compareAt && (
                <span className="ml-1.5 line-through text-ink/35">
                  {format(product.compareAt * qty)}
                </span>
              )}
              {variant && <span className="ml-1.5">· {variant}</span>}
            </p>
          </div>
          <button
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            onClick={() => {
              toggle(product.slug);
              toast(wished ? "Removed from wishlist" : "Saved to wishlist");
            }}
            className="shrink-0 h-10 w-10 rounded-full border border-ink/15 flex items-center justify-center hover:border-ink transition"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-red-600 text-red-600" : ""}`} />
          </button>
          <button
            onClick={handleAdd}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-ink text-ivory px-5 md:px-7 py-2.5 md:py-3 text-[11px] font-semibold uppercase tracking-[0.22em] rounded-full active:scale-95 hover:bg-gold-deep transition"
          >
            {added ? (
              <Check className="h-4 w-4 animate-scale-in" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{added ? "Added" : "Add to cart"}</span>
            <span className="sm:hidden">{added ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-5 md:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.24em] text-ink/45"
        >
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

      <section className="mx-auto max-w-7xl px-4 md:px-8 pt-4 pb-14 md:py-12 grid md:grid-cols-2 gap-8 md:gap-16">
        {/* ============ Gallery ============ */}
        <div className="md:sticky md:top-40 md:self-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream group">
            <img
              key={imgIdx}
              src={product.images[imgIdx]}
              alt={`${product.name} — view ${imgIdx + 1}`}
              className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-ivory/85 backdrop-blur text-ink md:opacity-0 md:group-hover:opacity-100 hover:bg-ivory transition shadow-soft"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImg}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-ivory/85 backdrop-blur text-ink md:opacity-0 md:group-hover:opacity-100 hover:bg-ivory transition shadow-soft"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

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

            {product.images.length > 1 && (
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-ivory/85 backdrop-blur px-2.5 py-1.5 rounded-full">
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

          {product.images.length > 1 && (
            <div className="hidden md:grid mt-3 grid-cols-5 gap-2">
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

        {/* ============ Details — minimal, size + info only ============ */}
        <div className="md:pt-1">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-deep">
            {product.collection}
          </p>
          <h1 className="mt-3 font-display text-[2rem] md:text-5xl leading-[1.05] text-balance">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-ink/65">
            <div className="flex text-gold-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <span className="text-[12px]">
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl md:text-[2.25rem] leading-none">
              {format(price * qty)}
            </span>
            {product.compareAt && (
              <>
                <span className="text-ink/40 line-through text-lg">
                  {format(product.compareAt * qty)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] bg-gold-soft/70 text-gold-deep px-2 py-1">
                  Save {format((product.compareAt - product.price) * qty)}
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/50">
            Taxes included · Shipping calculated at checkout
          </p>

          <p className="mt-5 text-ink/75 leading-relaxed text-[15px] max-w-md">{product.short}</p>

          {/* Colour */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-8">
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
                      <Check
                        className={`absolute inset-0 m-auto h-4 w-4 ${
                          c.swatch === "#faf6ea" || c.swatch === "#f5f2ea"
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
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
                  Size · <span className="text-ink">{size}</span>
                </p>
                {product.sizes.length > 1 && (
                  <Link
                    to="/faq"
                    className="text-[11px] uppercase tracking-[0.22em] text-ink/55 underline underline-offset-2 hover:text-ink transition"
                  >
                    Size guide
                  </Link>
                )}
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

          {/* Quantity */}
          <div className="mt-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-3">Quantity</p>
            <div className="inline-flex items-center border border-ink/15 bg-ivory">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3.5 hover:text-gold-deep transition disabled:opacity-30"
                disabled={qty <= 1}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-12 text-center text-sm font-medium tabular-nums">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="p-3.5 hover:text-gold-deep transition"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Trust bar */}
          <ul className="mt-8 grid grid-cols-3 gap-2 py-4 border-y border-ink/10 text-[10px] uppercase tracking-[0.18em] text-ink/65">
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

          {/* Accordion — details, materials, shipping */}
          <div className="mt-6">
            {[
              {
                key: "details" as const,
                label: "Details & fit",
                body: (
                  <ul className="space-y-2.5 text-[14px] text-ink/75 leading-relaxed">
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
                  <div className="text-[14px] text-ink/75 space-y-2.5 leading-relaxed">
                    <p>
                      <span className="text-ink font-medium">Materials · </span>
                      {product.materials}
                    </p>
                    <p>
                      <span className="text-ink font-medium">Care · </span>
                      {product.care}
                    </p>
                  </div>
                ),
              },
              {
                key: "shipping" as const,
                label: "Shipping & returns",
                body: (
                  <div className="text-[14px] text-ink/75 space-y-2.5 leading-relaxed">
                    <p>Dispatched within 24 hours. Free shipping on orders over ₹2,000.</p>
                    <p>
                      30-day returns on unworn items —{" "}
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
                  className="w-full flex items-center justify-between py-4 text-[12px] uppercase tracking-[0.24em] hover:text-gold-deep transition"
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

      {/* Related */}
      {relatedItems.length > 0 && (
        <section className="border-t border-ink/10 mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold-deep">
                You may also like
              </p>
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
            {relatedItems.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
