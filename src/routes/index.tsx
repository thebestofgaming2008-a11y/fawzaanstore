import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { useCatalogProducts } from "@/services/productService";
import { useCurrency } from "@/lib/currency";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";
import shemagh from "@/assets/shemagh-red-head.jpg";
import niqabTile from "@/assets/niqab-khadija-grid.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";
import honeyTile from "@/assets/honey-kashmir-multiflora.jpg";
import kufi from "@/assets/kufi-white-front.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan - Heritage Shemaghs, Niqabs & Sidr Honey" },
      {
        name: "description",
        content:
          "Hand-loomed shemaghs, niqabs, leather gloves and raw Sidr honey. Quietly bold heritage essentials.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<"women" | "men">("women");
  const { format } = useCurrency();
  const { products } = useCatalogProducts();
  const items = products.filter((p) => p.gender === tab || p.gender === "unisex").slice(0, 4);
  const honeyItems = products.filter((p) => p.collection === "honey");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <section className="relative -mt-px w-full overflow-hidden bg-cream">
        <div className="relative h-[86svh] min-h-[620px] md:h-[92svh] md:min-h-[720px]">
          <img
            src={shemagh}
            alt="Heritage Yemeni shemagh, hand-loomed"
            className="absolute inset-0 h-full w-full object-cover object-[center_72%] animate-ken-burns md:object-[center_64%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/18 via-ink/28 to-ink/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(0,0,0,0.34)_100%)]" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-10 md:pt-16">
            <div className="max-w-2xl animate-fade-up text-center text-ivory">
              <p className="shimmer-gold text-[11px] font-semibold uppercase tracking-[0.4em] md:text-[12px]">
                New Collection
              </p>
              <div className="mt-3 flex justify-center" aria-hidden>
                <svg viewBox="0 0 120 12" className="h-3 w-28 text-gold" fill="currentColor">
                  <path
                    d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <circle cx="60" cy="6" r="1.6" />
                </svg>
              </div>
              <h1 className="font-display mt-3 text-6xl uppercase leading-[0.95] tracking-[0.08em] text-ivory drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl">
                Heritage
              </h1>

              <div className="relative mt-8 inline-flex items-stretch overflow-hidden border border-ivory/80 bg-ivory shadow-elegant">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20"
                />
                <Link
                  to="/women"
                  className="relative px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-all hover:bg-gold hover:text-ink md:px-12"
                >
                  Women
                </Link>
                <Link
                  to="/men"
                  className="relative bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory transition-all hover:bg-gold hover:text-ink md:px-12"
                >
                  Men
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Our Best Sellers</p>
          <div className="mt-5 inline-flex items-center gap-8">
            {(["women", "men"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`font-display pb-1 text-3xl capitalize transition md:text-4xl ${
                  tab === k ? "border-b-2 border-gold-deep text-ink" : "text-ink/40 hover:text-ink"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {items.map((p, i) => (
            <ProductCard key={p.slug} p={p} priority={i < 2} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={tab === "women" ? "/women" : "/men"}
            className="inline-flex items-center bg-ink px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-gold-deep"
          >
            All {tab === "women" ? "Women" : "Men"}
          </Link>
        </div>
      </section>

      <section className="relative w-full overflow-hidden">
        <div className="relative h-[64vh] min-h-[440px]">
          <img src={honey} alt="Raw Sidr honey" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 md:px-8">
            <div className="max-w-md animate-fade-up text-ivory">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Harvest</p>
              <h2 className="font-display mt-4 text-4xl leading-tight md:text-5xl">
                Raw Sidr honey,
                <br />
                straight from the hive.
              </h2>
              <p className="mt-4 max-w-sm text-[14px] text-ivory/80">
                Unfiltered, unheated and traceable to a single highland origin.
              </p>
              <Link
                to="/honey"
                className="mt-7 inline-flex items-center gap-2 border-b border-ivory pb-1 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold"
              >
                Shop honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-4 pt-12 md:px-8 md:pt-16">
          <h3 className="font-display text-2xl text-ink md:text-3xl">Shop honey</h3>
          <Link to="/honey" className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">
            View all &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <ul className="mx-auto flex max-w-7xl gap-3 px-4 py-8 md:gap-4 md:px-8">
            {honeyItems.map((p) => (
              <li key={p.slug} className="snap-start shrink-0 w-[62vw] sm:w-56 md:w-64">
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Shop by Collection</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Explore the House</h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] text-ink/60">
            Five quietly considered collections - choose your entry point.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          <CollectionTile to="/shemaghs" name="Shemaghs" img={shemagh} eyebrow="Signature" className="col-span-2 aspect-[4/5] md:col-span-3 md:h-[420px] md:aspect-auto" size="lg" />
          <CollectionTile to="/niqabs" name="Niqabs" img={niqabTile} eyebrow="For Her" className="col-span-2 aspect-[4/5] md:col-span-3 md:h-[420px] md:aspect-auto" size="lg" />
          <CollectionTile to="/honey" name="Honey" img={honeyTile} className="col-span-2 aspect-square md:col-span-2 md:h-[340px] md:aspect-auto" size="sm" />
          <CollectionTile to="/gloves" name="Gloves" img={gloves} className="col-span-1 aspect-square md:col-span-2 md:h-[340px] md:aspect-auto" size="sm" />
          <CollectionTile to="/kufis" name="Kufis" img={kufi} className="col-span-1 aspect-square md:col-span-2 md:h-[340px] md:aspect-auto" size="sm" />
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
          <ul className="grid grid-cols-2 divide-x divide-ink/10 md:grid-cols-4">
            {[
              { icon: Truck, label: "Free shipping", sub: `On orders over ${format(FREE_SHIP_THRESHOLD)}` },
              { icon: RotateCcw, label: "30-day returns", sub: "Easy & no questions" },
              { icon: ShieldCheck, label: "Authentic", sub: "Sourced at origin" },
              { icon: Lock, label: "Secure checkout", sub: "Encrypted payments" },
            ].map((v) => (
              <li key={v.label} className="flex items-center justify-center gap-3 px-3 py-4 text-center md:py-2 md:text-left">
                <v.icon className="h-5 w-5 shrink-0 text-gold-deep" />
                <div>
                  <p className="text-[12px] uppercase leading-tight tracking-[0.18em] text-ink">{v.label}</p>
                  <p className="mt-0.5 text-[11px] text-ink/55">{v.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function CollectionTile({
  to,
  name,
  img,
  eyebrow,
  className,
  size,
}: {
  to: string;
  name: string;
  img: string;
  eyebrow?: string;
  className: string;
  size: "lg" | "sm";
}) {
  return (
    <Link to={to} className={`group relative overflow-hidden bg-cream ${className}`}>
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div
        className={`absolute ${size === "lg" ? "bottom-5 left-5 right-5" : "bottom-4 left-4 right-4"} text-ivory transition-transform duration-500 group-hover:-translate-y-1`}
      >
        {eyebrow && <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/80">{eyebrow}</p>}
        <h3 className={`font-display ${size === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} mt-1`}>
          {name}
        </h3>
        <span className="mt-2 inline-flex items-center gap-2 border-b border-ivory pb-0.5 text-[11px] uppercase tracking-[0.22em]">
          Shop <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
