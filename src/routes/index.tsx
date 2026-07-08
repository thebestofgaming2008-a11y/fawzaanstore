import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ProductCard } from "@/components/brand/ProductCard";
import { catalog, byGender } from "@/lib/products";
import shemagh from "@/assets/shemagh-red-head.jpg";
import niqabTile from "@/assets/niqab-khadija-2.jpg";
import gloves from "@/assets/hero-gloves.jpg";
import honey from "@/assets/hero-honey.jpg";
import honeyTile from "@/assets/honey-kashmir-multiflora.jpg";
import kufi from "@/assets/kufi-white-front.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fawzaan — Heritage Shemaghs, Niqabs & Sidr Honey" },
      { name: "description", content: "Hand-loomed shemaghs, niqabs, leather gloves and raw Sidr honey. Quietly bold heritage essentials." },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<"women" | "men">("women");
  const items = byGender(tab).slice(0, 4);
  const honeyItems = catalog.filter((p) => p.collection === "honey");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      {/* HERO — minimal, clean call to action */}
      <section className="relative w-full overflow-hidden bg-cream -mt-px">
        <div className="relative h-[86svh] min-h-[560px] md:h-[92svh] md:min-h-[680px]">
          <img
            src={shemagh}
            alt="Heritage Yemeni shemagh, hand-loomed"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 md:pb-28 px-5">
            <div className="text-center text-ivory max-w-2xl animate-fade-up">
              <p className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] shimmer-gold font-semibold">New Collection</p>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl mt-4 leading-[0.95] tracking-tight text-ivory drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
                Heritage
              </h1>
              <p className="mt-5 text-[13px] md:text-[14px] text-ivory/85 max-w-md mx-auto">
                Hand-loomed essentials, made to be worn.
              </p>
              <Link
                to="/shemaghs"
                className="mt-8 inline-flex items-center gap-2 bg-ivory text-ink px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-gold hover:text-ink transition-all duration-500 shadow-elegant"
              >
                Shop the collection <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers — with Women / Men selector (creative but minimal) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Our Best Sellers</p>

          {/* Creative underline-tab selector — gold sliding indicator, hairline rule */}
          <div className="relative mt-6 inline-flex items-center gap-10 md:gap-14 pb-2">
            {(["women", "men"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`relative font-display text-2xl md:text-3xl transition-colors duration-500 ${
                  tab === k ? "text-ink" : "text-ink/35 hover:text-ink/70"
                }`}
              >
                {k === "women" ? "Women" : "Men"}
                {tab === k && (
                  <span className="absolute left-1/2 -bottom-1 h-[2px] w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </button>
            ))}
            <span aria-hidden className="absolute -bottom-0 left-0 right-0 h-px bg-ink/10" />
          </div>
        </div>

        <div key={tab} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 animate-fade-up">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 2} />)}
        </div>

        <div className="mt-12 text-center">
          <Link to={tab === "women" ? "/women" : "/men"} className="inline-flex items-center bg-ink text-ivory px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
            All {tab === "women" ? "Women" : "Men"}
          </Link>
        </div>
      </section>

      {/* Honey banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[64vh] min-h-[440px]">
          <img src={honey} alt="Raw Sidr honey" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
          <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-center">
            <div className="text-ivory max-w-md animate-fade-up">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">The Harvest</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">Raw Sidr honey,<br/>straight from the hive.</h2>
              <p className="mt-4 text-[14px] text-ivory/80 max-w-sm">Unfiltered, unheated and traceable to a single highland origin.</p>
              <Link to="/honey" className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-ivory pb-1 hover:text-gold hover:border-gold transition">
                Shop honey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honey rail */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-16 flex items-end justify-between">
          <h3 className="font-display text-2xl md:text-3xl text-ink">Shop honey</h3>
          <Link to="/honey" className="text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink">View all →</Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <ul className="flex gap-3 md:gap-4 px-4 md:px-8 py-8 max-w-7xl mx-auto">
            {honeyItems.map((p) => (
              <li key={p.slug} className="snap-start shrink-0 w-[62vw] sm:w-56 md:w-64">
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Collections — minimal, consistent cream backgrounds */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">Collections</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Explore the House</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
          <CollectionTile to="/shemaghs" name="Shemaghs" img={shemagh} className="col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px]" />
          <CollectionTile to="/niqabs" name="Niqabs" img={niqabTile} className="col-span-2 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[420px]" />
          <CollectionTile to="/honey" name="Honey" img={honeyTile} className="col-span-2 md:col-span-2 aspect-square md:aspect-auto md:h-[320px]" />
          <CollectionTile to="/gloves" name="Gloves" img={gloves} className="col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[320px]" />
          <CollectionTile to="/kufis" name="Kufis" img={kufi} className="col-span-1 md:col-span-2 aspect-square md:aspect-auto md:h-[320px]" />
        </div>
      </section>

      {/* FAQ — premium, animated */}
      <FaqSection />

      <SiteFooter />
    </div>
  );
}

function CollectionTile({ to, name, img, className }: {
  to: string; name: string; img: string; className: string;
}) {
  return (
    <Link to={to} className={`group relative overflow-hidden bg-cream ${className}`}>
      <div className="absolute inset-0 bg-cream" />
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      {/* Uniform soft ivory→ink wash — same across all tiles for consistency */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent transition-opacity duration-500 group-hover:from-ink/70" />
      <div className="absolute bottom-5 left-5 right-5 text-ivory">
        <h3 className="font-display text-2xl md:text-3xl">{name}</h3>
        <span className="mt-1.5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ivory/80 transition-all duration-500 group-hover:text-gold-soft">
          Shop <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

const faqs = [
  { q: "How long does shipping take?", a: "Standard 5–8 business days worldwide. Express 2–3 days. Free shipping on orders over $75." },
  { q: "What's your return policy?", a: "30 days from delivery. Items must be unworn with tags intact. Easy, no-questions returns." },
  { q: "Are the shemaghs authentic?", a: "Yes — each piece is hand-loomed at origin in Yemen and traceable to its atelier." },
  { q: "Is the honey really raw?", a: "Unfiltered and unheated. Sourced from a single Kashmir highland origin. Nothing added, ever." },
  { q: "Do you ship internationally?", a: "We ship worldwide with tracked parcels. Duties may apply at customs depending on your country." },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const passed = Math.min(Math.max(vh - rect.top, 0), total);
      setProgress(passed / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Cream → ivory background transition driven by scroll
  const bgStyle = {
    background: `linear-gradient(180deg, rgba(250,248,242,${1 - progress * 0.6}) 0%, rgba(255,255,255,1) 100%)`,
  };

  return (
    <section ref={sectionRef} style={bgStyle} className="relative overflow-hidden">
      {/* Subtle gold radial glow that fades in */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: visible ? 0.35 : 0,
          background: "radial-gradient(ellipse at 50% 20%, rgba(244,180,0,0.14), transparent 60%)",
        }}
      />
      {/* Top hairline */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8 py-24 md:py-32">
        <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="eyebrow text-gold-deep">Frequently asked</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
            Everything you<br className="md:hidden" /> need to know.
          </h2>
          <div className="mt-5 flex items-center justify-center">
            <span className="h-px w-10 bg-gold/50" />
            <span className="mx-3 text-gold text-sm">✦</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </div>

        <ul className="mt-14 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group border-b border-ink/10 transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left py-5 md:py-6"
                >
                  <span
                    className={`font-display text-lg md:text-2xl transition-colors duration-500 ${
                      isOpen ? "text-gold-deep" : "text-ink group-hover:text-gold-deep"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`ml-4 grid place-items-center h-8 w-8 rounded-full border transition-all duration-500 ${
                      isOpen ? "bg-ink border-ink text-gold rotate-180" : "border-ink/20 text-ink group-hover:border-gold-deep group-hover:text-gold-deep"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className={`pb-6 pr-12 text-[15px] leading-relaxed text-ink/70 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink border-b border-ink pb-1 hover:text-gold-deep hover:border-gold-deep transition-colors"
          >
            View all questions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
