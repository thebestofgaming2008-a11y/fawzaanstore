import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, PackageCheck, RotateCcw, Truck } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { useCatalogProducts } from "@/services/productService";
import logoUrl from "@/assets/fawzaan-logo-mark.png";
import shemaghHero from "@/assets/shemagh-red-head.jpg";
import shemaghFlat from "@/assets/shemagh-red-flat.jpg";
import niqabHero from "@/assets/niqab-khadija-grid2.jpg";
import glovesHero from "@/assets/hero-gloves.jpg";
import honeyHero from "@/assets/hero-honey.jpg";
import honeyJar from "@/assets/honey-kashmir-multiflora.jpg";
import kufiHero from "@/assets/kufi-white-front.jpg";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan Store | Heritage essentials" },
      {
        name: "description",
        content: "A minimal premium store for shemaghs, niqabs, kufis, gloves and Kashmir honey.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { products } = useCatalogProducts();
  const heroProducts = products
    .filter((p) => p.tag === "Bestseller" || p.compareAt || p.tag === "Limited")
    .slice(0, 4);
  const newProducts = products.filter((p) => p.tag === "New").slice(0, 4);
  const honeyProducts = products.filter((p) => p.collection === "honey").slice(0, 3);
  const productEdit = heroProducts.length ? heroProducts : products.slice(0, 4);
  const arrivals = newProducts.length ? newProducts : products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="relative bg-black text-white">
        <div className="grid min-h-[calc(100svh-112px)] md:grid-cols-2">
          <CampaignPanel
            to="/women"
            image={niqabHero}
            eyebrow="For women"
            title="Niqabs"
            cta="Shop women"
          />
          <CampaignPanel
            to="/men"
            image={shemaghHero}
            eyebrow="For men"
            title="Shemaghs"
            cta="Shop men"
            imageClassName="object-[center_top]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-1/2 z-10 -translate-y-1/2 md:inset-x-0">
          <div className="mx-auto flex max-w-[20rem] flex-col items-center bg-white/92 px-7 py-8 text-center text-black shadow-elegant backdrop-blur md:max-w-[24rem] md:px-10 md:py-10">
            <img src={logoUrl} alt="Fawzaan Store" className="h-14 w-auto md:h-20" />
            <p className="mt-5 font-sans-ui text-[10px] font-semibold uppercase tracking-[0.34em] text-black/58">
              Heritage essentials
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.9] md:text-6xl">
              The daily edit.
            </h1>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {[
            { label: "Shemaghs", to: "/shemaghs" },
            { label: "Niqabs", to: "/niqabs" },
            { label: "Kufis", to: "/kufis" },
            { label: "Honey", to: "/honey" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center justify-between py-5 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.28em] text-black transition hover:text-gold md:px-6"
            >
              {item.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:px-8 md:py-20">
        <SectionHeader eyebrow="Shop the edit" title="Selected now" to="/search" />

        {productEdit.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {productEdit.map((product, index) => (
              <ProductCard key={product.slug} p={product} priority={index < 2} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/12 md:grid-cols-4">
          <EditorialTile
            to="/shemaghs"
            image={shemaghFlat}
            label="Shemaghs"
            className="md:col-span-2 md:row-span-2"
          />
          <EditorialTile to="/niqabs" image={niqabHero} label="Niqabs" />
          <EditorialTile to="/gloves" image={glovesHero} label="Gloves" />
          <EditorialTile to="/kufis" image={kufiHero} label="Kufis" />
          <EditorialTile to="/honey" image={honeyJar} label="Honey" />
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.72fr_1.28fr] md:items-start">
          <div className="md:sticky md:top-28">
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              New arrivals
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9] md:text-7xl">Fresh pieces.</h2>
            <p className="mt-5 max-w-sm font-sans-ui text-sm leading-7 text-black/58">
              Compact discovery, clear product cards, and one editorial break so the page feels
              curated rather than crowded.
            </p>
            <Link
              to="/search"
              className="mt-7 inline-flex border-b border-black pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em]"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-5">
            {arrivals.slice(0, 2).map((product) => (
              <ProductCard key={product.slug} p={product} />
            ))}
            <LookbookTile />
            {arrivals.slice(2, 4).map((product) => (
              <ProductCard key={product.slug} p={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={honeyHero}
          alt="Kashmir honey"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/36 to-black/10" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl gap-10 px-5 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-16">
          <div className="flex flex-col justify-end">
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold-soft">
              The harvest
            </p>
            <h2 className="mt-4 max-w-md font-display text-5xl leading-[0.9] md:text-7xl">
              Kashmir honey.
            </h2>
            <Link
              to="/honey"
              className="mt-8 inline-flex w-fit items-center gap-3 border-b border-white pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] hover:text-gold"
            >
              Shop honey
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {honeyProducts.length > 0 && (
            <div className="grid content-end gap-px bg-white/18 sm:grid-cols-3">
              {honeyProducts.map((product) => (
                <HoneyCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F4B400] px-5 py-12 text-black md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <h2 className="font-display text-5xl leading-[0.9] md:text-7xl">
            Gold, used with restraint.
          </h2>
          <div className="grid gap-px bg-black/18 sm:grid-cols-4">
            <Swatch label="Gold" value="#F4B400" className="bg-[#F4B400]" />
            <Swatch label="Soft" value="#FFDE80" className="bg-[#FFDE80]" />
            <Swatch label="Ink" value="#000000" className="bg-black text-white" />
            <Swatch label="White" value="#FFFFFF" className="bg-white" />
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {[
            { icon: Truck, label: "Worldwide", sub: "Country-aware checkout" },
            { icon: Lock, label: "Secure", sub: "Razorpay for India" },
            { icon: PackageCheck, label: "Tracked", sub: "Order updates ready" },
            { icon: RotateCcw, label: "Support", sub: "Simple returns flow" },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-6 md:px-6">
              <item.icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em]">
                  {item.label}
                </p>
                <p className="mt-1 font-sans-ui text-sm text-black/55">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function CampaignPanel({
  to,
  image,
  eyebrow,
  title,
  cta,
  imageClassName = "",
}: {
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
  imageClassName?: string;
}) {
  return (
    <Link to={to} className="group relative min-h-[62svh] overflow-hidden bg-black md:min-h-0">
      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover opacity-[0.82] transition duration-700 group-hover:scale-105 group-hover:opacity-100 ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-8">
        <div>
          <p className="font-sans-ui text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-5xl leading-none md:text-7xl">{title}</h2>
        </div>
        <span className="mb-2 hidden border-b border-white pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.22em] md:inline-flex">
          {cta}
        </span>
      </div>
    </Link>
  );
}

function SectionHeader({ eyebrow, title, to }: { eyebrow: string; title: string; to: string }) {
  return (
    <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
      <div>
        <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">{title}</h2>
      </div>
      <Link
        to={to}
        className="hidden border-b border-black pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-black md:inline-flex"
      >
        View all
      </Link>
    </div>
  );
}

function EditorialTile({
  to,
  image,
  label,
  className = "",
}: {
  to: string;
  image: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`group relative min-h-[300px] overflow-hidden bg-black md:min-h-[360px] ${className}`}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.84] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white md:p-7">
        <h3 className="font-display text-4xl leading-none md:text-6xl">{label}</h3>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function LookbookTile() {
  return (
    <Link
      to="/shemaghs"
      className="group relative col-span-2 min-h-[360px] overflow-hidden bg-black text-white md:min-h-[460px]"
    >
      <img
        src={shemaghHero}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-[0.78] transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
        <p className="font-sans-ui text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-soft">
          Campaign
        </p>
        <h3 className="mt-2 max-w-md font-display text-5xl leading-[0.92] md:text-7xl">
          The heritage wrap.
        </h3>
      </div>
    </Link>
  );
}

function HoneyCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group bg-black/58 p-3 backdrop-blur transition hover:bg-black/75"
    >
      <img
        src={product.images[0]}
        alt=""
        loading="lazy"
        className="aspect-[4/5] w-full object-cover"
      />
      <p className="mt-3 truncate font-sans-ui text-sm text-white">{product.name}</p>
      <p className="mt-1 font-sans-ui text-xs text-white/55">View product</p>
    </Link>
  );
}

function Swatch({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`min-h-32 p-4 ${className}`}>
      <p className="font-sans-ui text-[10px] font-semibold uppercase tracking-[0.24em]">{label}</p>
      <p className="mt-8 font-display text-3xl">{value}</p>
    </div>
  );
}
