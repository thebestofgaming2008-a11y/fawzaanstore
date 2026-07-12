import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
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
  const featuredProducts = products
    .filter((p) => p.tag === "Bestseller" || p.compareAt || p.tag === "Limited")
    .slice(0, 4);
  const newProducts = products.filter((p) => p.tag === "New").slice(0, 4);
  const honeyProducts = products.filter((p) => p.collection === "honey").slice(0, 3);
  const discoveryProducts = featuredProducts.length ? featuredProducts : products.slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <section className="relative min-h-[calc(100svh-112px)] overflow-hidden bg-ink text-ivory">
        <img
          src={shemaghHero}
          alt="Heritage shemagh styled on a mannequin"
          className="absolute inset-0 h-full w-full object-cover object-[center_top]"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-112px)] max-w-7xl flex-col justify-end px-5 pb-10 pt-20 md:px-8 md:pb-16">
          <div className="max-w-3xl">
            <img src={logoUrl} alt="Fawzaan Store" className="mb-7 h-14 w-auto md:h-20" />
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-soft">
              Heritage essentials
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-6xl leading-[0.88] text-white md:text-8xl lg:text-9xl">
              Quiet luxury for daily wear.
            </h1>
            <p className="mt-6 max-w-md font-sans-ui text-sm leading-7 text-white/78 md:text-base">
              Shemaghs, niqabs, kufis, gloves and honey selected with restraint, craft and purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                to="/shemaghs"
                className="inline-flex items-center justify-center bg-white px-7 py-3.5 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-gold"
              >
                Shop shemaghs
              </Link>
              <Link
                to="/women"
                className="inline-flex items-center justify-center border border-white/55 px-7 py-3.5 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:border-gold hover:text-gold"
              >
                Shop women
              </Link>
            </div>
          </div>

          <div className="mt-14 grid border-y border-white/18 font-sans-ui text-[10px] uppercase tracking-[0.22em] text-white/78 sm:grid-cols-3">
            <p className="py-4 sm:border-r sm:border-white/18">India checkout by Razorpay</p>
            <p className="py-4 sm:border-r sm:border-white/18 sm:px-5">
              Worldwide orders by WhatsApp
            </p>
            <p className="py-4 sm:px-5">Secure cart, accounts and tracking</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-black/10 md:grid-cols-3">
          <HeroTile
            to="/women"
            label="Women"
            image={niqabHero}
            note="Niqabs and modest essentials"
          />
          <HeroTile to="/men" label="Men" image={shemaghFlat} note="Shemaghs and kufis" />
          <HeroTile to="/honey" label="Honey" image={honeyJar} note="Kashmir harvest" />
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              Current edit
            </p>
            <h2 className="mt-4 max-w-md font-display text-5xl leading-[0.95] md:text-7xl">
              Built from fewer, better pieces.
            </h2>
          </div>
          <p className="max-w-xl font-sans-ui text-sm leading-7 text-black/62 md:ml-auto">
            The homepage now keeps the product first and the interface quiet. Large imagery, compact
            choices, clear categories and fewer words give the brand more space to breathe.
          </p>
        </div>

        {discoveryProducts.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-x-3 gap-y-9 md:mt-16 md:grid-cols-4 md:gap-x-5">
            {discoveryProducts.map((product, index) => (
              <ProductCard key={product.slug} p={product} priority={index < 2} />
            ))}
          </div>
        )}

        <div className="mx-auto mt-12 flex max-w-7xl justify-center">
          <Link
            to="/search"
            className="group inline-flex items-center gap-3 border-b border-black pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-black"
          >
            Explore all products
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/14 md:grid-cols-2">
          <EditorialPanel
            to="/shemaghs"
            image={shemaghHero}
            eyebrow="The signature"
            title="Shemaghs with weight, texture and presence."
          />
          <div className="flex min-h-[520px] flex-col justify-between bg-black p-6 md:p-10">
            <div>
              <img src={logoUrl} alt="" aria-hidden className="h-12 w-auto" />
              <p className="mt-10 max-w-sm font-sans-ui text-sm leading-7 text-white/66">
                A black, white and gold system based on the mark: strong contrast, controlled
                spacing and restrained product storytelling.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/16">
              <MiniCollection to="/niqabs" label="Niqabs" image={niqabHero} />
              <MiniCollection to="/gloves" label="Gloves" image={glovesHero} />
              <MiniCollection to="/kufis" label="Kufis" image={kufiHero} />
              <MiniCollection to="/honey" label="Honey" image={honeyJar} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4B400] px-5 py-14 text-black md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em]">
              Brand tone
            </p>
            <h2 className="mt-4 max-w-lg font-display text-5xl leading-[0.92] md:text-7xl">
              Gold should guide, not decorate everything.
            </h2>
          </div>
          <div className="grid gap-px bg-black/18 sm:grid-cols-2">
            <PaletteSwatch name="Primary gold" value="#F4B400" className="bg-[#F4B400]" />
            <PaletteSwatch name="Soft gold" value="#FFDE80" className="bg-[#FFDE80]" />
            <PaletteSwatch name="Ink" value="#000000" className="bg-black text-white" />
            <PaletteSwatch name="White" value="#FFFFFF" className="bg-white" />
          </div>
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="bg-white px-5 py-16 md:px-8 md:py-24">
          <SectionHeader eyebrow="New arrivals" title="Fresh from the catalog" to="/search" />
          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {newProducts.map((product) => (
              <ProductCard key={product.slug} p={product} />
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={honeyHero}
          alt="Kashmir honey"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-lg">
            <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold-soft">
              The harvest
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.94] md:text-7xl">
              Kashmir honey, kept simple.
            </h2>
            <p className="mt-5 max-w-sm font-sans-ui text-sm leading-7 text-white/74">
              A quiet product moment for customers who came for textiles but should still discover
              the food collection naturally.
            </p>
            <Link
              to="/honey"
              className="mt-8 inline-flex items-center gap-3 border-b border-white pb-1 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-white hover:text-gold"
            >
              Shop honey
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {honeyProducts.length > 0 && (
            <div className="mt-10 grid gap-px bg-white/18 sm:grid-cols-3">
              {honeyProducts.map((product) => (
                <Link
                  key={product.slug}
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="group flex items-center gap-4 bg-black/55 p-3 backdrop-blur transition hover:bg-black/70"
                >
                  <img src={product.images[0]} alt="" className="h-16 w-14 object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-sans-ui text-sm text-white">{product.name}</p>
                    <p className="mt-1 font-sans-ui text-xs text-white/55">View product</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {[
            { icon: Truck, label: "Worldwide", sub: "Shipping flow by country" },
            { icon: Lock, label: "Secure", sub: "Razorpay for India" },
            { icon: ShieldCheck, label: "Verified", sub: "Admin-managed catalog" },
            { icon: RotateCcw, label: "Support", sub: "Order tracking ready" },
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

function HeroTile({
  to,
  label,
  note,
  image,
}: {
  to: string;
  label: string;
  note: string;
  image: string;
}) {
  return (
    <Link
      to={to}
      className="group relative min-h-[380px] overflow-hidden bg-black md:min-h-[520px]"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.86] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
        <p className="font-sans-ui text-[10px] uppercase tracking-[0.32em] text-white/70">{note}</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl leading-none md:text-5xl">{label}</h2>
          <ArrowRight className="mb-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function EditorialPanel({
  to,
  image,
  eyebrow,
  title,
}: {
  to: string;
  image: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Link to={to} className="group relative min-h-[620px] overflow-hidden bg-black">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-[0.82] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold-soft">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.94] text-white md:text-7xl">
          {title}
        </h2>
      </div>
    </Link>
  );
}

function MiniCollection({ to, label, image }: { to: string; label: string; image: string }) {
  return (
    <Link to={to} className="group relative aspect-square overflow-hidden bg-black">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.78] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent" />
      <p className="absolute bottom-4 left-4 font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
        {label}
      </p>
    </Link>
  );
}

function PaletteSwatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div className={`min-h-36 p-5 ${className}`}>
      <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.24em]">{name}</p>
      <p className="mt-8 font-display text-4xl">{value}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, to }: { eyebrow: string; title: string; to: string }) {
  return (
    <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
      <div>
        <p className="font-sans-ui text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-4xl leading-none md:text-6xl">{title}</h2>
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
